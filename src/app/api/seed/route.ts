// src/app/api/seed/route.ts
import { db, VercelPoolClient } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

// Data Dummy User (Admin)
async function seedUsers(client: VercelPoolClient) {
    // Hash password "123456"
    const hashedPassword = await bcrypt.hash('123456', 10);

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    // Insert Admin User
    // ON CONFLICT DO NOTHING agar tidak error jika dijalankan 2x
    await client.sql`
    INSERT INTO users (name, email, password, role)
    VALUES ('Admin', 'admin@atmisolo.co.id', ${hashedPassword}, 'admin')
    ON CONFLICT (email) DO NOTHING;
  `;
}

async function seedNews(client: VercelPoolClient) {
    await client.sql`
    CREATE TABLE IF NOT EXISTS news (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      sections TEXT NOT NULL,
      slug TEXT UNIQUE,
      author_id INTEGER REFERENCES users(id)
    );
  `;

    await client.sql`
    CREATE TABLE IF NOT EXISTS news_logs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      action VARCHAR(50) NOT NULL,
      details TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      news_id INTEGER
    );
  `;

    // Dummy News
    // Note: sections disimpan sebagai JSON String karena di data.ts Anda melakukan JSON.parse
    const dummySections = JSON.stringify([
        { type: 'paragraph', content: 'Ini adalah konten berita pertama sebagai contoh seeding.' }
    ]);

    await client.sql`
    INSERT INTO news (title, sections, slug, author_id)
    VALUES 
    ('Berita Percobaan Pertama', ${dummySections}, 'berita-percobaan-pertama', 1)
    ON CONFLICT (slug) DO NOTHING;
  `;
}

async function seedProducts(client: VercelPoolClient) {
    await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(100) NOT NULL,
      images JSONB DEFAULT '[]',
      features JSONB DEFAULT '[]',
      specifications JSONB DEFAULT '{}',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function seedFooterFiles(client: VercelPoolClient) {
    await client.sql`
    CREATE TABLE IF NOT EXISTS footer_files (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      file_url TEXT NOT NULL,
      file_type VARCHAR(10) NOT NULL,
      is_active BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    await client.sql`
    CREATE TABLE IF NOT EXISTS download_logs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      file_title VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function GET(request: Request) {
    const SECRET_KEY = process.env.SEED_SECRET_KEY;

    const { searchParams } = new URL(request.url);
    
    const token = searchParams.get('token'); 
    // 3. Validasi
    if (!SECRET_KEY || token !== SECRET_KEY) {
        return NextResponse.json(
            { error: 'Unauthorized: Invalid or missing token.' },
            { status: 401 }
        );
    }

    const client = await db.connect();

    try {
        await client.sql`BEGIN`;

        // Urutan penting karena ada Foreign Key (users harus duluan)
        await seedUsers(client);
        await seedNews(client); // News butuh users
        await seedProducts(client);
        await seedFooterFiles(client);

        await client.sql`COMMIT`;

        return NextResponse.json({ message: 'Database seeded successfully' }, { status: 200 });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    } finally {
        client.release(); // Penting! Lepas koneksi
    }
}