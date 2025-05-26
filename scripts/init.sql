-- init.sql

-- Ativa extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL, -- aluno, professor, admin
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de labels (tags)
CREATE TABLE IF NOT EXISTS labels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL
);

-- Relacionamento N:N entre usuários e labels
CREATE TABLE IF NOT EXISTS user_labels (
  user_id UUID,
  label_id UUID,
  PRIMARY KEY (user_id, label_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE CASCADE
);

-- Tabela de oportunidades
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  tipo VARCHAR(100),
  data_limite DATE,
  autor_id UUID,
  empresa VARCHAR(255),
  link_externo VARCHAR(500),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  destaque BOOLEAN DEFAULT false,
  FOREIGN KEY (autor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Relacionamento N:N entre oportunidades e labels
CREATE TABLE IF NOT EXISTS opportunity_labels (
  opportunity_id UUID,
  label_id UUID,
  PRIMARY KEY (opportunity_id, label_id),
  FOREIGN KEY (opportunity_id) REFERENCES opportunities(id) ON DELETE CASCADE,
  FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE CASCADE
);
