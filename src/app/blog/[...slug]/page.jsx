"use client"
import { Post } from '@/Interfaces/Iapi';

import { useEffect, useState } from 'react';

export default function Page({ params }) {
  const [post, setPost] = useState(null);

  const getPost = async () => {
    try {
      const res = await fetch(`http://localhost:3001/posts/${params.slug[0]}`);
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getPost();
  }, [params.slug[0]]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.date}</p>
          {/* Display the image here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}