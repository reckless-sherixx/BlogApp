import React, { useEffect, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { Skeleton } from '../components/Skeleton';
import { useBlogs } from '../hooks';

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setAuthorName(name);
    }
  }, []);

  if (loading || !blogs) {
    return (
      <div>
        <Appbar />
        <div className='flex justify-center'>
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className='flex justify-center'>
        <div>
          {blogs.map(blog => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || authorName || 'Anonymous'}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};