import  { useEffect, useState } from 'react';
import { Blog } from '../hooks';
import { Appbar } from './Appbar';
import { Avatar } from './BlogCard';

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setAuthorName(name);
    }
  }, []);

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8 pr-10">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 2nd December 2024</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={authorName || 'Anonymous'} />
              </div>
              <div>
                <div className="text-xl font-bold">{authorName || 'Anonymous'}</div>
                <div className="pt-2 text-slate-500">
                  Dream big, act bold, and create greatness. Every idea ignites change, every step builds success.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};