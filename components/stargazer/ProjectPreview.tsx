"use client";
import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

export function ProjectPreview({
  src,
  title,
  featured = false,
}: {
  src: string;
  title: string;
  featured?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`project-preview ${featured ? "project-preview--featured" : ""}`}
    >
      <div className="browser-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <i>{title}</i>
      </div>
      <div className="preview-image">
        {src && !failed ? (
          <Image
            src={src}
            alt={`${title} website preview`}
            fill
            sizes={
              featured
                ? "(min-width: 1000px) 750px, 92vw"
                : "(min-width: 768px) 550px, 92vw"
            }
            className="object-cover object-top"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="preview-fallback">
            <ImageOff size={28} />
            <span>Project preview unavailable</span>
          </div>
        )}
      </div>
    </div>
  );
}
