# Wine Application (Backend) - Grupo Rojo
This project contains the backend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (Express and JS).

## Table of Contents
1. [How it was created](#how-it-was-created)
2. [Additional dependencies installed](#additional-dependencies-installed)
    1. [Express](#express)
    2. [Nodemon (dev)](#nodemon)
    3. [Dotenv](#dotenv)
    3. [Cors](#cors)
    3. [Mongoose](#mongoose)
3. [How to run the project](#how-to-run-the-project)

4. [Description](#description)

5. [List of functions](#list-of-functions)
   1. [Users](#users)
      1. [Consumer](#consumer)
      2. [Store](#store)
      3. [Administrator](#administrator)
      4. [Visitors](#visitors)
      5. [Registered users](#registered-users)

   2. [Product](#product) 
      1. [Wine bottles](#wine-bottles)

   3. [General](#general)

6. [Endpoints](#endpoints)
   1. [Login and logout](#login-and-logout)
   2. [Users](#users)
   3. [Store](#store)
   4. [Administrator](#administrator)
   5. [Wine bottles](#wine-bottles)

---

## How it was created

To initialize the project, below steps were followed:

1. **Clone** the repository
    ```bash
    git clone https://github.com/FSDSTR1024/TFM-backend-rojo.git
    ```

2. **Navigate** to the project directory
    ```bash
    cd TFM-backend-rojo
    ```

3. **Initialize** a *NPM* (Node Package Manager) project:
    ```bash
    npm init
    ```

4. **Create** the *server.js* file, where the main logic will be hosted:
    ```bash
    mkdir src
    touch src/server.js
    ```

5. **Extend** the *package.json* file with usual launching scripts commands:
    - **start**: ```node ./src/server.js```
    - **dev**: ```npx nodemon ./src/server.js```

## Additional dependencies installed

### **[Express](https://expressjs.com/es/)**:

This package is the most important and sets up the infrastructure for the web aplication.

```bash
npm install express
```

### **[Nodemon](https://nodemon.io/)**:

This (developer) package is used to restart the server once changes are saved.

```bash
npm install nodemon --save-dev
```

### **[Dotenv](https://www.dotenv.org/)**:

This package is used to load *environmental variables* from **.env** files.

```bash
npm install dotenv
```

### **[Cors](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)**:

This package is used to enable the *Cross-Origin Resource Sharing*, and permit others to connect the server.

```bash
npm install cors
```

### **[Mongoose](https://mongoosejs.com/)**:

This package is used to provide schemas for the database models.

```bash
npm install mongoose
```

## How to run the project

As this is an Express (back-end) application, it is set to be launched simply with:
```bash
npm run dev
```
during development.

And with:
```bash
npm run start
```
during deployment.

Backend (server) should be running at **http://localhost:3000/**.


## Description

Este proyecto es el backend de una aplicación de vinos diseñada para ofrecer una experiencia personalizada a consumidores, bodegas y administradores. Proporciona funcionalidades de registro, autenticación, filtrado de información, y gestión de contenido relacionado con vinos, regiones vitivinícolas, y denominaciones de origen.


## List of functions

   **Users**

   1. **Consumer**

      Record:

        Debe ser mayor de 18 años.
        Definir geolocalización.
        Listado obligatorio de experiencia: Novato, Aprendiz, Experto, Master, Profesional.
        Texto descriptivo opcional (con ejemplos en los placeholders).
        Se envía un correo de confirmación al registrarse.

      Actions:

        Login y Logout.
        Valorar botellas de vino.
        Filtrar botellas y bodegas con información detallada.
        Estado de verificación.
        Logros internos (años de experiencia, botellas reseñadas, tiempo en el sistema).
        Estatus de usuario (por ejemplo, "TOP").
        Contactar con administradores.
        Modificar perfil.
        Eliminar cuenta.
        Suscripción a avisos de nuevas botellas de vino que cumplan ciertos parámetros:
        Se envía un correo cuando hay un nuevo "match".
        Recepción de un correo mensual con un newsletter informativo.


    2. **Store**
       
       Record:

         Registro:
         Debe ser mayor de 18 años.
         Se envía un correo de confirmación al registrarse.

       Actions:

         Login y Logout.
         Pedir aprobación para registrar botellas de vino.
         Pedir aprobación para ofrecer información sobre la bodega:
         Página web.
         Ubicación.
         Filtrar botellas y bodegas con información detallada.
         Estado de verificación.
         Contactar con administradores.


    3. **Administrator**

       Record:

         Los integrantes del equipo pueden registrarse como administradores.

       Actions:

         Login y Logout.
         Aceptar o denegar solicitudes de registro de botellas por parte de bodegas.
         Aceptar o denegar solicitudes de ofrecer información de bodegas.
         Eliminar cuentas de usuarios consumidores o bodegas.
         Contactar con usuarios consumidores y bodegas.
 

    4. **Visitors**

       Actions:

         Filtrar botellas y bodegas con información limitada.


    5. **Registered users**

       Actions:
         
         Filtrar botellas y bodegas con información completa.



    **Product**

    1. **Wine bottles**

       Actions:

         Valoradas por usuarios consumidores.
         Asociadas a:
         Regiones vitivinícolas (que ofrecen información adicional).
         Denominaciones de Origen (DO), si aplica.
         Registro solicitado por usuarios bodega y aprobado por administradores.
         Base de datos inicial incluye:
         Datos de Europa, América y Oceanía.
         Filtrado


    **General**

       Actions:

         Confirmación de mayoría de edad al entrar a la aplicación.
         Confirmación de aceptación de cookies.
         Aplicación completamente en castellano.
         Tecnologías Utilizadas
         Framework Backend: [Nombre del framework, por ejemplo, Django, Express.js, etc.]
         Base de Datos: [Nombre de la base de datos, por ejemplo, PostgreSQL, MongoDB, etc.]
         Autenticación: [JWT, OAuth2, etc.]
         Correo Electrónico: [Servicio de correo, por ejemplo, SendGrid, Nodemailer, etc.]
         Geolocalización: [API utilizada, por ejemplo, Google Maps, OpenStreetMap, etc.]
         DO/Regiones: [Fuente de datos, por ejemplo, bases de datos externas, manual, etc.]
     

## Endpoints

    1. **Login and logout**
   
        POST /auth/register - Registro de usuarios.
        POST /auth/login - Inicio de sesión.
        POST /auth/logout - Cierre de sesión.

    2. **Users**

        GET /users/:id - Información del usuario.
        PATCH /users/:id - Modificar perfil.
        DELETE /users/:id - Eliminar cuenta.

    3. **Wine bottles**

        GET /wines - Lista de botellas (con filtro).
        POST /wines - Registrar botella (requiere aprobación).

    4. **Store**

        GET /wineries - Lista de bodegas (con filtro).
        POST /wineries/info-request - Solicitar agregar información.

    5. **Administrator**

        POST /admin/approve-wine - Aprobar botella.
        POST /admin/approve-winery-info - Aprobar información de bodega.
        DELETE /admin/delete-user - Eliminar usuario.
         



