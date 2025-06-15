"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  url: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
}

interface ImageUploadProps {
  onUpload: (files: UploadedFile[]) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  folder?: string;
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({
  onUpload,
  onError,
  multiple = false,
  maxFiles = 10,
  folder = "",
  className,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();

      if (multiple) {
        files.forEach((file) => {
          formData.append("files", file);
        });
        if (folder) formData.append("folder", folder);
      } else {
        formData.append("file", files[0]);
        if (folder) formData.append("folder", folder);
      }

      const endpoint = multiple ? "/api/upload/multiple" : "/api/upload/single";

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const result = await response.json();
      const uploadedFiles = Array.isArray(result) ? result : [result];

      onUpload(uploadedFiles);
      setSelectedFiles([]);
      setUploadProgress(100);

      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      onError?.(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) => {
        const isValidType = file.type.startsWith("image/");
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

        if (!isValidType) {
          onError?.(`${file.name} is not a valid image file`);
          return false;
        }

        if (!isValidSize) {
          onError?.(`${file.name} is too large. Maximum size is 10MB`);
          return false;
        }

        return true;
      });

      const filesToProcess = multiple
        ? validFiles.slice(0, maxFiles)
        : validFiles.slice(0, 1);

      setSelectedFiles(filesToProcess);
    },
    [multiple, maxFiles, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp", ".svg"],
    },
    multiple,
    maxFiles,
    disabled: disabled || uploading,
  });

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      uploadFiles(selectedFiles);
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-gray-400",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          {isDragActive
            ? "Drop images here..."
            : "Drag & drop images here, or click to select"}
        </p>
        <p className="text-sm text-gray-500">
          {multiple
            ? `Support for up to ${maxFiles} files. `
            : "Support for single file. "}
          PNG, JPG, GIF, WebP up to 10MB
        </p>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Selected Files:</h4>
          <div className="grid gap-4">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50"
              >
                <ImageIcon className="h-8 w-8 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="w-full"
          >
            {uploading
              ? "Uploading..."
              : `Upload ${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""}`}
          </Button>
        </div>
      )}
    </div>
  );
}
