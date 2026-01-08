// src/app/api/downloads/log/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, fileName, category } = body;

    // 1. Validasi Sederhana Server-side (Regex)
    // Memastikan ada karakter, ada @, dan ada titik setelah @
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    if (!fileName) {
      return NextResponse.json(
        { error: "Nama file tidak ditemukan." },
        { status: 400 }
      );
    }

    // 2. Simpan ke Database
    await sql`
      INSERT INTO download_logs (email, file_title, category)
      VALUES (${email}, ${fileName}, ${category || 'general'})
    `;

    return NextResponse.json({ message: "Log berhasil disimpan" }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan log download." },
      { status: 500 }
    );
  }
}