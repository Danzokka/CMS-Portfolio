"use client";

import { useState } from "react";
import { toast } from "sonner";

interface UploadedFile {
  url: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
}

interface UseImageUploadOptions {
  folder?: string;
  onSuccess?: (files: UploadedFile[]) => void;
  onError?: (error: string) => void;
}

export function useImageUpload({
  folder = "",
  onSuccess,
  onError,
}: UseImageUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const uploadSingle = async (file: File): Promise<UploadedFile | null> => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (folder) formData.append("folder", folder);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/single`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const uploadedFile = await response.json();
      setUploadedFiles((prev) => [...prev, uploadedFile]);
      onSuccess?.([uploadedFile]);
      toast.success("Upload successful", {
        description: `${file.name} has been uploaded successfully.`,
      });

      return uploadedFile;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      onError?.(errorMessage);
      toast.error("Upload failed", {
        description: errorMessage,
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultiple = async (files: File[]): Promise<UploadedFile[]> => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      if (folder) formData.append("folder", folder);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/multiple`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const uploadedFiles = await response.json();
      setUploadedFiles((prev) => [...prev, ...uploadedFiles]);
      onSuccess?.(uploadedFiles);
      toast.success("Upload successful", {
        description: `${files.length} file${files.length > 1 ? "s" : ""} uploaded successfully.`,
      });

      return uploadedFiles;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      onError?.(errorMessage);
      toast.error("Upload failed", {
        description: errorMessage,
      });
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (filepath: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/${filepath}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      const result = await response.json();

      if (result.success) {
        setUploadedFiles((prev) =>
          prev.filter((file) => file.path !== filepath)
        );
        toast.success("File deleted", {
          description: "File has been deleted successfully.",
        });
      }

      return result.success;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Delete failed";
      toast.error("Delete failed", {
        description: errorMessage,
      });
      return false;
    }
  };

  const getFileUrl = (filepath: string): string => {
    return `${process.env.NEXT_PUBLIC_STATIC_URL || "http://localhost:8080/uploads"}/${filepath}`;
  };

  const clearUploadedFiles = () => {
    setUploadedFiles([]);
  };

  return {
    isUploading,
    uploadedFiles,
    uploadSingle,
    uploadMultiple,
    deleteFile,
    getFileUrl,
    clearUploadedFiles,
  };
}
