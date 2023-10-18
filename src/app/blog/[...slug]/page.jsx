"use client"
import { Post } from '@/Interfaces/Iapi';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from './details.module.css';

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

  const formatBrazilianDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <div className={styles.pagecontainer}>
    {post ? (
      <div className={styles.container}>
        <h2 className={styles.title}>{post.title}</h2>
        <p>{post.content}</p>
        <Image
          className={styles.postimage}
          src={post.imageUrl}
          alt={post.title}
          width={500}
          height={500}
        />
       <p className={styles.date}>
            Publicado em {formatBrazilianDate(post.date)}
          </p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}