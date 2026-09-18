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
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square sm:aspect-[3/4] w-full rounded-card overflow-hidden last:col-span-2 last:aspect-[2/1] sm:last:col-span-1 sm:last:aspect-[3/4]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 20vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
