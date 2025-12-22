// src/data/coating-detail-data.ts
export const coatingDetailData = {
    pretreatment: {
        description: "Pretreatment adalah proses persiapan permukaan sebelum proses coating dilakukan. Tujuannya adalah membersihkan, merawat, dan meningkatkan kualitas permukaan logam agar coating dapat menempel dengan baik dan tahan lama.",
        types: {
            iron: [
                "Degreasing",
                "Alkaline Cleaning",
                "Acid Pickling",
                "Iron Phosphating",
                "Zinc Phosphating"
            ],
            aluminum: [
                "Alkaline Cleaning",
                "Acid Etching",
                "Chromate Conversion",
                "Zirconium Conversion",
                "Titanium Conversion"
            ]
        },
        processes: {
            types: [
                "Spray",
                "Immersion",
                "Electrodeposition",
                "Dip Coating"
            ],
            stages: [
                {
                    name: "Degreasing",
                    description: "Menghilangkan minyak dan lemak dari permukaan logam."
                },
                {
                    name: "Rinsing",
                    description: "Mencuci sisa-sisa chemical dari permukaan logam."
                },
                {
                    name: "Surface Activation",
                    description: "Mengaktifkan permukaan logam untuk bonding yang lebih baik."
                },
                {
                    name: "Coating Application",
                    description: "Menerapkan coating sesuai dengan jenis dan kebutuhan."
                },
                {
                    name: "Drying",
                    description: "Mengeringkan coating untuk mengeras dan mengikat."
                }
            ]
        }
    },
    coating: {
        description: "Proses coating dilakukan setelah pretreatment untuk memberikan lapisan pelindung dan estetika pada produk. Proses ini menjamin ketahanan terhadap korosi, tahan lama, dan tampilan yang menarik.",
        types: {
            iron: [
                "Powder Coating",
                "Electroplating",
                "Galvanizing",
                "Anodizing",
                "Painting"
            ],
            aluminum: [
                "Anodizing",
                "Powder Coating",
                "Liquid Painting",
                "Plating",
                "PVD Coating"
            ]
        },
        processes: {
            types: [
                "Electrostatic Spray",
                "Fluidized Bed",
                "Electroplating",
                "Anodizing",
                "Dip Coating"
            ],
            stages: [
                {
                    name: "Surface Preparation",
                    description: "Memastikan permukaan bersih dan siap untuk coating."
                },
                {
                    name: "Primer Application",
                    description: "Menerapkan lapisan primer untuk adhesion dan korosi protection."
                },
                {
                    name: "Top Coat Application",
                    description: "Menerapkan lapisan top coat untuk warna dan finishing."
                },
                {
                    name: "Curing",
                    description: "Mengeraskan coating dengan suhu tinggi untuk bonding yang sempurna."
                },
                {
                    name: "Quality Control",
                    description: "Pemeriksaan kualitas coating sesuai standar."
                }
            ]
        }
    }
};