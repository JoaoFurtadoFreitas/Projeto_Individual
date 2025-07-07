# Go4It

## 📌 Descrição do Projeto

O **Go4It** é uma plataforma web voltada para a comunidade do Inteli que visa facilitar o acesso e a divulgação de oportunidades acadêmicas como estágios, bolsas, eventos, competições, entre outros. A proposta é centralizar informações que antes estavam dispersas em canais como Slack ou e-mail, permitindo que alunos, professores e administradores colaborem para compartilhar e encontrar oportunidades de forma mais organizada e acessível.

## 👥 Público-Alvo

- **Alunos**: Buscam oportunidades acadêmicas, mas têm dificuldade em acompanhar todas as formas de divulgação.
- **Professores e Coordenadores**: Desejam divulgar eventos e oportunidades relevantes.
- **Administradores**: Filtram e organizam as oportunidades inseridas.

## ✨ Funcionalidades Planejadas

- Cadastro e login de usuários
- Publicação de oportunidades por usuários autorizados
- Curadoria/administração de oportunidades
- Filtros por interesse, área, tipo, empresa, data-limite, etc.
- Destaques da semana ou período
- Sistema de "labels" (tags) para facilitar o pareamento entre usuários e oportunidades

## 🗂️ Estrutura de Pastas (MVC)

```
Projeto_Individual/
│
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Controladores das rotas e lógica de negócio
│   └── HomeController.js
├── models/                # Modelos de dados (ORM / estrutura das tabelas)
│   └── User.js
|   └── modelo-banco.sql       # Modelo físico (SQL)
├── routes/                # Arquivos de rotas
│   └── index.js
├── services/              # Serviços auxiliares
│   └── userService.js
├── assets/                # Imagens e arquivos públicos
├── scripts/               # JavaScript público
├── styles/                # CSS
├── tests/                 # Testes automatizados
│   └── example.test.js
├── views/                 # Views com EJS
│   └── home.ejs
├── .gitignore
├── .env.example
├── jest.config.js
├── package.json
├── package-lock.json
├── server.js
├── rest.http              # Teste de rotas (opcional)
├── README.md              # Este arquivo
├── WAD.md              # Este arquivo

```

## 🧠 Modelo de Dados (Banco de Dados)

### 🧩 Entidades Principais

- **User**: Alunos, Professores, Administradores
- **Opportunity**: Vagas e eventos
- **Label**: Tags para pareamento de interesses
- **UserLabel / OpportunityLabel**: Relacionamentos N:N entre usuários/oportunidades e labels

### 🔗 Modelo Físico (SQL)

```sql
CREATE TABLE User (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  senha_hash VARCHAR(255),
  tipo VARCHAR(50), -- aluno, professor, admin
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Label (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255)
);

CREATE TABLE UserLabel (
  user_id INT,
  label_id INT,
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (label_id) REFERENCES Label(id)
);

CREATE TABLE Opportunity (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255),
  descricao TEXT,
  tipo VARCHAR(100),
  data_limite DATE,
  autor_id INT,
  empresa VARCHAR(255),
  link_externo VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  destaque BOOLEAN,
  FOREIGN KEY (autor_id) REFERENCES User(id)
);

CREATE TABLE OpportunityLabel (
  opportunity_id INT,
  label_id INT,
  FOREIGN KEY (opportunity_id) REFERENCES Opportunity(id),
  FOREIGN KEY (label_id) REFERENCES Label(id)
);
```

### 🖼️ Modelo Lógico (Imagem)

[📎 Clique aqui para ver o modelo lógico](./assets/modelo-banco.png)  
Ou veja o arquivo `modelo-banco.png` ou `modelo-banco.pdf` no repositório.

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` com base em `.env.example`

4. Inicie o servidor:
   ```bash
   node server.js
   ```

5. Acesse: [http://localhost:3000](http://localhost:3000)

## 📌 Tecnologias Utilizadas

- Node.js
- Express.js
- EJS
- PostgreSQL
- HTML + CSS

## ✍️ Autor

Feito por João Vitor Furtado de Freitas. Projeto individual desenvolvido no Módulo 2 da disciplina de Computação.
