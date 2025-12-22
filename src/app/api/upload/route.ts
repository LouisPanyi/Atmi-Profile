import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  // 1. Validasi Input
  if (!filename || !request.body) {
    return NextResponse.json(
      { error: "Nama file atau konten tidak ditemukan." },
      { status: 400 }
    );
  }

  try {
    // 2. Proses Upload ke Vercel Blob
    const blob = await put(filename, request.body, {
      access: "public",
      addRandomSuffix: true, 
    });

    // 3. Kembalikan URL file
    return NextResponse.json(blob);
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal mengupload file ke server." },
      { status: 500 }
    );
  }
}