"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css'; 
import { Container, TextInput, Button } from '@mantine/core';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = () => {

    if (username && password) {
 
      router.push('/blog');
    } else {
      
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <Container size="xs" className={styles.loginContainer}>
    <h1>Login</h1>
    <TextInput
      className={styles.loginInput}
      placeholder="Usuário"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <TextInput
      className={styles.loginInput}
      placeholder="Senha"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button onClick={handleLogin} >
      Entrar
    </Button>
  </Container>
  );
};


