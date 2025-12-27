# Vôlei Pro - Site Full Stack

Este é um projeto completo de um site sobre vôlei, desenvolvido com Node.js, Express e MongoDB.

## 🚀 Funcionalidades

- **Home**: Banner motivacional e informações gerais.
- **Sobre/Regras/Posições**: Conteúdo informativo sobre o esporte.
- **Treinos**: Lista dinâmica de treinos vinda do banco de dados.
- **Área do Usuário**: Cadastro, Login e Comentários nos treinos.
- **Painel Admin**: CRUD completo para gerenciar treinos (acesso restrito).
- **Design**: Responsivo, moderno e esportivo (Amarelo, Preto, Azul).

## 🛠️ Tecnologias

- **Backend**: Node.js, Express, Mongoose, EJS, Bcrypt, Express-Session.
- **Frontend**: HTML5, CSS3 (Flexbox/Grid), JavaScript (DOM).
- **Banco de Dados**: MongoDB.

## 📦 Como rodar localmente

1. Certifique-se de ter o **Node.js** e o **MongoDB** instalados.
2. Clone ou baixe este projeto.
3. No terminal, dentro da pasta do projeto, instale as dependências:
   ```bash
   npm install
   ```
4. Popule o banco de dados com os dados iniciais (e crie o usuário admin):
   ```bash
   node seed.js
   ```
5. Inicie o servidor:
   ```bash
   node server.js
   ```
6. Acesse no navegador: `http://localhost:3000`

**Credenciais do Admin:**
- Email: `admin@volei.com`
- Senha: `admin123`

## 📁 Estrutura de Pastas

- `/controllers`: Lógica das rotas.
- `/models`: Esquemas do banco de dados.
- `/public`: Arquivos estáticos (CSS, JS, Imagens).
- `/routes`: Definição das rotas da aplicação.
- `/views`: Templates EJS (HTML dinâmico).
- `server.js`: Ponto de entrada da aplicação.
