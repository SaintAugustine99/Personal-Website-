'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from '@/lib/utils';
import type { Post } from '@/lib/types';

interface DiaryStreamProps {
  posts: Post[];
}

export default function DiaryStream({ posts }: DiaryStreamProps) {
  if (!posts.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No diary entries yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border-l-2 border-gray-200 pl-6 hover:border-gray-400 transition-colors"
        >
          <time className="text-sm text-gray-500">
            {formatDistanceToNow(post.publishedAt)}
          </time>
          <Link href={`/diary/${post.slug}`}>
            <h3 className="text-lg font-medium text-gray-900 mt-1 hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
        </motion.article>
      ))}
    </div>
  );
}