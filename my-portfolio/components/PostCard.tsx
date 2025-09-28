// components/PostCard.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from '@/lib/utils';
import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const href = post.isDiary ? `/diary/${post.slug}` : `/blog/${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          {post.coverImage && (
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {post.isDiary && (
                <span className="absolute top-4 left-4 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  Diary Entry
                </span>
              )}
            </div>
          )}
          
          <div className="p-6">
            <time className="text-xs text-gray-500">
              {formatDistanceToNow(post.publishedAt)}
            </time>
            
            <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
              {post.title}
            </h3>
            
            <p className="mt-3 text-gray-600 line-clamp-2">
              {post.excerpt}
            </p>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                Read more →
              </span>
              
              {/* Share buttons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.origin + href,
                      });
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  aria-label="Share post"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-4.732 2.684m4.732-2.684a3 3 0 00-4.732-2.684M6.316 10.658a3 3 0 10-4.732-2.684" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}