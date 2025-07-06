Trabajo realizado por los estudiantes:
Juan Sosa Dias
Nicolás Ferreira
Santiago Caruso

Materia: Bases de Datos 2
Profesor: Ignacio Calderazzo
Año: 1er semestre 2025
Universidad Católica del Uruguay








--------Sistema de Votación Electrónica - Elecciones Presidenciales del Uruguay--------


Este proyecto implementa una plataforma de votación electrónica compuesta por un frontend en React, un backend en Node.js (Express) y una base de datos MySQL alojada en un servidor externo proporcionado por la facultad.

Utiliza Docker Compose para levantar los servicios.


------------------------
ESTRUCTURA DEL PROYECTO:
------------------------

/backend   (Servidor Node.js con Express y rutas REST)
/frontend  (Aplicación React (votante y administrador))
/.env      (Variables de entorno (DB, puertos, JWT))
/docker-compose.yaml (Configuración de Docker)


----------------------------------
REQUISITOS PREVIOS A LA EJECUCIÓN:
----------------------------------

- Docker y Docker Compose instalados (Link para instalarlos: https://www.docker.com/products/docker-desktop)
- Aplicación Docker Desktop abierta y corriendo (si no esta abierta corriendo, no va a funcionar el "Docker-Compose")
- Acceso a internet para poder conectarse a la Base de Datos


----------------------------------------------
PASOS PARA REALIZAR LA EJECUCIÓN DEL PROYECTO:
----------------------------------------------

1- CLONAR EL REPOSITORIO

> Ejecutar en la terminal de la computadora: "git clone https://github.com/nicolasferreirat/ObligaFinalBD2"
> Luego ir hacia la ruta de esa carpeta donde quedó clonado y abrir Visual Studio Code: 1("cd ObligaFinalBD2" ) 2("code.")


2- ASEGURARSE DE TENER EL ARCHIVO .ENV

> Si no lo tiene, cree un archivo en la raiz con el nombre ".env" y este contenido dentro:
    # Backend
    DB_HOST=mysql.reto-ucu.net   
    DB_PORT=50006               
    DB_NAME=IC_Grupo1      
    DB_USER=ic_g1_admin         
    DB_PASSWORD=Bd2025!    
    PORT=4000
    JWT_SECRET=miclavesecreta123

    # Frontend
    FRONTEND_PORT=3000

ANTES DE EJECUTARLO:
Si desea que en la página del admin, no lo deje cerrar la mesa al presidente antes de las 19.30 (Hora Uruguay), descomente
de la linea 67 a la 80  del archivo \frontend\src\pages\admin\votacionPage\votacionPage.js que tiene esa validación hecha.
(Está comentada para visualizar el funcionamiento de la página, ya que es una demo).

3- EJECUTAR DOCKER COMPOSE

>Abrir la terminal de VScode y ejecutar en la ruta de la carpeta "ObligaFinalBD2" este comando: "docker-compose up --build"
>Este proceso podría demorar unos minutos la primera vez.
>Luego de haber finalizado el proceso de ejecución se levantarán estos servicios:
>frontend: en http://localhost:3000
>backend: en http://localhost:4000

>Para parar los servicios ejecute Ctrl + C en la terminal, esto los detendrá.
>Luego para bajarlos ejecute en la terminal "Docker compose down -v".


4- ACCESO A LA APLICACIÓN

Rutas del usuario votante:
> Para ingresar a la aplicación por el lado del usuario votante, debe de ingresar en su navegador "http://localhost:3000/".
> Para ingresar como ADMINISTRADOR, debe ingresar en su navegador "http://localhost:3000/admin/login"

Luego de esto se presentarán a lo largo de la ejecución estas rutas:

Por el lado del usuario VOTANTE:
- Inicio: "http://localhost:3000/eleccionesInicio"

Por el lado del usuario ADMINISTRADOR:
- INICIO:                                     "http://localhost:3000/admin/inicio"
- ELECCIONES YA HABILITADAS:                  "http://localhost:3000/admin/elecciones/enCurso"
- ELECCIONES FINALIZADAS:                     "http://localhost:3000/admin/resultados"
- RESULTADOS POR LISTAS EN EL CIRCUITO:       "http://localhost:3000/admin/resultadosCircuitos/listas"
- RESULTADOS POR CANDIDATOS EN EL CIRCUITO:   "http://localhost:3000/admin/resultadosCircuitos/candidatos"
- RESULTADOS POR PARTIDOS EN EL CIRCUITO:     "http://localhost:3000/admin/resultadosCircuitos/partidos"
- RESULTADOS POR PARTIDOS POR DEPARTAMENTO:   "http://localhost:3000/admin/resultadosPartidos/departamentos"
- RESULTADOS POR CANDIDATOS POR DEPARTAMENTO: "http://localhost:3000/admin/resultadosCandidatos/departamentos"


----------------------
ENDPOINTS DEL BACKEND:
----------------------
En archivo admin.js:
- /admin/login  = POST para loguearse como usuario ADMINISTRADOR
- /credencialesAsignadasCircuito/:idCircuito = GET para mostrar las CC asignadas al circuito(ciudadanos y trabajadores)
- /admin/inicio = GET para mostrar los datos del circuito en la página de inicio

En archivo estadosVotacion.js:
- /habilitarVotacion/:idCircuito = POST para habilitar la eleccion en el circuito 
- /estadoVotacion/:idCircuito = GET para consultar si está habilitado el circuito
- /cerrarVotacion/:idCircuito = POST para cerrar el circuito

En archivo resultados.js:
- /resultados/ganador = GET obtiene al ganador de las elecciones
- /resultados/listas/:idCircuito = GET obtiene los votos válidos y observados por listas en un circito específico
- /resultados/diferentes/:idCircuito = GET obtiene los votos en blanco y anulados en un circuito especifico
- /resultados/partidos/:idCircuito = GET obtiene los resultados por partido en un circuito específico
- /resultados/candidatos/:idCircuito = GET obtiene los resultados por candidatos en un circuito especifico
- /departamentos = GET obtiene todos los departamentos 
- /resultados/partido/departamento/:idDepartamento = GET obtiene los resultados por partido en un departamento especifico
- /resultados/candidato/departamento/:idDepartamento = GET obtiene los resultados por candidatos en un departamento especifico.

En archivo votante.js:
- /votante/login = POST para loguears como usuario VOTANTE

En archivo integrantes.js:
- /integrantes = GET obtiene los integrantes de cada lista

En archivo listas.js:
- /listas = GET obtiene todas las listas con el nombre del partido politico
- /listas/partido/:id = GET obtiene las listas de un partido en especifico

En archivo partidos.js:
- /partidos = GET obtiene todos los partidos politicos

En archivo votos.js:
- /voto = POST para registrar un voto
- /voto/valido = POST para registrar que el voto fue valido
- /voto/anulado = POST para registrar que el voto fue anulado
- /voto/blanco = POST para registar que el voto fue en blanco
- /voto/observado = POST para registrar que el voto fue observado
- /voto/marcarYavoto = PUT para cambiar el estado de la credencial votante a yavoto=true.


-----------------
POSIBLES ERRORES
-----------------
ER_ACCESS_DENIED_ERROR = credenciales incorrectas en .env

ECONNREFUSED = base de datos no disponible desde tu red

SI OCURRE ESTO:
the attribute version is obsolete, it will be ignored, please remove it to avoid potential confusion"
unable to get image 'obligafinalbd2-frontend': error during connect: Get "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/v1.48/images/obligafinalbd2-frontend/json": open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.

= Es porque no tiene abierto y corriendo Docker Desktop en su computadora
