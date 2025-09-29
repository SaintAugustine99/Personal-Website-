'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
          {project.cover ? (
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200" />
          ) : (
            <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 mt-2">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}