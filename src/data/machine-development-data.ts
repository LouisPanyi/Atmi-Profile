// src/data/machine-development-data.ts
export interface MDCContent {
    title: string;
    description: string;
    details?: {
        label: string;
        items: string[];
    }[];
    capabilities?: string[];
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

export const machineDevelopmentData: { [key: string]: MDCContent } = {
    'Design Engineering': {
        title: 'Design Engineering',
        description: 'Tahap Design Engineering adalah fondasi dari setiap mesin yang kami kembangkan. Tim insinyur kami yang berpengalaman menggunakan perangkat lunak CAD 3D terdepan untuk mengubah ide dan kebutuhan klien menjadi rancangan mesin yang detail, fungsional, dan siap untuk diproduksi.',
        details: [
            { label: 'Proses Desain Kami', items: ['Analisis kebutuhan dan spesifikasi klien', 'Pemodelan 3D dan simulasi pergerakan', 'Analisis Kekuatan Elemen (FEA)', 'Pemilihan material yang tepat', 'Pembuatan gambar kerja detail untuk manufaktur'] }
        ],
        capabilities: ['SolidWorks', 'ActCAD', 'ZW3D'],
        images: [
            '/images/machine-development/design/design1.jpg'
        ],
        video: 'https://youtu.be/GuB1M8HeWWs'
    },
    'Electronic': {
        title: 'Electronic',
        description: 'Divisi Elektronik kami bertanggung jawab atas "otak" dan "sistem saraf" dari setiap mesin yang kami buat. Kami merancang dan mengimplementasikan sistem kontrol yang andal dan user-friendly, memastikan mesin dapat beroperasi secara otomatis dengan presisi tinggi.',
        details: [
            { label: 'Lingkup Pekerjaan Elektronik', items: ['Desain dan perakitan Panel Kendali (Control Panel)', 'Pemrograman PLC (Programmable Logic Controller) dan HMI (Human-Machine Interface)', 'Instalasi sensor, aktuator, dan sistem kelistrikan di mesin', 'Layanan servis dan troubleshooting purna jual'] }
        ],
        capabilities: ['Siemens PLC', 'Allen-Bradley', 'Mitsubishi', 'Beckhoff', 'WinCC', 'SCADA'],
        images: [
            '/images/machine-development/electronic/electro1.jpg',
            '/images/machine-development/electronic/electro2.jpg',
            '/images/machine-development/electronic/electro3.jpg',
            '/images/machine-development/electronic/electro4.jpg',
            '/images/machine-development/electronic/electro5.jpg',
            '/images/machine-development/electronic/electro6.jpg',
            '/images/machine-development/electronic/electro7.jpg',
            '/images/machine-development/electronic/electro8.png',
            '/images/machine-development/electronic/electro9.jpg',
            '/images/machine-development/electronic/electro10.jpg',
            '/images/machine-development/electronic/electro11.jpg',
            '/images/machine-development/electronic/electro12.jpg',
            '/images/machine-development/electronic/electro13.jpg',
            '/images/machine-development/electronic/electro14.jpg',
            '/images/machine-development/electronic/electro15.jpg',
        ],
    },
    'Manufacture': {
        title: 'Manufacture',
        description: 'Semua komponen mekanik untuk mesin kami diproduksi secara in-house di fasilitas permesinan yang lengkap. Ini memungkinkan kami untuk menjaga kontrol kualitas yang ketat, memastikan setiap bagian dibuat sesuai dengan spesifikasi desain yang presisi.',
        details: [
            { label: 'Proses Manufaktur', items: ['CNC Machining', 'Precision Grinding', 'Welding', 'Assembly'] }
        ],
        capabilities: ['CNC Machining', 'Precision Grinding', 'Welding', 'Assembly'],
        images: [
            '/images/machine-development/manufacture/mdc1.jpg',
            '/images/machine-development/manufacture/mdc2.jpg',
            '/images/machine-development/manufacture/mdc3.jpg',
            '/images/machine-development/manufacture/mdc4.jpg',
            '/images/machine-development/manufacture/mdc5.jpg',
            '/images/machine-development/manufacture/mdc6.jpg',
            '/images/machine-development/manufacture/mdc7.jpg',
            '/images/machine-development/manufacture/mdc8.jpg',
            '/images/machine-development/manufacture/mdc9.jpg',
            '/images/machine-development/manufacture/mdc10.jpg',
            '/images/machine-development/manufacture/mdc11.jpg',
            '/images/machine-development/manufacture/mdc12.jpg'            
        ],
        video: 'https://youtu.be/WTaDH9fs5qk'
    },
    'Quality Control': {
        title: 'Quality Control & Assembly',
        description: 'Tahap akhir yang krusial adalah perakitan dan quality control. Setiap mesin dirakit dengan teliti oleh tim profesional kami. Proses pengukuran menggunakan alat canggih seperti CMM memastikan setiap komponen dan rakitan akhir memenuhi standar kualitas tertinggi sebelum dikirim ke pelanggan.',
        details: [
            { label: 'Proses QC', items: ['CMM Measurement', 'Coordinate Measuring Machine', 'Precision Testing', 'Functional Testing'] }
        ],
        capabilities: ['CMM Measurement', 'Coordinate Measuring Machine', 'Precision Testing', 'Functional Testing'],
        images: [
            '/images/machine-development/quality-control/qc1.jpg',
            '/images/machine-development/quality-control/qc2.jpg',
            '/images/machine-development/quality-control/qc3.jpg',
            '/images/machine-development/quality-control/qc4.jpg',
            '/images/machine-development/quality-control/qc5.jpg',
            '/images/machine-development/quality-control/qc6.jpg'
        ],
        video: 'https://youtu.be/e26Bqcs_FDM'
    }
};

export const tabNames = Object.keys(machineDevelopmentData);