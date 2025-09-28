// app/page.tsx

'use client';

import Hero from '@/components/Hero';
import CVCard from '@/components/CVCard';
import PostCard from '@/components/PostCard';
import ProjectCard from '@/components/ProjectCard';
import DiaryStream from '@/components/DiaryStream';
import Container from '@/components/layout/Container';
import { usePosts, useProjects } from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  const { data: postsData } = usePosts('diary', 1);
  const { data: projects } = useProjects();
  
  const recentDiaryPosts = postsData?.data.slice(0, 3) || [];
  const featuredProjects = projects?.filter(p => p.featured).slice(0, 3) || projects?.slice(0, 3) || [];

  return (
    <>
      <Hero />
      
      {/* CV Summary Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif text-center mb-12">Experience & Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CVCard
                title="Founder & CEO"
                organization="Stealth Startup"
                period="2023 - Present"
                description="Building innovative solutions at the intersection of AI and creativity."
                skills={['Strategy', 'Product', 'Leadership']}
              />
              <CVCard
                title="Senior Engineer"
                organization="Tech Company"
                period="2020 - 2023"
                description="Led frontend architecture and design system development."
                skills={['React', 'TypeScript', 'System Design']}
              />
              <CVCard
                title="Creative Technologist"
                organization="Digital Agency"
                period="2018 - 2020"
                description="Crafted interactive experiences and data visualizations."
                skills={['Three.js', 'WebGL', 'Creative Coding']}
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Latest Diary Entries */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-serif">Recent Thoughts</h2>
              <Link
                href="/diary"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                View all entries →
              </Link>
            </div>
            
            <DiaryStream posts={recentDiaryPosts} />
          </motion.div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-serif">Featured Projects</h2>
              <Link
                href="/projects"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                View all projects →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}