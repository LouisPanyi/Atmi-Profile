import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CreateProductForm from "@/components/admin/products/product-form";

export default function CreateProductPage() {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Link 
            href="/admin/products" 
            className="p-2 hover:bg-white rounded-full text-gray-500 transition-colors border border-transparent hover:border-gray-200"
        >
           <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Tambah Produk Baru</h1>
      </div>

      <CreateProductForm />
    </div>
  );
}