// src/components/map-loader.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Map, ExternalLink, Maximize, X } from 'lucide-react';

export default function MapLoader() {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.1998681462787!2d110.77324837529201!3d-7.553172692460543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1443ba7f318d%3A0x7f1a2ccbce5aed18!2sPT.%20ATMI%20SOLO!5e0!3m2!1sid!2sid!4v1759822420670!5m2!1sid!2sid";
    const googleMapsDirectUrl = "https://maps.app.goo.gl/Ue94S3eRSuMHUShN6";

    const openFullscreen = () => {
        setIsFullscreen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        document.body.style.overflow = 'auto';
    };

    if (isFullscreen) {
        return (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
                <button
                    onClick={closeFullscreen}
                    className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>
                <iframe
                    src={googleMapsUrl} 
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                ></iframe>
            </div>
        );
    }

    return (
        <div className="relative">
            {isMapLoaded ? (
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src={googleMapsUrl} 
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                    ></iframe>
                </div>
            ) : (
                <div
                    className="relative aspect-video w-full rounded-lg overflow-hidden group cursor-pointer shadow-lg"
                    onClick={() => setIsMapLoaded(true)}
                >
                    <Image
                        src="/images/atmi-map-preview.jpg"
                        alt="Peta Lokasi PT ATMI SOLO"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex flex-col items-center justify-center p-4">
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl text-center shadow-xl transform transition-transform duration-300 group-hover:scale-105">
                            <Map className="w-12 h-12 text-blue-700 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-800 text-xl mb-2">Lihat Peta Interaktif</h3>
                            <p className="text-gray-600 mb-4">Klik untuk memuat peta</p>
                            <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
                                Buka Peta
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mt-4 flex justify-between items-center">
                <a
                    href={googleMapsDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                    Buka di Google Maps
                    <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                
                <button
                    onClick={openFullscreen}
                    className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                    <Maximize className="w-5 h-5 mr-1" />
                    Tampilan Penuh
                </button>
            </div>
        </div>
    );
}