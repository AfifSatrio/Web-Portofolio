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
    <div className="w-full">
      <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] w-full rounded-[8px] sm:rounded-[12px] overflow-hidden transition-all duration-500 group shadow-xl cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 20vw, 20vw"
              className="object-cover md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-110 transition-all duration-500 ease-in-out"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
