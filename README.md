# visionARY
Ingenieria de Software 

Sequelize (manuales)
Migraciones

https://sequelize.org/v5/manual/migrations.html

Modelos

https://sequelize.org/docs/v6/core-concepts/model-basics/

Instalación
Ingresar a la carpeta donde se desea trabajar, ingresa en una terminal y ejecuta los siguientes comandos.

Baja el repositorio en tu maquina local:
git clone https://github.com/AdrianCelayaR/Exgen-Station.git

Ingresar en el proyecto:
cd Exgen-Station

Instalar las dependecias:
npm install

Crear una base de datos para el proyecto.
El proyecto funciona con mysql. En el siguiente enlace se encuentra un instalador para mysql.

https://drive.google.com/file/d/1ntGXwVDwSxQgqIOUioFSK8_jcP0QeVHG/view?usp=sharing

Configurar el archivo config.json que está dentro de la carpeta config

 "development": {
   "username": "tu_username",
   "password": "tu_contraseña",
   "database": "nombre_de_la_base",
   "host": "localhost",
   "dialect": "mysql"
 },
Correr el servidor de Node:

npm start

Para ingresar a proyecto desde el navegador es con la URL

http://localhost:3000/

Nota: En caso de que les salte un error por nodemon, instalar con el siguiente comando

npm i nodemon

Despues volver a hacer npm start y pobran ver el mensaje Welcome to Exgen-Station

Datos inicializados del seeds
Actualmente y de manera temporal existe la ruta http://localhost:3000/users, no obstante, para poder visualizar los datos se tiene que crear la tabla en la base y enviar los datos del seeders

Para crear la estructura temporal que manejamos se hace lo siguiente. En la terminal del proyecto haremos:

Para mandar la migración creada de la tabla users
npx sequelize-cli db:migrate

Para mandar la información del seeders
npx sequelize-cli db:seed:all
