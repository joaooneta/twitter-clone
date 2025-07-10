# 🐦 Twitter Clone - MERN Stack

Projeto simples de clone do Twitter utilizando Stack Mern(MongoDB, Express, React e Node.js).

---

## 🚀 Uso

1. Crie um banco de dados no **MongoDB Atlas** e obtenha sua **URI do MongoDB**.  

---

## 🔐 Variáveis de Ambiente

1. Renomeie o arquivo `.env.example` para `.env`.  
2. Adicione as seguintes variáveis:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=sua_uri_do_mongodb
JWT_SECRET=abc123
```

> ⚠️ Altere os valores de `JWT_SECRET` conforme necessário.

---

## 📦 Instalação de Dependências

```bash
# Instalar dependências do backend
npm install

# Instalar dependências do frontend
cd frontend
npm install
```

---

## ▶️ Execução do Projeto

```bash
# Rodar frontend (porta 5173) e backend (porta 5000)
npm run dev

# Rodar somente o backend
npm start
```

---

## 🛠️ Tecnologias Utilizadas

- MongoDB + Mongoose  
- Express.js  
- React.js (com Vite)  
- Node.js  
- Redux Toolkit + RTK Query  
- React-Bootstrap  
- Autenticação via JWT  
- Cookies HTTP-only  

---

## 📌 Observações

- O backend roda em: `http://localhost:5000`  
- O frontend roda em: `http://localhost:5173`

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
