'use client';

import { Package } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductImage {
  link: string;
  alt?: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="aspect-square relative overflow-hidden rounded-lg border">
          <div className="flex items-center justify-center h-full bg-muted">
            <Package className="h-24 w-24 text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="aspect-square relative overflow-hidden rounded-lg border">
        <Image
          src={images[selectedImageIndex].link}
          alt={images[selectedImageIndex].alt || productName}
          fill
          className="object-scale-down"
          priority
        />
      </div>

      {/* Galeria de Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.slice(0, 5).map((image, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-20 h-20 relative rounded border cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                selectedImageIndex === index ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image.link}
                alt={image.alt || `${productName} - ${index + 1}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
