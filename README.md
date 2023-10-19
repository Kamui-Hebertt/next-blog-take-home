
# DompixelBlog

Este projeto, denominado DompixelBlog, é uma aplicação de blog criada com React e Next.js. Ele consiste em uma interface de blog que permite aos usuários visualizar postagens de blog existentes e criar novas postagens.

## Instruções de Execução

Siga as etapas abaixo para executar o projeto em seu ambiente local:

1. Abra um terminal e navegue até a pasta principal do projeto.

2. Dentro da pasta do projeto, instale as dependências do projeto usando o comando `npm install`:

   ```bash

   npm install
   ```
Certifique-se de que o arquivo db.json esteja presente na pasta principal do projeto.

Inicie o servidor JSON usando o comando json-server para fornecer a API para o front-end:

```bash
json-server --watch db.json --port 3001
```
Em um novo terminal, inicie o servidor de desenvolvimento do frontend com o comando npm run dev:

```bash

npm run dev
```

O servidor do frontend será iniciado e você poderá acessar o aplicativo em seu navegador acessando http://localhost:3000.

Certifique-se de que o servidor JSON (JSON-Server) esteja em execução enquanto você interage com o aplicativo, pois ele fornece os dados simulados necessários para o projeto.


Ao acessar o aplicativo, você pode usar as seguintes credenciais fictícias para fazer login:

exemplo:
Nome de usuário: usuariodompixel
Senha: senha123

Importante: Não deixe os campos de usuário e senha em branco ao fazer login.

## Dificuldades
Durante o desenvolvimento, uma das dificuldades encontradas foi a utilização de uma API no servidor com o uso do JSON-Server. Devido ao cache padrão do JSON-Server, a API não estava funcionando adequadamente, o que afetou o comportamento esperado de algumas funcionalidades. Então usei client render em alguns componentes para solucionar o problema.


Certifique-se de seguir as instruções e manter o servidor JSON-Server em execução para que o aplicativo funcione corretamente.

Feito com ❤️ por Hebertt Nascimento 