import React from "react";
import { getUsers } from "@/server/actions/users";
import { getProjects } from "@/server/actions/projects";
import { getPosts } from "@/server/actions/blog";
import { getReviews } from "@/server/actions/reviews";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Exemplo de página que demonstra o uso dos types e server actions
export default async function TypesExamplePage() {
  // Server actions para buscar dados mockados
  const users = await getUsers();
  const projects = await getProjects();
  const posts = await getPosts({ published: true });
  const reviews = await getReviews();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Portfolio CMS - Types & Data Demo
        </h1>
        <p className="text-muted-foreground">
          Demonstração dos types TypeScript e dados mockados criados baseados no
          schema.prisma
        </p>
      </div>

      {/* Users Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usuários ({users.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>@{user.username}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{user.bio}</p>
                <p className="text-sm text-muted-foreground">
                  {user.worksAt} • {user.location}
                </p>

                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-sm">Especialidades:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.especialities?.map((esp) => (
                        <Badge
                          key={esp.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {esp.icon} {esp.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">Tecnologias:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.technologies?.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech.id}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech.name}
                        </Badge>
                      ))}
                      {user.technologies && user.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.technologies.length - 4} mais
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Projetos ({projects.length})</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>por {project.user.name}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      project.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}
                <p className="text-sm">
                  {project.description.slice(0, 120)}...
                </p>

                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-sm">Tecnologias:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech.id}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{project.reviews.length} reviews</span>
                    {project.reviews.length > 0 && (
                      <span>
                        ⭐{" "}
                        {(
                          project.reviews.reduce(
                            (sum, r) => sum + r.rating,
                            0
                          ) / project.reviews.length
                        ).toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Posts Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Posts do Blog ({posts.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    por {post.user.name} • {post.category}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-24 object-cover rounded-md"
                  />
                )}

                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-sm">Tags:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag.icon} {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.comments.length} comentários</span>
                    <span>{post.likes.length} likes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Reviews ({reviews.length})</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.slice(0, 4).map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {review.user.image && (
                      <img
                        src={review.user.image}
                        alt={review.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <CardTitle className="text-sm">
                        {review.user.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {review.project?.name || "Portfolio Geral"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}
                    </span>
                    <span className="text-gray-300">
                      {"★".repeat(5 - review.rating)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
