CREATE TABLE games(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    desenvolvedora VARCHAR(200) NOT NULL,
    sinopse TEXT NOT NULL,
    id_genero INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES generos(id)
);

CREATE TABLE generos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL
);