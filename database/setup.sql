CREATE TABLE candidatos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  votos INT DEFAULT 0
);

INSERT INTO candidatos (nombre) VALUES
('Candidato A'),
('Candidato B');
