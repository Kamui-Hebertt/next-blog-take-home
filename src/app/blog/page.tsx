"use client"
import Link from 'next/link';
// import { Post } from '@/Interfaces/Iapi';
import React, { useEffect, useState, ChangeEvent } from 'react';

import { Portal } from '@mantine/core';
import classes from './FeaturesGrid.module.css';
import { Button, Input, Textarea } from '@mantine/core';

import styles from './featuresGrid.module.css';


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
    <div className={styles.container}>
      <h1 className={styles.title}>Blog Posts</h1>
      <ul className={styles.posts}>
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
      <div className={styles.newPost}>
        <h2>Faça uma postagem</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className={styles.input}
          />
          <Textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className={styles.input}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.input}
          />
          <Button type="submit" variant="filled" className={styles.submitButton}>
            Postar
          </Button>
        </form>
      </div>
    </div>
  );
}







