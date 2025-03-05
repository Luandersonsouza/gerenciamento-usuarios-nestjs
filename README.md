# Gerenciamento de Usuários com NestJS

API para gerenciamento de usuários com autenticação JWT, CRUD completo e soft delete.  
Desenvolvida em NestJS, TypeORM e PostgreSQL.

---

## 📋 Pré-requisitos
- Node.js (v18.x ou superior)
- npm (v9.x ou superior)
- PostgreSQL (v15.x ou superior)

---

## 🚀 Configuração Rápida

### 1. Clone e Instalação
```bash
git clone https://github.com/Luandersonsouza/gerenciamento-usuarios-nestjs
cd seu-projeto
npm install
```

### 2. Banco de Dados
```sql
-- Crie o banco de dados
CREATE DATABASE gerenciamento;

-- Crie o usuário (opcional)
CREATE USER dev WITH PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE gerenciamento TO dev;
```

### 3. Configure o Ambiente
Crie um arquivo `.env` na raiz do projeto com:
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=dev
DB_PASSWORD=secret
DB_NAME=gerenciamento
JWT_SECRET=sua_chave_secreta_jwt
```

### 4. Execute o Projeto
```bash
npm run start:dev
```

---

## 📡 Rotas da API

### 🔐 Autenticação
| Método | Rota         | Ação                     | Body Exemplo                          |
|--------|--------------|--------------------------|---------------------------------------|
| POST   | `/auth/signup` | Cria usuário            | `{ "name": "João", "email": "joao@email.com", "password": "Senha123!" }` |
| POST   | `/auth/login`  | Gera token JWT          | `{ "email": "joao@email.com", "password": "Senha123!" }` |

### 👥 Usuários (Protegidas por JWT)
| Método | Rota          | Ação                      | Headers                              |
|--------|---------------|---------------------------|--------------------------------------|
| GET    | `/users`      | Lista todos os usuários   | `Authorization: Bearer <token>`      |
| GET    | `/users/:id`  | Busca usuário por ID      | `Authorization: Bearer <token>`      |
| PATCH  | `/users/:id`  | Atualiza dados do usuário | `Authorization: Bearer <token>` + Body |
| DELETE | `/users/:id`  | Soft delete               | `Authorization: Bearer <token>`      |

---

## 🛠 Testando com Insomnia/Postman

### 1. Crie um usuário
```http
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "Senha123!"
}
```

### 2. Faça login
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "maria@email.com",
  "password": "Senha123!"
}
```

### 3. Use o token nas rotas protegidas
```http
GET http://localhost:3000/users
Authorization: Bearer <COLE_SEU_TOKEN_AQUI>
```

---

## ⚠️ Importante
- **NUNCA** compartilhe o arquivo `.env` em produção
- Use **HTTPS** em ambiente real
- A senha é **excluída automaticamente** nas respostas
- Usuários deletados são marcados com `deletedAt` (não removidos)

---

**Desenvolvido por Luanderson Souza**   
🐙 GitHub: https://github.com/Luandersonsouza
