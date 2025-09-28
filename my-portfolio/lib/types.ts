// lib/types.ts

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  links: {
    email: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  coverImage?: string;
  isDiary: boolean;
  tags?: string[];
  embeds?: Embed[];
}

export interface Embed {
  type: 'youtube' | 'code' | 'image' | 'tweet';
  url: string;
  caption?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description?: string;
  cover?: string;
  liveUrl?: string;
  sourceUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}