"use client";

// A large image with clickable thumbnails underneath.
// Uses placeholders until real photos are added.

import { useState } from "react";
import type { GalleryImage } from "@/types";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  if (!current) return null;

  return (
    <div>
      <ImagePlaceholder label={current.label} tone={current.tone} aspect="aspect-[4/5]" />

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3" role="group" aria-label="Choose image">
          {images.map((image, index) => (
            <button
              key={image.label}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={index === selected}
              aria-label={`Show image ${index + 1}: ${image.label}`}
              className={`overflow-hidden rounded-media border-2 transition-colors ${
                index === selected ? "border-ink" : "border-transparent hover:border-line"
              }`}
            >
              {/* Small coloured swatch standing in for a thumbnail */}
              <span
                aria-hidden="true"
                className="block aspect-square"
                style={{ backgroundColor: `var(--color-${image.tone})` }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
