import { Building, Factory, Cpu, Users } from 'lucide-react';

export interface Industry {
    icon: React.ElementType;
    name: string;
    description: string;
}
export const industriesData = [
    {
        icon: Building,
        name: 'Manufaktur',
        description: 'Solusi manufaktur terpadu untuk berbagai sektor industri'
    },
    {
        icon: Cpu,
        name: 'Teknologi',
        description: 'Komponen presisi untuk industri teknologi tinggi'
    },
    {
        icon: Factory,
        name: 'F&B',
        description: 'Solusi manufaktur untuk peralatan industri makanan dan minuman'
    },
    {
        name: 'Kesehatan',
        icon: Users,
        description: 'Solusi manufaktur untuk peralatan medis dan kesehatan'
    }
];