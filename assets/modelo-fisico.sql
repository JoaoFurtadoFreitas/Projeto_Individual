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
    PRIMARY KEY (user_id, label_id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (label_id) REFERENCES Label(id)
    -- Relaciona usuários com labels
);

CREATE TABLE Opportunity (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255),
    descricao TEXT,
    tipo VARCHAR(100),
    data_limite DATE,
    autor_id INT,
    empresa VARCHAR(255),
    link_externo VARCHAR(500),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    destaque BOOLEAN,
    FOREIGN KEY (autor_id) REFERENCES User(id)
);

CREATE TABLE OpportunityLabel (
    opportunity_id INT,
    label_id INT,
    PRIMARY KEY (opportunity_id, label_id),
    FOREIGN KEY (opportunity_id) REFERENCES Opportunity(id),
    FOREIGN KEY (label_id) REFERENCES Label(id)
    -- Relaciona oportunidades com labels
);
