'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CVCardProps {
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
  index?: number;
}

export default function CVCard({ 
  title, 
  organization, 
  period, 
  description, 
  skills,
  index = 0 
}: CVCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-1">{organization}</p>
      <p className="text-sm text-gray-500 mt-1">{period}</p>
      <p className="text-gray-700 mt-3">{description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}