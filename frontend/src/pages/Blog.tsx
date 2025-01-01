import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { FullBlog } from '../components/FullBlog';
import { Skeleton } from '../components/Skeleton';

export const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || '' });

  if (loading || !blog) {
    return <div className='h-screen flex flex-col justify-center items-center'>
      <div >
          <Skeleton />
          <Skeleton />
          <Skeleton />
      </div>
    </div>;
  }

  return (
    <div>
      {blog ? <FullBlog blog={blog} /> : <div>Blog not found</div>}
    </div>
  );
};