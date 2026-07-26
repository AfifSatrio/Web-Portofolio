import React from "react";
import Image from "next/image";

interface AboutProfileImageProps {
  src?: string;
  alt?: string;
}

export const AboutProfileImage = ({
  src = "/profile.jpg",
  alt = "Afif Satrio",
}: AboutProfileImageProps) => {
  return (
    <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-mono-700 transition-all duration-500 shadow-2xl group my-2">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 288px, 320px"
        className="object-cover grayscale"
        priority
      />
    </div>
  );
};
