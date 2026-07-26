import React from "react";
import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface AboutGalleryProps {
  images: GalleryImage[];
}

export const AboutGallery = ({ images }: AboutGalleryProps) => {
  return (
    <div className="w-full pt-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] w-full rounded-[8px] overflow-hidden transition-all duration-500 group shadow-lg cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};
