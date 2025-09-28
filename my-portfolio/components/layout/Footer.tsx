// components/layout/Footer.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { useProfile } from '@/lib/api';

export default function Footer() {
  const { data: profile } = useProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-serif mb-4">Onserio Ogeto</h3>
            <p className="text-sm text-gray-400">
              Founder, Writer, Flaneur. Exploring ideas through code and words.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/diary" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Diary
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Connect</h4>
            <ul className="space-y-2">
              {profile?.links.email && (
                <li>
                  <a
                    href={`mailto:${profile.links.email}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </li>
              )}
              {profile?.links.github && (
                <li>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {profile?.links.linkedin && (
                <li>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {profile?.links.twitter && (
                <li>
                  <a
                    href={profile.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get updates on new posts and projects.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Onserio Ogeto. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}