"use client"
import Link from 'next/link';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Input, Textarea, Container} from '@mantine/core';

import styles from './featuresGrid.module.css';

export default function Login() {

  interface Post {
    id: number | null;
    title: string;
    content: string;
    imageUrl: string;
    date: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Post>({
    id: null,
    title: '',
    content: '',
    imageUrl: '',
    date: '',
  });

 
  const [searchQuery, setSearchQuery] = useState('');
 
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, []);


  useEffect(() => {
    filterPosts();
  }, [searchQuery]);

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


  const filterPosts = () => {
    const searchQueryLower = searchQuery.toLowerCase();

    const filteredPosts = posts.filter((post) => {
      const postTitleLower = post.title.toLowerCase();
      return postTitleLower.includes(searchQueryLower);
    });

    setFilteredPosts(filteredPosts);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const newId = posts.length + 1;

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

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>Postagens</h1>
      <div className={styles.search}>
        <Input
          type="text"
          placeholder="Pesquisar por título"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.input}
        />
      </div>
      <ul className={styles.posts}>
        {filteredPosts.length > 0
          ? filteredPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.content}</p>
              </li>
            ))
          : posts.map((post) => (
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
            placeholder="Título"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className={styles.input}
            
          />
          <Textarea
            placeholder="Conteúdo"
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
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
}








