import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // 1. Parse Data dari FormData (karena ada file upload)
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    
    // Ambil semua file lampiran
    const files = formData.getAll("files") as File[];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 3. Proses Attachments (Ubah File Next.js ke Buffer Node.js)
    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        };
      })
    );

    const mailOptions = {
      from: `"${name} (via Website)" <${process.env.GMAIL_USER}>`, 
      
      to: ["marketing@atmisolo.co.id", "marketing@atmi.co.id"], 

      replyTo: email, 
      subject: `[Website ATMI] Pesan Baru dari: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #003366;">Pesan Baru dari Formulir Kontak</h2>
          <p>Berikut adalah detail pesan yang masuk melalui website:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; width: 120px;"><strong>Nama</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Telepon</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone || "-"}</td>
            </tr>
          </table>

          <p><strong>Isi Pesan:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #003366; margin: 0;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          
          <br/>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888;">Email ini dikirim otomatis dari Website PT ATMI Solo.</p>
        </div>
      `,
      attachments: attachments, // Lampirkan file jika ada
    };

    // 5. Kirim Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Pesan berhasil dikirim ke tim Marketing ATMI." 
    });

  } catch (error: unknown) {
    console.error("Gagal mengirim email:", error);
    return NextResponse.json(
      { error: "Maaf, terjadi kesalahan sistem saat mengirim email. Mohon coba lagi." },
      { status: 500 }
    );
  }
}