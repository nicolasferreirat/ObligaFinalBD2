
CREATE TABLE Persona (
    CI VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    edad INT
);

CREATE TABLE Partido_Politico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    direccion_sede VARCHAR(200),
    presidente VARCHAR(100),
    vicepresidente VARCHAR(100)
);

CREATE TABLE Candidato (
    CI VARCHAR(20),
    id_PartidoPolitico INT,
    PRIMARY KEY (CI),
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (id_PartidoPolitico) REFERENCES Partido_Politico(id)
);

CREATE TABLE Departamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100)
);

CREATE TABLE Zona (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    idDepartamento INT,
    FOREIGN KEY (idDepartamento) REFERENCES Departamento(id)
);

CREATE TABLE Establecimiento (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    ubicacion VARCHAR(255),
    idZona INT,
    FOREIGN KEY (idZona) REFERENCES Zona(id)
);

CREATE TABLE Agente_Policial (
    comisaria VARCHAR(100),
    CI VARCHAR(20),
    idEstablecimiento INT,
    PRIMARY KEY (CI),
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (idEstablecimiento) REFERENCES Establecimiento(id)
);

CREATE TABLE Miembro_Mesa (
    organismo_trabaja VARCHAR(100),
    CI VARCHAR(20),
    PRIMARY KEY (CI),
    FOREIGN KEY (CI) REFERENCES Persona(CI)
);

CREATE TABLE Mesa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_mesa INT
);

CREATE TABLE Presidente_Mesa (
    CI VARCHAR(20),
    idMesa INT,
    PRIMARY KEY (CI),
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (idMesa) REFERENCES Mesa(id)
);

CREATE TABLE Secretario_Mesa (
    CI VARCHAR(20),
    idMesa INT,
    PRIMARY KEY (CI),
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (idMesa) REFERENCES Mesa(id)
);

CREATE TABLE Vocal_Mesa (
    CI VARCHAR(20),
    idMesa INT,
    PRIMARY KEY (CI),
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (idMesa) REFERENCES Mesa(id)
);

CREATE TABLE Circuito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    es_accesible BOOLEAN,
    idEstablecimiento INT,
    idMesa INT,
    FOREIGN KEY (idEstablecimiento) REFERENCES Establecimiento(id),
    FOREIGN KEY (idMesa) REFERENCES Mesa(id)
);

CREATE TABLE Credencial_Civica (
    serie VARCHAR(10) PRIMARY KEY,
    numero VARCHAR(10) PRIMARY KEY,
    CI VARCHAR(20),
    idCircuito INT,
    yavoto BOOLEAN,
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (idCircuito) REFERENCES Circuito(id)
);

CREATE TABLE Voto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_emitido DATE,
    hora_emitido TIME,
    idCircuito INT,
    idResultado INT,
    FOREIGN KEY (idCircuito) REFERENCES Circuito(id),
    FOREIGN KEY (idResultado) REFERENCES Resultado(id)
);

CREATE TABLE Es_Valido (
    idVoto INT,
    numero_unicoLista INT,
    PRIMARY KEY (idVoto, numero_unicoLista),
    FOREIGN KEY (idVoto) REFERENCES Voto(id),
    FOREIGN KEY (numero_unicoLista) REFERENCES Lista(numero_unico)
);

CREATE TABLE Es_Observado (
    idVoto INT,
    numero_unicoLista INT,
    PRIMARY KEY (idVoto, numero_unicoLista),
    FOREIGN KEY (idVoto) REFERENCES Voto(id),
    FOREIGN KEY (numero_unicoLista) REFERENCES Lista(numero_unico)
);

CREATE TABLE Es_Anulado (
    idVoto INT PRIMARY KEY,
    FOREIGN KEY (idVoto) REFERENCES Voto(id)
);

CREATE TABLE En_Blanco (
    idVoto INT PRIMARY KEY,
    FOREIGN KEY (idVoto) REFERENCES Voto(id)
);

CREATE TABLE Lista (
    numero_unico INT PRIMARY KEY,
    idPartido_Politico INT,
    FOREIGN KEY (idPartido_Politico) REFERENCES Partido_Politico(id)
);

CREATE TABLE Departamental (
    numero_unicoLista INT PRIMARY KEY,
    FOREIGN KEY (numero_unicoLista) REFERENCES Lista(numero_unico)
);

CREATE TABLE Presidencial (
    numero_unicoLista INT PRIMARY KEY,
    FOREIGN KEY (numero_unicoLista) REFERENCES Lista(numero_unico)
);

CREATE TABLE Plebiscito (
    numero_unicoLista INT PRIMARY KEY,
    FOREIGN KEY (numero_unicoLista) REFERENCES Lista(numero_unico)
);

CREATE TABLE Rol (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(100)
);


CREATE TABLE Rol_Lista_Candidato (
    numero_orden INT,
    idLista INT,
    idCandidato INT,
    idRol INT,     
    PRIMARY KEY (idLista, idCandidato),
    FOREIGN KEY (idLista) REFERENCES Lista(numero_unico),
    FOREIGN KEY (idCandidato) REFERENCES Candidato(CI),
    FOREIGN KEY (idRol) REFERENCES Rol(id)
);