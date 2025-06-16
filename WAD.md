# Central de Vagas e Oportunidades Acadêmicas

**Autor:** [João Vitor Furtado de Freitas]

## Sumário
1. [Introdução](#1-introdução-semana-01)
2. [Visão Geral da Aplicação Web](#2-visão-geral-da-aplicação-web)
3. [Projeto da Aplicação Web](#3-projeto-da-aplicação-web)
4. [Desenvolvimento da Aplicação Web](#4-desenvolvimento-da-aplicação-web)
5. [Referências](#5-referências)

## 1. Introdução (Semana 01)
A Central de Vagas e Oportunidades Acadêmicas é uma plataforma web desenvolvida com o objetivo de centralizar a divulgação de oportunidades acadêmicas para alunos do Inteli. Atualmente, informações relevantes como estágios, projetos, eventos e competições são compartilhadas por múltiplos canais (como Slack, Whatsapp ou e-mail), dificultando o acompanhamento. A plataforma visa resolver esse problema oferecendo um ambiente unificado onde usuários podem visualizar, filtrar e compartilhar oportunidades. O sistema contará com usuários do tipo aluno, professor ou administrador, e fará uso de etiquetas (labels) para ajudar no pareamento entre interesses dos alunos e as oportunidades publicadas.

## 2. Visão Geral da Aplicação Web

### 2.1 Personas (opcional)
#### Aluno do Inteli
Busca centralizar o recebimento de oportunidades acadêmicas em um só local. Deseja filtrar conteúdos por interesses pessoais e aplicar rapidamente a programas e eventos.

#### Professor ou Orientador
Compartilha editais e iniciativas com os alunos. Deseja publicar e acompanhar o engajamento com suas postagens.

#### Administrador da Plataforma
Responsável pela curadoria do conteúdo e manutenção da base de dados. Necessita de ferramentas para moderação e ajustes administrativos.

### 2.2 User Stories (opcional)
. Como aluno, quero visualizar oportunidades com base nos meus interesses, para não perder prazos importantes.

. Como usuário logado, quero editar minhas preferências e labels, para receber recomendações mais alinhadas ao meu perfil.

. Como professor, quero poder publicar novas oportunidades acadêmicas, para que os alunos tenham acesso facilitado.

. Como administrador, quero remover conteúdos inadequados ou desatualizados, para manter a qualidade da plataforma.

. Como usuário visitante, quero ver oportunidades públicas antes de criar uma conta, para decidir se vale a pena me cadastrar.



## 3. Projeto da Aplicação Web

### 3.1 Modelagem do banco de dados (Semana 3)
![Modelo Relacional](./assets/modelo-banco.png)

### 3.1.1 Modelo físico (schema.sql)
```sql
CREATE TABLE User (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  senha_hash VARCHAR(255),
  tipo VARCHAR(50),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Label (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255)
);

CREATE TABLE UserLabel (
  user_id INT REFERENCES User(id),
  label_id INT REFERENCES Label(id),
  PRIMARY KEY (user_id, label_id)
);

CREATE TABLE Opportunity (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255),
  descricao TEXT,
  tipo VARCHAR(100),
  data_limite DATE,
  autor_id INT REFERENCES User(id),
  empresa VARCHAR(255),
  link_externo VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  destaque BOOLEAN DEFAULT false
);

CREATE TABLE OpportunityLabel (
  opportunity_id INT REFERENCES Opportunity(id),
  label_id INT REFERENCES Label(id),
  PRIMARY KEY (opportunity_id, label_id)
);
```

### 3.1.1 BD e Models (Semana 5)

O banco de dados foi modelado com base nas principais entidades do sistema. A estrutura atual implementada inclui as seguintes tabelas:

- `User`: representa os usuários da plataforma, contendo `id`, `nome`, `email`, `tipo` e `senha_hash`.
- `Opportunity`: armazena as oportunidades cadastradas, com campos como `id`, `titulo`, `descricao`, `tipo` e `data_limite`.
- `Label`: categorias ou marcadores aplicáveis às oportunidades.

Essas tabelas foram mapeadas como modelos no backend utilizando JavaScript em conjunto com o Supabase/PostgreSQL. Cada model possui métodos específicos para operações CRUD. A comunicação com o banco é feita via SQL, com script de inicialização (`init.sql`) executado por meio de um módulo utilitário.

---

### 3.2 Arquitetura (Semana 5)

O projeto segue a arquitetura **MVC (Model-View-Controller)**, promovendo separação de responsabilidades e organização do código. A estrutura se divide em:

- **Model (Modelos)**:
  - Contêm a lógica de acesso ao banco de dados.
  - Representam entidades como `Usuario`, `Oportunidade`, `Label`.

- **View (Visões)**:
  - Implementadas com EJS, são responsáveis por exibir os dados ao usuário.
  - Localizadas na pasta `views/`.

- **Controller (Controladores)**:
  - Contêm a lógica de negócio e intermediam as requisições HTTP.
  - Ex: `userController`, `authController`, `opportunityController`, `labelController`.

- **Rotas (Router)**:
  - As requisições são roteadas por arquivos em `routes/`.
  - Exemplo do roteador principal (`routes/index.js`):
    ```js
    router.use('/auth', require('./auth'));
    router.use('/users', require('./users'));
    router.use('/opportunities', require('./opportunities'));
    router.use('/labels', require('./labels'));
    ```

- **Servidor Express**:
  - Arquivo principal `server.js` configura middlewares, EJS, assets estáticos e escuta a porta definida.

---


### 3.6 WebAPI e endpoints (Semana 5)

A WebAPI RESTful da aplicação está estruturada por entidade, com rotas específicas para cada recurso. As principais rotas implementadas incluem:

#### Autenticação (`/auth`)
- `GET /auth/login`: Renderiza o formulário de login.
- `POST /auth/login`: Processa a autenticação.

#### Usuários (`/users`)
- `GET /users`: Lista todos os usuários cadastrados.
- `POST /users`: Cadastra um novo usuário.

#### Oportunidades (`/opportunities`)
- `GET /opportunities`: Lista todas as oportunidades.
- `POST /opportunities`: Cadastra uma nova oportunidade.

#### Labels (`/labels`)
- `GET /labels`: Lista todos os labels disponíveis.
- `POST /labels`: Cria um novo label.

### 3.7 Interface e Navegação (Semana 07)
A navegação da aplicação está estruturada para facilitar a experiência do usuário por meio de um layout intuitivo e responsivo. Os principais fluxos incluem:

Navbar fixa com links para Home, Publicar (condicional), Perfil e Logout/Login.

A página inicial apresenta seções como:

“Recomendadas para você” (com base nos labels do usuário).

“Próximas do prazo final” (ordenadas por data_limite).

Cada card de oportunidade exibe:

Título, descrição curta, autor, labels, data limite e imagem de capa.

Um botão “Ver mais” abre um popup com descrição completa e botão externo para o link da oportunidade.

A página de perfil permite:

Edição do nome e seleção de novos labels via checkbox.

Páginas públicas acessíveis para usuários não logados incluem:

Login, cadastro e visualização básica de oportunidades em destaque.



## 4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)
A aplicação foi desenvolvida com a stack:

Backend: Node.js + Express

Banco de dados: PostgreSQL via Supabase

Frontend: EJS + HTML + Bootstrap

Autenticação:  middleware customizado

Arquitetura: MVC completo com separação entre models, controllers, services, views e rotas

Funcionalidades implementadas:

Cadastro e login com verificação por sessão

Página principal com exibição dinâmica de cards

Página de perfil com edição de informações e preferências

Sistema de recomendação com base nos labels do usuário

Publicação de oportunidades via formulário

Popups com detalhes e botão externo para aplicação

Diferenciação de funcionalidades por tipo de usuário (aluno, professor, admin)

A demonstração pode ser acessada localmente via localhost:3000 após a configuração e execução do server.js.

#### Link do vídeo
https://drive.google.com/file/d/1WSmk2D4M2bxDzefGL_TlQ2Mu6SJuXEhi/view?usp=sharing

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)
A plataforma Central de Vagas e Oportunidades Acadêmicas atinge seu objetivo de centralizar e organizar informações importantes para os alunos do Inteli. O uso de filtros por interesses (labels) aumenta a relevância das oportunidades visualizadas por cada usuário.

Pontos positivos:

Estrutura modular facilita manutenção e expansão.

Integração com Supabase simplifica acesso ao banco de dados.

Interface responsiva e clara, com foco em usabilidade.

Boa separação entre lógica de negócio e apresentação.

Melhorias futuras:

Implementar sistema de notificações por e-mail ou dentro da plataforma.

Permitir comentários ou curtidas em oportunidades.

Adicionar área de favoritos ou histórico.

Criar painel administrativo para melhor gestão de conteúdo.

Desenvolver API pública para integração com outras plataformas do Inteli.

## 5. Referências
Documentação oficial do Express.js

Bootstrap v5 Docs: https://getbootstrap.com

Supabase Docs: https://supabase.com/docs

PostgreSQL Manual: https://www.postgresql.org/docs/

EJS Docs: https://ejs.co/

Aula de Programação Web - Módulo IN02

