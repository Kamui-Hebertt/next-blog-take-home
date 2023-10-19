import React from 'react';
import { Container, Text, Group, rem } from '@mantine/core';


import classes from './FooterLinks.module.css';



export function FooterLinks() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
     
        <Text size="sm" className={classes.description}>
        Feito por Hebertt Nascimento com ❤️ 
      </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text  size="sm">
          © Para o Desafio Técnico da Empresa Dompixel.
        </Text>

    
      </Container>
    </footer>
  );
}
