"use client"
import Link from 'next/link';
import { Textarea, Container } from '@mantine/core';
// import { Post } from '@/Interfaces/Iapi';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button } from '@mantine/core';
import { Input } from '@mantine/core';
import { Portal } from '@mantine/core';
import classes from './FeaturesGrid.module.css';


export default function Login() {
  interface Post {
    id: number | null; 
    title: string;
    content: string;
    imageUrl: string;
    date: string; 
  }

  const [posts, setPosts] = useState<Post[] | null>([]);
  const [newPost, setNewPost] = useState<Post>({
    id: null,
    title: '',
    content: '',
    imageUrl: '',
    date: '', 
  });

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
  
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const dataURL = event.target.result as string;
  
          setNewPost({ ...newPost, imageUrl: dataURL });
        }
      };
  
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;


   
if(posts){

  const newId = (posts.length + 1);


try {
  const response = await fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newPost,
      id: newId,
      date: formattedDate,
    }),
  });




  if (response.ok) {
    getPosts();
    setNewPost({ id: null, title: '', content: '', imageUrl: '', date: '' });
  } else {
    console.error('Error creating a new post:', response.statusText);
  }
  } catch (error) {
  console.error('Error creating a new post:', error);
  }
  };

}


  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>
              <h2>{post.title}</h2>
              </Link>
              
              <p>{post.content}</p>
            </li>
          ))}
      </ul>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
}







