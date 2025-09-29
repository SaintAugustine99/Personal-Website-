// lib/api.ts
import useSWR from 'swr';
import type { Profile, Post, Project, PaginatedResponse } from './types';

// Mock data for development
const mockProfile: Profile = {
  name: "Onserio Ogeto",
  headline: "Founder, Writer, Flaneur",
  bio: "Building innovative solutions at the intersection of AI and creativity. Passionate about technology, design, and storytelling.",
  avatarUrl: "/images/avatar.jpg",
  links: {
    email: "hello@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

const mockPosts: Post[] = [
  {
    id: 1,
    slug: "thoughts-on-creativity",
    title: "Thoughts on Creativity",
    excerpt: "Exploring the intersection of technology and creative expression...",
    publishedAt: new Date().toISOString(),
    isDiary: true,
    tags: ["creativity", "technology"]
  },
  {
    id: 2,
    slug: "building-with-ai",
    title: "Building with AI",
    excerpt: "How artificial intelligence is changing the way we build software...",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    isDiary: false,
    tags: ["ai", "development"]
  }
];

const mockProjects: Project[] = [
  {
    id: 1,
    slug: "ai-assistant",
    title: "AI Assistant Platform",
    summary: "A revolutionary platform for building AI-powered assistants",
    tags: ["AI", "React", "TypeScript"],
    featured: true
  },
  {
    id: 2,
    slug: "creative-tools",
    title: "Creative Tools Suite",
    summary: "Tools for digital artists and creators",
    tags: ["Design", "WebGL", "Three.js"],
    featured: true
  },
  {
    id: 3,
    slug: "data-viz",
    title: "Data Visualization Engine",
    summary: "Beautiful, interactive data visualizations",
    tags: ["D3.js", "React", "Data"],
    featured: true
  }
];

// Fetcher function for SWR
const fetcher = async (url: string) => {
  // In production, replace with actual API calls
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  
  if (url.includes('/profile')) return mockProfile;
  if (url.includes('/posts')) {
    const page = parseInt(url.split('page=')[1] || '1');
    return {
      data: mockPosts,
      page,
      totalPages: 1,
      total: mockPosts.length
    } as PaginatedResponse<Post>;
  }
  if (url.includes('/projects')) return mockProjects;
  
  throw new Error('Not found');
};

// API hooks
export function useProfile() {
  return useSWR<Profile>('/api/profile', fetcher);
}

export function usePosts(type: 'blog' | 'diary' = 'blog', page: number = 1) {
  return useSWR<PaginatedResponse<Post>>(
    `/api/posts?type=${type}&page=${page}`,
    fetcher
  );
}

export function useProjects() {
  return useSWR<Project[]>('/api/projects', fetcher);
}

export function usePost(slug: string) {
  return useSWR<Post>(`/api/posts/${slug}`, fetcher);
}

export function useProject(slug: string) {
  return useSWR<Project>(`/api/projects/${slug}`, fetcher);
}