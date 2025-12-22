const bcrypt = require('bcrypt');

const passwordAsli = '123456'; 

const saltRounds = 10;

bcrypt.hash(passwordAsli, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error hashing:", err);
    } else {
        console.log("===========================================");
        console.log("PASSWORD ASLI :", passwordAsli);
        console.log("HASIL HASH    :", hash); 
        console.log("===========================================");
        console.log("Instruksi: Copy string 'HASIL HASH' di atas (mulai dari $2b$...)");
        console.log("lalu masukkan ke kolom 'password' di tabel 'users' database Vercel Anda.");
    }
});