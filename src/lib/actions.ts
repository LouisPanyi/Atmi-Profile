"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { del, put } from "@vercel/blob";
import bcrypt from "bcrypt";

async function checkAdminOnly() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized: Akses ditolak. Hanya Admin yang diizinkan.");
  }
}

type ActionResult =
  | { success: true; id?: string; slug?: string; message?: string }
  | { success: false; message: string };

function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 120);
}

async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  if (!excludeId) {
    const { rows } = await sql`SELECT 1 FROM news WHERE slug = ${slug} LIMIT 1`;
    return rows.length > 0;
  }
  const { rows } = await sql`
    SELECT 1 FROM news WHERE slug = ${slug} AND id <> ${excludeId} LIMIT 1
  `;
  return rows.length > 0;
}

async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const cleanBase = slugify(base);
  const fallbackBase = cleanBase || `news-${Date.now()}`;

  let candidate = fallbackBase;
  for (let i = 0; i < 20; i += 1) {
    const exists = await slugExists(candidate, excludeId);
    if (!exists) return candidate;
    candidate = `${fallbackBase}-${i + 2}`;
  }

  return `${fallbackBase}-${Date.now()}`;
}

export async function createNews(formData: FormData): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { success: false, message: "Anda harus login." };

  const userId = Number(session.user.id);
  const title = String(formData.get("title") ?? "").trim();
  const sections = String(formData.get("sections") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  if (!title) return { success: false, message: "Judul berita tidak boleh kosong." };
  if (!sections) return { success: false, message: "Konten (sections) tidak boleh kosong." };

  try {
    const slug = await ensureUniqueSlug(slugInput || title);

    const result = await sql<{ id: string }>`
      INSERT INTO news (title, slug, sections, author_id, created_at)
      VALUES (${title}, ${slug}, ${sections}, ${userId}, NOW())
      RETURNING id
    `;

    const newsId = result.rows[0]?.id;

    await sql`
      INSERT INTO news_logs (user_id, action, details, news_id)
      VALUES (${userId}, 'CREATE', 'Membuat berita baru', ${newsId})
    `;

    revalidatePath("/berita");
    revalidatePath("/admin/berita");

    return { success: true, id: newsId, slug, message: "Berita berhasil dibuat." };
  } catch (error) {
    console.error("Create News Error:", error);
    return { success: false, message: "Gagal membuat berita." };
  }
}

export async function updateNews(formData: FormData): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, message: "Unauthorized" };

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const sections = String(formData.get("sections") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  if (!id) return { success: false, message: "ID berita tidak ditemukan." };
  if (!title) return { success: false, message: "Judul berita tidak boleh kosong." };
  if (!sections) return { success: false, message: "Konten (sections) tidak boleh kosong." };

  const currentUser = session.user;
  const currentUserId = Number(currentUser.id);

  try {
    // Proteksi author/admin (sesuai dokumen Anda)
    const existingNews = await sql<{ author_id: number | null }>`
      SELECT author_id FROM news WHERE id = ${id}
    `;
    if (existingNews.rows.length === 0) {
      return { success: false, message: "Berita tidak ditemukan." };
    }

    const newsAuthorId = Number(existingNews.rows[0]?.author_id);
    const isAdmin = currentUser.role === "admin";
    const isAuthor = newsAuthorId === currentUserId;

    if (!isAdmin && !isAuthor) {
      return {
        success: false,
        message: "Akses Ditolak: Anda hanya boleh mengedit berita buatan sendiri.",
      };
    }

    const slug = await ensureUniqueSlug(slugInput || title, id);

    await sql`
      UPDATE news
      SET title = ${title}, slug = ${slug}, sections = ${sections}
      WHERE id = ${id}
    `;

    await sql`
      INSERT INTO news_logs (user_id, action, details, news_id)
      VALUES (${currentUserId}, 'UPDATE', 'Mengupdate berita', ${id})
    `;

    revalidatePath("/berita");
    revalidatePath("/admin/berita");

    return { success: true, id, slug, message: "Berita berhasil diperbarui." };
  } catch (error) {
    console.error("Update News Error:", error);
    return { success: false, message: "Gagal mengupdate berita." };
  }
}

// 3. DELETE NEWS (SECURED)
export async function deleteNews(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, message: "Unauthorized" };

  const id = formData.get("id") as string;
  const currentUser = session.user;
  const currentUserId = Number(currentUser.id);

  try {
    // A. Ambil author_id berita
    const existingNews = await sql`SELECT author_id FROM news WHERE id = ${id}`;
    
    if (existingNews.rows.length === 0) {
      return { success: false, message: "Berita tidak ditemukan." };
    }

    const newsItem = existingNews.rows[0];
    const newsAuthorId = Number(newsItem.author_id);

    // B. LOGIC PROTECTION
    const isAdmin = currentUser.role === "admin";
    const isAuthor = newsAuthorId === currentUserId;

    if (!isAdmin && !isAuthor) {
      return { 
        success: false, 
        message: "Akses Ditolak: Anda hanya boleh menghapus berita buatan sendiri." 
      };
    }

    // C. Log Activity (Sebelum hapus data, agar ID masih valid jika foreign key strict, atau set null)
    // Sebaiknya log ini fleksibel terhadap news_id yang mungkin null jika cascade delete
    await sql`
      INSERT INTO news_logs (user_id, action, details, news_id)
      VALUES (${currentUserId}, 'DELETE', 'Menghapus berita', ${id})
    `;

    // D. Delete Data
    await sql`DELETE FROM news WHERE id = ${id}`;

    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    return { success: true, message: "Berita berhasil dihapus." };

  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Gagal menghapus berita." };
  }
}

// ==========================================
// 3. USER ACTIONS (CRUD User)
// Akses: HANYA Admin
// ==========================================

export async function updateUserRole(formData: FormData) {
  await checkAdminOnly(); // KETAT: Hanya Admin

  const id = formData.get("id") as string;
  const newRole = formData.get("newRole") as string;

  if (!['admin', 'news_writer', 'user'].includes(newRole)) {
    throw new Error("Role tidak valid.");
  }

  try {
    await sql`
      UPDATE users
      SET role = ${newRole}
      WHERE id = ${id}
    `;
    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Update Role Error:", error);
    throw new Error("Gagal update role.");
  }
}

// 1. CREATE USER (Admin Only)
export async function createUser(formData: FormData) {
  try {
    // Pastikan yang create adalah admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    // 1. Cek apakah email sudah ada
    const existingUser = await sql`SELECT id FROM users WHERE email=${email}`;
    if (existingUser.rows.length > 0) {
      return { success: false, message: "Email sudah terdaftar." };
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert ke DB
    await sql`
      INSERT INTO users (name, email, password, role, created_at)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role}, NOW())
    `;

    revalidatePath("/admin/users");
    return { success: true };

  } catch (error) {
    console.error("Create User Error:", error);
    return { success: false, message: "Gagal membuat user." };
  }
}

// 2. DELETE USER (Admin Only)
export async function deleteUser(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const id = formData.get("id") as string;

    // Mencegah admin menghapus dirinya sendiri
    if (session.user.id === id) {
      return { success: false, message: "Anda tidak bisa menghapus akun sendiri di sini." };
    }

    await sql`DELETE FROM users WHERE id=${id}`;
    revalidatePath("/admin/users");

    return { success: true };
  } catch (error) {
    console.error("Delete User Error:", error);
    return { success: false, message: "Gagal menghapus user." };
  }
}

// ==========================================
// PROFILE (SELF EDIT)
// ==========================================

export async function updateProfile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      throw new Error("Unauthorized");
    }

    const name = formData.get("name") as string;
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const email = session.user.email;

    // 1. Ambil data user saat ini (termasuk password hash) dari DB
    const { rows } = await sql`SELECT password FROM users WHERE email = ${email}`;
    if (rows.length === 0) return { success: false, message: "User tidak ditemukan." };

    const currentUser = rows[0];

    // 2. Logic Update
    if (newPassword && newPassword.trim() !== "") {

      if (!oldPassword) {
        return { success: false, message: "Harap masukkan password lama untuk konfirmasi." };
      }

      const isMatch = await bcrypt.compare(oldPassword, currentUser.password);
      if (!isMatch) {
        return { success: false, message: "Password lama salah!" };
      }

      if (oldPassword === newPassword) {
        return { success: false, message: "Password baru tidak boleh sama dengan password lama." };
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await sql`
        UPDATE users 
        SET name = ${name}, password = ${hashedNewPassword}
        WHERE email = ${email}
      `;

    } else {
      await sql`
        UPDATE users 
        SET name = ${name}
        WHERE email = ${email}
      `;
    }

    revalidatePath("/admin/profile");
    return { success: true };

  } catch (error) {
    console.error("Update Profile Error:", error);
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

// ==========================================
// Kontak Form
// ==========================================

export async function sendContactMessage(formData: FormData) {
  try {
    // 1. CEK SESSION
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { success: false, message: "Akses ditolak. Harap login terlebih dahulu." };
    }

    // 2. CEK ROLE (Hanya 'user' / Google Login yang boleh)
    // Admin dan News Writer akan ditolak di sini
    if (session.user.role !== "user") {
      return {
        success: false,
        message: "Maaf, Admin dan Penulis tidak perlu mengisi form kontak."
      };
    }

    // 3. Ambil Data Form
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    // Ambil data aman dari session
    const senderName = session.user.name;
    const senderEmail = session.user.email;
    const senderImage = session.user.image; // Opsional: simpan foto profil google

    if (!message || message.trim() === "") {
      return { success: false, message: "Pesan tidak boleh kosong." };
    }

    // 4. Simpan ke Database
    await sql`
      INSERT INTO messages (name, email, phone, message, user_image, created_at)
      VALUES (${senderName}, ${senderEmail}, ${phone}, ${message}, ${senderImage}, NOW())
    `;

    return { success: true, message: "Pesan berhasil dikirim!" };

  } catch (error) {
    console.error("Contact Error:", error);
    return { success: false, message: "Gagal mengirim pesan." };
  }
}

// ==========================================
// Product Actions
// ==========================================

export async function createProduct(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return { success: false, message: "Akses ditolak. Hanya Admin." };
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const imagesRaw = formData.get("images") as string;
    const featuresRaw = formData.get("features") as string;
    const specsRaw = formData.get("specifications") as string;

    if (!name || !category || !imagesRaw) {
      return { success: false, message: "Nama, Kategori, dan Gambar wajib diisi." };
    }

    let images, features, specifications;
    try {
      images = JSON.parse(imagesRaw);
      features = JSON.parse(featuresRaw);
      specifications = JSON.parse(specsRaw);
    } catch {
      return { success: false, message: "Format data JSON tidak valid." };
    }

    if (!Array.isArray(images) || images.length === 0) {
      return { success: false, message: "Minimal harus ada 1 gambar produk." };
    }

    await sql`
      INSERT INTO products (name, description, category, images, features, specifications, created_at, updated_at)
      VALUES (${name}, ${description}, ${category}, ${JSON.stringify(images)}, ${JSON.stringify(features)}, ${JSON.stringify(specifications)}, NOW(), NOW())
    `;

    revalidatePath("/admin/products");
    revalidatePath("/produk");

    return { success: true, message: "Produk berhasil ditambahkan!" };

  } catch (error) {
    console.error("Create Product Error:", error);
    return { success: false, message: "Gagal menyimpan produk ke database." };
  }
}

// BARU: Update Product
export async function updateProduct(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const imagesRaw = formData.get("images") as string;
    const featuresRaw = formData.get("features") as string;
    const specsRaw = formData.get("specifications") as string;

    // Parsing JSON
    const images = JSON.parse(imagesRaw);
    const features = JSON.parse(featuresRaw);
    const specifications = JSON.parse(specsRaw);

    await sql`
      UPDATE products 
      SET 
        name = ${name}, 
        description = ${description}, 
        category = ${category}, 
        images = ${JSON.stringify(images)}, 
        features = ${JSON.stringify(features)}, 
        specifications = ${JSON.stringify(specifications)},
        updated_at = NOW()
      WHERE id = ${id}
    `;

    revalidatePath("/admin/products");
    revalidatePath("/produk");

    return { success: true, message: "Produk berhasil diperbarui!" };

  } catch (error) {
    console.error("Update Product Error:", error);
    return { success: false, message: "Gagal update produk." };
  }
}

// UPDATE: Delete Product (Termasuk Hapus Blob)
export async function deleteProduct(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    const id = formData.get("id") as string;

    // 1. Ambil data gambar dari database SEBELUM menghapus record
    const { rows } = await sql`SELECT images FROM products WHERE id=${id}`;

    if (rows.length > 0) {
      const product = rows[0];

      // Parsing gambar
      let images = [];
      try {
        images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      } catch (e) {
        console.error("Error parsing images for deletion", e);
      }

      if (Array.isArray(images) && images.length > 0) {
        const urlsToDelete = images
          .map((img: { url: string }) => img.url)
          .filter((url: string) => url);

        if (urlsToDelete.length > 0) {
          await del(urlsToDelete);
        }
      }
    }

    // 3. Hapus record dari Database
    await sql`DELETE FROM products WHERE id=${id}`;

    revalidatePath("/admin/products");
    revalidatePath("/produk");

    return { success: true };
  } catch (error) {
    console.error("Delete Product Error:", error);
    return { success: false, message: "Gagal menghapus produk." };
  }
}

// =========================================
// FOOTER FILES MANAGEMENT
// =========================================

export async function createFooterFile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") return { success: false, message: "Unauthorized" };

    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;

    if (!file || !title || !category) {
      return { success: false, message: "Data tidak lengkap." };
    }

    // 1. Upload ke Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // 2. Tentukan ekstensi
    const fileType = file.name.split('.').pop() || 'unknown';

    // 3. Simpan ke DB
    await sql`
      INSERT INTO footer_files (title, category, file_url, file_type, is_active, created_at)
      VALUES (${title}, ${category}, ${blob.url}, ${fileType}, false, NOW())
    `;

    revalidatePath("/admin/informasi");
    return { success: true, message: "File berhasil diunggah." };
  } catch (error) {
    console.error("Upload Footer File Error:", error);
    return { success: false, message: "Gagal upload file." };
  }
}

export async function deleteFooterFile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") return { success: false, message: "Unauthorized" };

    const id = formData.get("id") as string;
    const fileUrl = formData.get("fileUrl") as string;

    // 1. Hapus dari Blob (Opsional, jika ingin hemat storage)
    if (fileUrl) {
      await del(fileUrl);
    }

    // 2. Hapus dari DB
    await sql`DELETE FROM footer_files WHERE id=${id}`;

    revalidatePath("/admin/informasi");
    return { success: true, message: "File berhasil dihapus." };
  } catch (error) {
    console.error("Delete Footer File Error:", error);
    return { success: false, message: "Gagal menghapus file." };
  }
}

export async function activateFooterFile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") return { success: false, message: "Unauthorized" };

    const id = formData.get("id") as string;
    const category = formData.get("category") as string;

    // 1. Matikan semua di kategori ini
    await sql`UPDATE footer_files SET is_active = false WHERE category = ${category}`;

    // 2. Aktifkan yang dipilih
    await sql`UPDATE footer_files SET is_active = true WHERE id = ${id}`;

    revalidatePath("/admin/informasi");
    revalidatePath("/"); // Update halaman depan agar footer berubah
    return { success: true, message: "File berhasil diaktifkan." };
  } catch (error) {
    console.error("Activate File Error:", error);
    return { success: false, message: "Gagal mengaktifkan file." };
  }
}

