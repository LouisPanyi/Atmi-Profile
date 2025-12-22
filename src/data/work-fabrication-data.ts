// src/data/work-fabrication.ts
export interface WFContent {
    title: string;
    description: string;
    details?: {
        label: string;
        items: string[];
    }[];
    capabilities?: string[];
    technologies?: {
        name: string;
        description: string;
        icon: string;
        features?: string[];
    }[];
    images?: string[];
    video?: string;
    sections?: {
        pretreatment?: {
            description: string;
            types: {
                iron: string[];
                aluminum: string[];
            };
            processes: {
                types: string[];
                stages: {
                    name: string;
                    description: string;
                }[];
            };
        };
        coating?: {
            description: string;
            types: {
                iron: string[];
                aluminum: string[];
            };
            processes: {
                types: string[];
                stages: {
                    name: string;
                    description: string;
                }[];
            };
        };
    };
}
export const fabricationData: { [key: string]: WFContent } = {
    'Punching & Shearing': {
        title: 'Punching & Shearing',
        description: 'PT. ATMI SOLO mempunyai mesin–mesin untuk proses potong dan melubangi, baik manual maupun CNC.',
        details: [
            { label: 'Kapasitas Potong', items: ['SPHC: #6mm x 5’ x 10’', 'SUS: #3mm x 5’ x 10’', 'Aluminium: #8mm x 5’ x 10’'] },
            { label: 'Kapasitas Pelubang', items: ['Manual: 100 ton', 'CNC: 100 ton'] }
        ],
        capabilities: ['Precision Cutting', 'Hole Punching', 'CNC Operations'],
        technologies: [
            {
                name: 'Teknologi CNC Punching',
                description: 'Mesin punching CNC dengan kontrol presisi tinggi untuk lubangan dan potongan yang akurat',
                icon: 'machinery',
                features: [
                    'Kontrol CNC dengan toleransi ±0.1mm',
                    'Kecepatan produksi hingga 300 lubangan/menit',
                    'Auto tool changer dengan 42 station',
                    'Software CAD/CAM integrasi'
                ]
            },
            {
                name: 'Teknologi Laser Cutting',
                description: 'Pemotongan laser berkecepatan tinggi untuk berbagai jenis material',
                icon: 'precision',
                features: [
                    'Daya laser 4000W',
                    'Kecepatan pemotongan hingga 20m/menit',
                    'Dapat memotong material hingga 25mm',
                    'Hasil potongan halus tanpa burr'
                ]
            }
        ],
        images: [
            '/images/work-fabrication/punching/punching1.jpg',
            '/images/work-fabrication/punching/punching2.jpg',
            '/images/work-fabrication/punching/punching3.jpg',
            '/images/work-fabrication/punching/punching4.jpg'
        ],
        video: 'https://www.youtube.com/embed/z9Ya5xRZFr4?si=DB9Ma2rg2Chk_zPI'
    },
    'Bending': {
        title: 'Bending',
        description: 'Kami memiliki mesin tekuk tekan (press brake) dan tekuk lipat (folding), baik untuk proses terpisah maupun segaris (inline) dengan mesin Salvagnini untuk efisiensi maksimal.',
        details: [
            { label: 'Kapasitas Mesin', items: ['Maksimal 100 Ton untuk tekuk tekan', 'Panjang maksimal 4100mm'] }
        ],
        capabilities: ['Press Brake', 'Folding', 'Precision Bending'],
        technologies: [
            {
                name: 'Teknologi Press Brake CNC',
                description: 'Mesin tekuk tekan dengan kontrol CNC untuk presisi maksimal',
                icon: 'machinery',
                features: [
                    'Kontrol CNC dengan 5 axis',
                    'Backgauge dengan kontrol digital',
                    'Sistem laser untuk pembacaan sudut',
                    'Kapasitas tekan hingga 300 ton'
                ]
            },
            {
                name: 'Teknologi Salvagnini Panel Bender',
                description: 'Sistem produksi terintegrasi untuk panel metal',
                icon: 'automation',
                features: [
                    'Produksi otomatis penuh',
                    'Proses punching, shearing, dan bending dalam satu sistem',
                    'Kontrol presisi tinggi',
                    'Efisiensi produksi hingga 90%'
                ]
            }
        ],
        images: [
            '/images/work-fabrication/bending/bending1.jpg',
            '/images/work-fabrication/bending/bending2.jpg',
            '/images/work-fabrication/bending/bending3.jpg',
            '/images/work-fabrication/bending/bending4.jpg',
            '/images/work-fabrication/bending/bending5.jpg',
        ],
        video: 'https://youtu.be/M3JPH2ydYNg'
    },
    'Welding': {
        title: 'Welding',
        description: 'Proses pengelasan dikerjakan oleh tangan–tangan terampil dengan proses yang disesuaikan kebutuhan. Untuk pengerjaan volume besar dan presisi tinggi, kami menggunakan Robot Las.',
        details: [
            { label: 'Teknologi Pengelasan', items: ['Resistance Spot Welding (Spot)', 'MIG - MAG', 'TIG', 'Robot Las MIG'] }
        ],
        capabilities: ['Spot Welding', 'MIG/MAG', 'TIG', 'Robotic Welding'],
        technologies: [
            {
                name: 'Teknologi Robot Welding',
                description: 'Sistem pengelasan robotik untuk presisi dan konsistensi tinggi',
                icon: 'robotics',
                features: [
                    '6-axis robot welding arm',
                    'Pengendali welding parameter digital',
                    'Vision system untuk tracking jalur',
                    'Kecepatan produksi hingga 300 titik/menit'
                ]
            },
            {
                name: 'Teknologi Laser Welding',
                description: 'Pengelasan laser untuk presisi mikro dan area sempit',
                icon: 'precision',
                features: [
                    'Laser fiber 3000W',
                    'Beam diameter hingga 0.2mm',
                    'Tidak ada deformasi material',
                    'Kualitas jahitan tinggi'
                ]
            }
        ],
        images: [
            '/images/work-fabrication/welding/welding1.jpg',
            '/images/work-fabrication/welding/welding2.jpg',
            '/images/work-fabrication/welding/welding3.jpg',
            '/images/work-fabrication/welding/welding4.jpg',
            '/images/work-fabrication/welding/welding5.jpg',
            '/images/work-fabrication/welding/welding6.jpg',
            '/images/work-fabrication/welding/welding7.jpg',
        ],
        video: 'https://youtu.be/PVlFe2Pr5RU'
    },
    'Coating': {
        title: 'Coating',
        description: 'Proses pengecatan di PT. ATMI SOLO menggunakan Powder Coating dengan proses pretreatment 3-line untuk hasil yang tahan lama dan berkualitas tinggi.',
        details: [
            { label: 'Line Pretreatment', items: ['Iron phosphate spray', 'Zink phosphate dipping manual', 'Zink phosphate dipping conveyor'] },
            { label: 'Kapasitas Ukuran', items: ['Housing/Cabinet: 1500 x 1200 x 2000mm', 'Conveyor: 2000 x 500 x 1200mm'] }
        ],
        capabilities: ['Powder Coating', 'Pretreatment', 'Surface Finishing'],
        technologies: [
            {
                name: 'Teknologi Powder Coating',
                description: 'Sistem pengecatan powder coating untuk hasil tahan lama dan estetis',
                icon: 'machinery',
                features: [
                    'Booth coating dengan kontrol lingkungan',
                    'Sistem electrostatic spray',
                    'Oven curing dengan kontrol suhu presisi',
                    'Recyclable powder material'
                ]
            },
            {
                name: 'Teknologi Pretreatment',
                description: 'Proses persiapan permukaan untuk pengecatan optimal',
                icon: 'precision',
                features: [
                    '3-line pretreatment system',
                    'Pengendali pH dan suhu digital',
                    'Proses coating dengan 7 tahapan',
                    'System monitoring kualitas air'
                ]
            }
        ],
        images: [
            '/images/work-fabrication/coating/coating1.jpg',
            '/images/work-fabrication/coating/coating2.jpg',
            '/images/work-fabrication/coating/coating3.jpg',
            '/images/work-fabrication/coating/coating4.jpg',
            '/images/work-fabrication/coating/coating5.jpg',
            '/images/work-fabrication/coating/coating6.jpg'
        ],
        video: 'https://youtu.be/dwSbolSi4WM',
        sections: {
            pretreatment: {
                description: 'Proses Pretreatment adalah proses pengkondisian awal dari permukaan logam dilapisi (coating) dengan senyawa logam agar lebih tahan karat sebelum di proses pengecatan. Proses Pretreatment diperlukan karena akan meningkatkan ketahanan terhadap karat dan meningkatkan daya rekat cat terhadap permukaan benda kerja.',
                types: {
                    iron: [
                        'Coating type Fe (iron phosphate)',
                        'Coating type Zn (Zink Phosphate)',
                        'Coating type Mn (Manganize Phosphate)'
                    ],
                    aluminum: [
                        'Coating Cr6+',
                        'Coating Cr3+',
                        'Coating Ti',
                        'Coating Zr'
                    ]
                },
                processes: {
                    types: ['Dipping / Celup', 'Spray'],
                    stages: [
                        { name: 'Degreasing', description: 'Menghilangkan minyak, lemak dan polutan diatas permukaan material' },
                        { name: 'Air Bilas', description: 'Membersihkan permukaan material dari proses sebelumnya' },
                        { name: 'Surface Conditioning', description: 'Menunjang proses terbentuknya kristal coating' },
                        { name: 'Coating', description: 'Membentuk lapisan coating senyawa logam di permukaan material untuk meningkatkan daya tahan karat dan kerekatan cat' },
                        { name: 'Air Bilas', description: 'Membersihkan sisa coating' },
                        { name: 'Air Bilas', description: 'Membersihkan akhir dari proses coating' }
                    ]
                }
            },
            coating: {
                description: 'Proses pengecatan akhir dengan menggunakan Powder Coating untuk memberikan lapisan permukaan yang tahan lama, tahan gores, dan estetis.',
                types: {
                    iron: [
                        'Powder Coating Polyester',
                        'Powder Coating Epoxy',
                        'Powder Coating Polyurethane'
                    ],
                    aluminum: [
                        'Powder Coating TGIC',
                        'Powder Coating Hybrid',
                        'Powder Coating Epoxy'
                    ]
                },
                processes: {
                    types: ['Spray Booth', 'Fluidized Bed'],
                    stages: [
                        { name: 'Preparation', description: 'Persiapan permukaan dan pengecatan primer' },
                        { name: 'Spraying', description: 'Pengecatan dengan metode spray booth' },
                        { name: 'Curing', description: 'Pemanasan untuk mengaktifkan proses curing' },
                        { name: 'Cooling', description: 'Proses pendinginan setelah curing' },
                        { name: 'Inspection', description: 'Pemeriksaan kualitas coating' }
                    ]
                }
            }
        }
    },
    'Assembly': {
        title: 'Assembly',
        description: 'Proses perakitan dikerjakan oleh tenaga terlatih dan profesional, memastikan setiap produk dirakit dengan presisi dan efisiensi sesuai standar kualitas.',
        details: [
            { label: 'Kapasitas Perakitan Harian', items: ['Filing Cabinet: 25 unit/hari', 'Office Cabinet: 50 unit/hari'] }
        ],
        capabilities: ['Precision Assembly', 'Quality Control', 'Final Testing'],
        technologies: [
            {
                name: 'Teknologi Assembly Line',
                description: 'Sistem perakitan dengan konveyor untuk efisiensi produksi tinggi',
                icon: 'automation',
                features: [
                    'Conveyor system dengan kontrol kecepatan',
                    'Stasiun kerja modular',
                    'Real-time monitoring produksi',
                    'Quality control integration'
                ]
            },
            {
                name: 'Teknologi Joining',
                description: 'Teknik penggabungan komponen dengan presisi tinggi',
                icon: 'precision',
                features: [
                    'Robot arm untuk penggabungan',
                    'Laser alignment system',
                    'Torque control presisi',
                    'Non-destructive testing'
                ]
            }
        ],
        images: [
            '/images/work-fabrication/assembly/assy1.jpg',
            '/images/work-fabrication/assembly/assy2.jpg',
            '/images/work-fabrication/assembly/assy3.jpg',
            '/images/work-fabrication/assembly/assy4.jpg',
            '/images/work-fabrication/assembly/assy5.jpg',
            '/images/work-fabrication/assembly/assy6.jpg'
        ],
        video: 'https://youtu.be/XeXili4zEzM'
    },
    'Inline Panel Bender': {
        title: 'Inline Panel Bender (Salvagnini)',
        description: 'Sebagai investasi utama, kami menggunakan mesin inline panel bender Salvagnini FMS S4+P4, sebuah line produksi terintegrasi yang meliputi penyimpanan material, punching, shearing, dan bending dalam satu alur kerja otomatis.',
        details: [
            {
                label: 'Kapasitas S4Xe.30',
                items: ['Min: 0,5mm x 370mm x 300mm', 'Maks SPCC: 3,5mm x 5\'x 10\'', 'Maks AL: 5mm x 5\'x 10\'', 'Maks SUS: 2mm x 5\'x 10\'']
            },
            {
                label: 'Kapasitas P4XE-2116',
                items: ['Min: 0,5mm x 370mm x 300mm', 'Maks: L 2180mm x H 165mm']
            }
        ],
        capabilities: ['Automated Production', 'High Precision', 'Integrated Workflow'],
        technologies: [
            {
                name: 'Salvagnini FMS System',
                description: 'Sistem produksi terintegrasi otomatis dari Salvagnini',
                icon: 'automation',
                features: [
                    'Storage system dengan 300 pallet',
                    'Automatic material handling',
                    'Integrated punching and bending',
                    'Production planning software'
                ]
            },
            {
                name: 'Teknologi Panel Processing',
                description: 'Teknologi pemrosesan panel dengan presisi tinggi',
                icon: 'precision',
                features: [
                    'Toleransi ±0.1mm',
                    'Processing speed hingga 15 part/menit',
                    'Material thickness 0.5-6mm',
                    'Maximum panel size 2500x1250mm'
                ]
            }
        ],
        images: [
            '/images/work-fabrication/salvagnini/salvagnini1.jpg',
            '/images/work-fabrication/salvagnini/salvagnini2.jpg',
            '/images/work-fabrication/salvagnini/salvagnini3.jpg',
            '/images/work-fabrication/salvagnini/salvagnini4.jpg',
            '/images/work-fabrication/salvagnini/salvagnini5.jpg',
            '/images/work-fabrication/salvagnini/salvagnini6.jpg',
            '/images/work-fabrication/salvagnini/salvag1.jpg',
            '/images/work-fabrication/salvagnini/salvag2.jpg',
            '/images/work-fabrication/salvagnini/salvag3.jpg',
            '/images/work-fabrication/salvagnini/salvag4.jpg',
            '/images/work-fabrication/salvagnini/salvag5.jpg',
            '/images/work-fabrication/salvagnini/salvag6.jpg'
        ],
        video: 'https://youtu.be/blOjrPJGegk'
    }
};

export const tabNames = Object.keys(fabricationData);