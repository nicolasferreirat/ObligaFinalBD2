CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  credencial TEXT DEFAULT '0'
);

INSERT INTO usuarios (nombre, credencial) VALUES
('Nico Bolso', 'JVV 1432'),
('Juanchi Bolso', 'JVC 1234'),
('Santi Bolso', 'JVC 1235');

