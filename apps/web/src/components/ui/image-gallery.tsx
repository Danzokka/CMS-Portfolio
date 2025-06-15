"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Download, Eye, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UploadedFile {
  url: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
}

interface ImageGalleryProps {
  images: UploadedFile[];
  onDelete?: (filepath: string) => void;
  className?: string;
  showActions?: boolean;
  selectable?: boolean;
  onSelect?: (image: UploadedFile) => void;
  selectedImages?: UploadedFile[];
}

export function ImageGallery({
  images,
  onDelete,
  className,
  showActions = true,
  selectable = false,
  onSelect,
  selectedImages = [],
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<UploadedFile | null>(null);
  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied", {
        description: "Image URL has been copied to clipboard.",
      });
    } catch (error) {
      toast.error("Copy failed", {
        description: "Failed to copy URL to clipboard.",
      });
    }
  };

  const handleDownload = (image: UploadedFile) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isSelected = (image: UploadedFile) => {
    return selectedImages.some((selected) => selected.path === image.path);
  };

  if (images.length === 0) {
    return (
      <div className={cn("text-center py-12 text-gray-500", className)}>
        <div className="text-6xl mb-4">🖼️</div>
        <p className="text-lg font-medium">No images uploaded yet</p>
        <p className="text-sm">Upload some images to see them here</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {images.map((image) => (
          <div
            key={image.path}
            className={cn(
              "group relative bg-gray-100 rounded-lg overflow-hidden aspect-square",
              selectable && "cursor-pointer",
              selectable && isSelected(image) && "ring-2 ring-primary"
            )}
            onClick={() => {
              if (selectable && onSelect) {
                onSelect(image);
              }
            }}
          >
            <Image
              src={image.url}
              alt={image.originalName}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
            />

            {/* Overlay with actions */}
            {showActions && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex space-x-2">
                  {/* View Full Size */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="relative aspect-video">
                        <Image
                          src={image.url}
                          alt={image.originalName}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 1024px"
                        />
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>Name:</strong> {image.originalName}
                        </p>
                        <p>
                          <strong>Size:</strong>{" "}
                          {(image.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <p>
                          <strong>Type:</strong> {image.mimetype}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Copy URL */}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUrl(image.url);
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>

                  {/* Download */}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image);
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  {/* Delete */}
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(image.path);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Selection indicator */}
            {selectable && (
              <div
                className={cn(
                  "absolute top-2 right-2 w-5 h-5 rounded-full border-2 border-white",
                  isSelected(image)
                    ? "bg-primary border-primary"
                    : "bg-transparent"
                )}
              >
                {isSelected(image) && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selection summary */}
      {selectable && selectedImages.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          {selectedImages.length} image{selectedImages.length > 1 ? "s" : ""}{" "}
          selected
        </div>
      )}
    </div>
  );
}
