-- Descomente as linhas abaixo para resetar o banco (⚠️ apaga tudo!)
/*
DROP TABLE IF EXISTS usuario_label CASCADE;
DROP TABLE IF EXISTS oportunidade_label CASCADE;
DROP TABLE IF EXISTS label CASCADE;
DROP TABLE IF EXISTS oportunidade CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;
*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários
CREATE TABLE usuario (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de labels
CREATE TABLE label (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) UNIQUE NOT NULL
);

-- Relacionamento N:N entre usuário e label
CREATE TABLE usuario_label (
  usuario_id UUID REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
  label_id INTEGER REFERENCES label(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (usuario_id, label_id)
);

-- Tabela de oportunidades
CREATE TABLE oportunidade (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT NOT NULL,
  data_limite DATE NOT NULL,
  imagem_url TEXT,
  link TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relacionamento N:N entre oportunidade e label
CREATE TABLE oportunidade_label (
  oportunidade_id INTEGER REFERENCES oportunidade(id) ON DELETE CASCADE ON UPDATE CASCADE,
  label_id INTEGER REFERENCES label(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (oportunidade_id, label_id)
);

-- Índices adicionais (opcional)
CREATE INDEX idx_oportunidade_data_limite ON oportunidade(data_limite);
CREATE INDEX idx_ol_label_id ON oportunidade_label(label_id);
CREATE INDEX idx_ul_label_id ON usuario_label(label_id);
