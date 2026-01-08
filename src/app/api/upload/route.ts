import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Tambahan
import { authOptions } from "../auth/[...nextauth]/route"; // Sesuaikan path ke authOptions

export async function POST(request: Request) {
  // 1. CEK SESSION DULU (Gerbang Keamanan)
  const session = await getServerSession(authOptions);

  // Jika tidak login, tolak
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized: Anda harus login." },
      { status: 401 }
    );
  }

  // Cek Role: Hanya Admin dan News Writer yang boleh upload gambar
  const allowedRoles = ["admin", "news_writer"];
  if (!allowedRoles.includes(session.user.role)) {
    return NextResponse.json(
      { error: "Forbidden: Anda tidak memiliki izin upload." },
      { status: 403 }
    );
  }

  // --- Mulai Logika Upload Asli ---
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return NextResponse.json(
      { error: "Nama file atau konten tidak ditemukan." },
      { status: 400 }
    );
  }

  try {
    const blob = await put(filename, request.body, {
      access: "public",
      addRandomSuffix: true, 
    });

    return NextResponse.json(blob);
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal mengupload file ke server." },
      { status: 500 }
    );
  }
}