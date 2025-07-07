"use server";

import {
  Post,
  Tag,
  Comment,
  Like,
  PostWithStats,
  PostFilters,
  CreateCommentDto,
} from "../types/blog";
import { mockUsers } from "./users";

// Mock tags
export const mockTags: Tag[] = [
  {
    id: "tag_1",
    name: "React",
    slug: "react",
    icon: "⚛️",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tag_2",
    name: "Next.js",
    slug: "nextjs",
    icon: "▲",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tag_3",
    name: "TypeScript",
    slug: "typescript",
    icon: "🔷",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tag_4",
    name: "Web Development",
    slug: "web-development",
    icon: "🌐",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tag_5",
    name: "Tutorial",
    slug: "tutorial",
    icon: "📚",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tag_6",
    name: "DevOps",
    slug: "devops",
    icon: "🔧",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tag_7",
    name: "Performance",
    slug: "performance",
    icon: "⚡",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
];

// Mock comments
export const mockComments: Comment[] = [
  {
    id: "comment_1",
    control: "comment_post_1_user_2",
    content: "Great article! Really helped me understand the concepts better.",
    postId: "post_1",
    userId: "user_2",
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-11-20"),
    post: {} as Post, // Will be populated when needed
    user: {
      id: "user_2",
      username: "ana_silva",
      name: "Ana Silva",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=400",
    },
  },
  {
    id: "comment_2",
    control: "comment_post_1_user_3",
    content: "Thanks for sharing this! The examples are very clear.",
    postId: "post_1",
    userId: "user_3",
    createdAt: new Date("2024-11-21"),
    updatedAt: new Date("2024-11-21"),
    post: {} as Post,
    user: {
      id: "user_3",
      username: "carlos_santos",
      name: "Carlos Santos",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  },
  {
    id: "comment_3",
    control: "comment_post_2_user_2",
    content:
      "Interesting approach! I'll definitely try this in my next project.",
    postId: "post_2",
    userId: "user_2",
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-15"),
    post: {} as Post,
    user: {
      id: "user_2",
      username: "ana_silva",
      name: "Ana Silva",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=400",
    },
  },
];

// Mock likes
export const mockLikes: Like[] = [
  {
    id: "like_1",
    control: "like_post_1_user_2",
    postId: "post_1",
    userId: "user_2",
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-11-20"),
    post: {} as Post,
    user: mockUsers[1],
  },
  {
    id: "like_2",
    control: "like_post_1_user_3",
    postId: "post_1",
    userId: "user_3",
    createdAt: new Date("2024-11-21"),
    updatedAt: new Date("2024-11-21"),
    post: {} as Post,
    user: mockUsers[2],
  },
  {
    id: "like_3",
    control: "like_post_2_user_2",
    postId: "post_2",
    userId: "user_2",
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-15"),
    post: {} as Post,
    user: mockUsers[1],
  },
  {
    id: "like_4",
    control: "like_post_2_user_3",
    postId: "post_2",
    userId: "user_3",
    createdAt: new Date("2024-11-16"),
    updatedAt: new Date("2024-11-16"),
    post: {} as Post,
    user: mockUsers[2],
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: "post_1",
    title: "Building Modern Web Applications with Next.js 15",
    content: `
# Building Modern Web Applications with Next.js 15

Next.js 15 brings exciting new features that make building web applications even more powerful and efficient. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your projects.

## What's New in Next.js 15

### 1. App Router Enhancements
The App Router continues to evolve with better performance and developer experience improvements.

### 2. Turbo Pack Improvements
Faster builds and hot reload capabilities make development more productive.

### 3. Enhanced Server Components
Better streaming and caching strategies for optimal performance.

## Getting Started

First, create a new Next.js 15 project:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
\`\`\`

## Best Practices

1. Use Server Components by default
2. Implement proper loading states
3. Optimize images with the Image component
4. Leverage the built-in caching mechanisms

## Conclusion

Next.js 15 provides powerful tools for building modern web applications. By following these patterns and leveraging the new features, you can create fast, scalable applications that provide excellent user experiences.
    `,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    slug: "building-modern-web-applications-nextjs-15",
    category: "Web Development",
    published: true,
    publishedAt: new Date("2024-11-18"),
    username: "rafael_dantas",
    user: mockUsers[0],
    createdAt: new Date("2024-11-18"),
    updatedAt: new Date("2024-11-18"),
    tags: [mockTags[1], mockTags[2], mockTags[3], mockTags[4]], // Next.js, TypeScript, Web Development, Tutorial
    comments: mockComments.filter((c) => c.postId === "post_1"),
    likes: mockLikes.filter((l) => l.postId === "post_1"),
  },
  {
    id: "post_2",
    title: "Optimizing React Performance: Tips and Tricks",
    content: `
# Optimizing React Performance: Tips and Tricks

Performance optimization in React applications is crucial for providing excellent user experiences. This article covers essential techniques to make your React apps faster and more efficient.

## Understanding React Performance

React's virtual DOM and reconciliation process are designed to be efficient, but there are still many ways to optimize your applications.

## Key Optimization Techniques

### 1. Memoization with React.memo
Use React.memo to prevent unnecessary re-renders of functional components.

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering logic */}</div>;
});
\`\`\`

### 2. useMemo and useCallback Hooks
Optimize expensive calculations and function references.

\`\`\`jsx
const MemoizedValue = useMemo(() => {
  return expensiveCalculation(deps);
}, [deps]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

### 3. Code Splitting
Use dynamic imports to split your code and load only what's needed.

\`\`\`jsx
const LazyComponent = lazy(() => import('./LazyComponent'));
\`\`\`

## Measuring Performance

Use React DevTools Profiler to identify performance bottlenecks in your application.

## Conclusion

By implementing these optimization techniques, you can significantly improve your React application's performance and provide better user experiences.
    `,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
    slug: "optimizing-react-performance-tips-tricks",
    category: "React",
    published: true,
    publishedAt: new Date("2024-11-10"),
    username: "rafael_dantas",
    user: mockUsers[0],
    createdAt: new Date("2024-11-10"),
    updatedAt: new Date("2024-11-12"),
    tags: [mockTags[0], mockTags[6], mockTags[4]], // React, Performance, Tutorial
    comments: mockComments.filter((c) => c.postId === "post_2"),
    likes: mockLikes.filter((l) => l.postId === "post_2"),
  },
  {
    id: "post_3",
    title: "Docker Best Practices for Node.js Applications",
    content: `
# Docker Best Practices for Node.js Applications

Containerizing Node.js applications with Docker requires following specific best practices to ensure security, performance, and maintainability.

## Multi-stage Builds

Use multi-stage builds to optimize image size and security:

\`\`\`dockerfile
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules
USER nextjs
EXPOSE 3000
CMD ["node", "dist/main.js"]
\`\`\`

## Security Considerations

1. Use non-root users
2. Keep base images updated
3. Scan for vulnerabilities
4. Use specific image tags

## Performance Tips

1. Optimize layer caching
2. Use .dockerignore effectively
3. Minimize image size
4. Implement health checks

## Conclusion

Following these Docker best practices will help you create secure, efficient, and maintainable containerized Node.js applications.
    `,
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800",
    slug: "docker-best-practices-nodejs-applications",
    category: "DevOps",
    published: true,
    publishedAt: new Date("2024-10-25"),
    username: "rafael_dantas",
    user: mockUsers[0],
    createdAt: new Date("2024-10-25"),
    updatedAt: new Date("2024-10-25"),
    tags: [mockTags[5], mockTags[4]], // DevOps, Tutorial
    comments: [],
    likes: [],
  },
  {
    id: "post_4",
    title: "Getting Started with TypeScript in 2024",
    content: `
# Getting Started with TypeScript in 2024

TypeScript has become an essential tool for modern JavaScript development. This guide will help you get started with TypeScript and understand its benefits.

## Why TypeScript?

TypeScript adds static type checking to JavaScript, helping catch errors early and improving code quality.

## Installation and Setup

\`\`\`bash
npm install -g typescript
npm install -D @types/node
\`\`\`

## Basic Types

Learn about TypeScript's type system and how to use it effectively.

## Advanced Features

Explore generics, utility types, and advanced TypeScript patterns.

## Conclusion

TypeScript is a powerful tool that can significantly improve your JavaScript development experience.
    `,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    slug: "getting-started-typescript-2024",
    category: "TypeScript",
    published: false,
    username: "rafael_dantas",
    user: mockUsers[0],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-07"),
    tags: [mockTags[2], mockTags[4]], // TypeScript, Tutorial
    comments: [],
    likes: [],
  },
];

// Server actions
export async function getPosts(filters?: PostFilters): Promise<Post[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredPosts = [...mockPosts];

    if (filters?.published !== undefined) {
      filteredPosts = filteredPosts.filter(
        (p) => p.published === filters.published
      );
    }

    if (filters?.category) {
      filteredPosts = filteredPosts.filter((p) =>
        p.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    if (filters?.username) {
      filteredPosts = filteredPosts.filter(
        (p) => p.username === filters.username
      );
    }

    if (filters?.tagIds?.length) {
      filteredPosts = filteredPosts.filter((p) =>
        p.tags.some((tag) => filters.tagIds!.includes(tag.id))
      );
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.content.toLowerCase().includes(searchTerm)
      );
    }

    return filteredPosts.sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const post = mockPosts.find((p) => p.slug === slug);
    return post || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getPostsWithStats(): Promise<PostWithStats[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return mockPosts.map((post) => ({
      ...post,
      commentsCount: post.comments.length,
      likesCount: post.likes.length,
      readingTime: Math.ceil(post.content.split(" ").length / 200), // ~200 words per minute
    }));
  } catch (error) {
    console.error("Error fetching posts with stats:", error);
    return [];
  }
}

export async function getPublishedPosts(): Promise<Post[]> {
  try {
    return getPosts({ published: true });
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockPosts
      .filter((p) => p.published)
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockTags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function getPostComments(postId: string): Promise<Comment[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockComments.filter((c) => c.postId === postId);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function createComment(
  data: CreateCommentDto & { userId: string }
): Promise<Comment | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = mockUsers.find((u) => u.id === data.userId);
    if (!user) return null;

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      control: `comment_${data.postId}_${data.userId}`,
      content: data.content,
      postId: data.postId,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      post: {} as Post,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        image: user.image,
      },
    };

    mockComments.push(newComment);
    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    return null;
  }
}

export async function toggleLike(
  postId: string,
  userId: string
): Promise<boolean> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const existingLike = mockLikes.find(
      (l) => l.postId === postId && l.userId === userId
    );

    if (existingLike) {
      // Remove like
      const index = mockLikes.indexOf(existingLike);
      mockLikes.splice(index, 1);
      return false;
    } else {
      // Add like
      const user = mockUsers.find((u) => u.id === userId);
      if (!user) return false;

      const newLike: Like = {
        id: `like_${Date.now()}`,
        control: `like_${postId}_${userId}`,
        postId,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        post: {} as Post,
        user,
      };

      mockLikes.push(newLike);
      return true;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return false;
  }
}
