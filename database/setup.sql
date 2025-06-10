
CREATE TABLE Persona (
    CI VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    edad INT
);

CREATE TABLE Departamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE Zona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    idDepartamento INT,
    FOREIGN KEY (idDepartamento) REFERENCES Departamento(id)
);

CREATE TABLE Establecimiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    ubicacion VARCHAR(200),
    idZona INT,
    FOREIGN KEY (idZona) REFERENCES Zona(id)
);

CREATE TABLE Partido_Politico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    direccion_sede VARCHAR(200),
    presidente VARCHAR(100),
    vicepresidente VARCHAR(100)
);

CREATE TABLE Candidato (
    CI VARCHAR(20),
    id_PartidoPolitico INT,
    PRIMARY KEY (CI, id_PartidoPolitico),
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (id_PartidoPolitico) REFERENCES Partido_Politico(id)
);


CREATE TABLE Agente_Policial (
    comisaria VARCHAR(100),
    CI VARCHAR(20) PRIMARY KEY,
    idEstablecimiento INT,
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (idEstablecimiento) REFERENCES Establecimiento(id)
);

CREATE TABLE Miembro_Mesa (
    organismo_trabaja VARCHAR(100),
    CI VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (CI) REFERENCES Persona(CI)
);

CREATE TABLE Presidente_Mesa (
    CI VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (CI) REFERENCES Persona(CI)
);

CREATE TABLE Secretario_Mesa (
    CI VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (CI) REFERENCES Persona(CI)
);

CREATE TABLE Vocal_Mesa (
    CI VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (CI) REFERENCES Persona(CI)
);

CREATE TABLE Circuito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    es_accesible BOOLEAN,
    idEstablecimiento INT,
    FOREIGN KEY (idEstablecimiento) REFERENCES Establecimiento(id)
);

CREATE TABLE Mesa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_mesa INT,
    idCircuito INT,
    CIPresidente VARCHAR(20),
    CISecretario VARCHAR(20),
    CIVocal VARCHAR(20),
    FOREIGN KEY (idCircuito) REFERENCES Circuito(id),
    FOREIGN KEY (CIPresidente) REFERENCES Presidente_Mesa(CI),
    FOREIGN KEY (CISecretario) REFERENCES Secretario_Mesa(CI),
    FOREIGN KEY (CIVocal) REFERENCES Vocal_Mesa(CI)
);

CREATE TABLE Credencial_Civica (
    serie VARCHAR(10),
    numero VARCHAR(10),
    CI VARCHAR(20),
    idCircuito INT,
    yavoto BOOLEAN,
     PRIMARY KEY (serie, numero),
    FOREIGN KEY (CI) REFERENCES Persona(CI),
    FOREIGN KEY (idCircuito) REFERENCES Circuito(id)
);

CREATE TABLE Voto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_emitido DATE,
    hora_emitido TIME,
    idCircuito INT,
    FOREIGN KEY (idCircuito) REFERENCES Circuito(id)
);

CREATE TABLE Lista (
    numero_unico INT PRIMARY KEY,
    imagen VARCHAR(300),
    idPartido_Politico INT,
    FOREIGN KEY (idPartido_Politico) REFERENCES Partido_Politico(id)
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100)
);


CREATE TABLE Rol_Lista_Candidato (
    numero_orden INT,
    idLista INT,
    idCandidato VARCHAR(20),
    idRol INT,     
    PRIMARY KEY (idLista, idCandidato),
    FOREIGN KEY (idLista) REFERENCES Lista(numero_unico),
    FOREIGN KEY (idCandidato) REFERENCES Candidato(CI),
    FOREIGN KEY (idRol) REFERENCES Rol(id)
);


INSERT INTO Persona (CI, nombre, apellido, edad) VALUES
('34523125', 'Emiliano', 'Ancheta', 35),
('31243774', 'Juan', 'Sosa Dias', 42),
('54365042', 'Nicolas', 'Ferreira', 29),
('51526653', 'Luis', 'Mejia', 50),
('54634794', 'Cristian', 'Oliva', 54),
('54946369', 'Nicolás', 'López', 19),
('48639847', 'Fernando', 'Luna', 18),
('27511204', 'Sofía', 'Martínez', 21);
