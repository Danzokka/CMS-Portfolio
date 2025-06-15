"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/ui/image-upload";
import { ImageGallery } from "@/components/ui/image-gallery";
import { useImageUpload } from "@/hooks/use-image-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UploadedFile {
  url: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
}

export default function UploadTestPage() {
  const [allImages, setAllImages] = useState<UploadedFile[]>([]);
  const [selectedImages, setSelectedImages] = useState<UploadedFile[]>([]);

  const { isUploading, uploadedFiles, deleteFile, clearUploadedFiles } =
    useImageUpload({
      folder: "test-uploads",
      onSuccess: (files) => {
        setAllImages((prev) => [...prev, ...files]);
      },
    });

  const handleDeleteFile = async (filepath: string) => {
    const success = await deleteFile(filepath);
    if (success) {
      setAllImages((prev) => prev.filter((img) => img.path !== filepath));
      setSelectedImages((prev) => prev.filter((img) => img.path !== filepath));
    }
  };

  const handleSelectImage = (image: UploadedFile) => {
    setSelectedImages((prev) => {
      const isSelected = prev.some((img) => img.path === image.path);
      if (isSelected) {
        return prev.filter((img) => img.path !== image.path);
      } else {
        return [...prev, image];
      }
    });
  };

  const clearSelection = () => {
    setSelectedImages([]);
  };

  const totalSize = allImages.reduce((sum, img) => sum + img.size, 0);
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Image Upload System</h1>
          <p className="text-gray-600">
            Test the image upload functionality with drag & drop support
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {allImages.length}
              </div>
              <div className="text-sm text-gray-600">Total Images</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatSize(totalSize)}
              </div>
              <div className="text-sm text-gray-600">Total Size</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {selectedImages.length}
              </div>
              <div className="text-sm text-gray-600">Selected</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Images</TabsTrigger>
            <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Single File Upload</CardTitle>
                <CardDescription>Upload one image at a time</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onUpload={(files) =>
                    setAllImages((prev) => [...prev, ...files])
                  }
                  multiple={false}
                  folder="test-uploads/single"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiple Files Upload</CardTitle>
                <CardDescription>Upload up to 5 images at once</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onUpload={(files) =>
                    setAllImages((prev) => [...prev, ...files])
                  }
                  multiple={true}
                  maxFiles={5}
                  folder="test-uploads/multiple"
                />
              </CardContent>
            </Card>

            {isUploading && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-sm">Uploading...</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Image Gallery</CardTitle>
                    <CardDescription>
                      View, select, and manage uploaded images
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {selectedImages.length > 0 && (
                      <>
                        <Badge variant="secondary">
                          {selectedImages.length} selected
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearSelection}
                        >
                          Clear Selection
                        </Button>
                      </>
                    )}
                    {allImages.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setAllImages([]);
                          setSelectedImages([]);
                          clearUploadedFiles();
                        }}
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ImageGallery
                  images={allImages}
                  onDelete={handleDeleteFile}
                  selectable={true}
                  onSelect={handleSelectImage}
                  selectedImages={selectedImages}
                />
              </CardContent>
            </Card>

            {selectedImages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Images</CardTitle>
                  <CardDescription>
                    Images you have selected for further actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedImages.map((image) => (
                      <div
                        key={image.path}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={image.url}
                            alt={image.originalName}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <div className="text-sm font-medium">
                              {image.originalName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatSize(image.size)}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setSelectedImages((prev) =>
                              prev.filter((img) => img.path !== image.path)
                            )
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
