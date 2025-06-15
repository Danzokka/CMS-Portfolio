"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { ImageGallery } from "@/components/ui/image-gallery";
import { useImageUpload } from "@/hooks/use-image-upload";
import { toast } from "sonner";

interface UploadedFile {
  url: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
}

const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  technologies: z.string().min(1, "Technologies are required"),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectFormExample() {
  const [featuredImage, setFeaturedImage] = useState<UploadedFile | null>(null);
  const [galleryImages, setGalleryImages] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isUploading } = useImageUpload({
    folder: "projects",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const handleFeaturedImageUpload = (files: UploadedFile[]) => {
    if (files.length > 0) {
      setFeaturedImage(files[0]);
      toast.success("Featured image uploaded successfully");
    }
  };

  const handleGalleryUpload = (files: UploadedFile[]) => {
    setGalleryImages((prev) => [...prev, ...files]);
    toast.success(
      `${files.length} image${files.length > 1 ? "s" : ""} added to gallery`
    );
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
    toast.info("Featured image removed");
  };

  const removeGalleryImage = (filepath: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.path !== filepath));
    toast.info("Image removed from gallery");
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const projectData = {
        ...data,
        featuredImage: featuredImage?.url || null,
        galleryImages: galleryImages.map((img) => img.url),
        technologies: data.technologies.split(",").map((tech) => tech.trim()),
      };

      console.log("Project data to submit:", projectData);

      toast.success("Project created successfully!", {
        description: "Your project has been saved with all images.",
      });

      // Reset form
      reset();
      setFeaturedImage(null);
      setGalleryImages([]);
    } catch (error) {
      toast.error("Failed to create project", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-gray-600">
            Create a new project with image uploads
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>
                Fill in the basic information about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="My Awesome Project"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies</Label>
                  <Input
                    id="technologies"
                    {...register("technologies")}
                    placeholder="React, TypeScript, Node.js"
                  />
                  {errors.technologies && (
                    <p className="text-sm text-red-600">
                      {errors.technologies.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe your project..."
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                  <Input
                    id="githubUrl"
                    {...register("githubUrl")}
                    placeholder="https://github.com/username/repo"
                  />
                  {errors.githubUrl && (
                    <p className="text-sm text-red-600">
                      {errors.githubUrl.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL (optional)</Label>
                  <Input
                    id="liveUrl"
                    {...register("liveUrl")}
                    placeholder="https://myproject.com"
                  />
                  {errors.liveUrl && (
                    <p className="text-sm text-red-600">
                      {errors.liveUrl.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>
                Upload a main image to represent your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {featuredImage ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={featuredImage.url}
                      alt={featuredImage.originalName}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeFeaturedImage}
                    >
                      Remove
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Current: {featuredImage.originalName}
                  </p>
                </div>
              ) : (
                <ImageUpload
                  onUpload={handleFeaturedImageUpload}
                  multiple={false}
                  folder="projects/featured"
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Gallery</CardTitle>
              <CardDescription>
                Upload additional images to showcase your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUpload
                onUpload={handleGalleryUpload}
                multiple={true}
                maxFiles={8}
                folder="projects/gallery"
              />

              {galleryImages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">
                    Gallery Images ({galleryImages.length})
                  </h4>
                  <ImageGallery
                    images={galleryImages}
                    onDelete={removeGalleryImage}
                    showActions={true}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {featuredImage && <span>✓ Featured image uploaded • </span>}
                  {galleryImages.length > 0 && (
                    <span>
                      ✓ {galleryImages.length} gallery image
                      {galleryImages.length > 1 ? "s" : ""} uploaded
                    </span>
                  )}
                </div>

                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset();
                      setFeaturedImage(null);
                      setGalleryImages([]);
                    }}
                  >
                    Reset Form
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isUploading}>
                    {isSubmitting ? "Creating Project..." : "Create Project"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
