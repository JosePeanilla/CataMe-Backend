# Wine Application (Backend) - Grupo Rojo
This project contains the backend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (Express and JS).

## Table of Contents
1. [Description](#description)
2. [Content](#content)
    1. [Endpoints](#endpoints)
        1. [Topics](#topics)
    2. [Database entities/collections](#Database-entities/collections)
3. [How it was created](#how-it-was-created)
4. [Additional dependencies installed](#additional-dependencies-installed)
    1. [Express](#express)
    2. [Nodemon (dev)](#nodemon)
    3. [Dotenv](#dotenv)
    3. [Cors](#cors)
    3. [Mongoose](#mongoose)
5. [How to run the project](#how-to-run-the-project)

---

## Description

This project is the backend of a wine application designed to offer a personalized experience to consumers, wineries and administrators. It provides registration, authentication, information filtering, and content management features related to wines, wine regions, and appellations of origin.

## Content

The project contains the following:

- Endpoint Structure: Routes organized to handle users, authentication, wine bottles, and administration.
- Database Models: Schemas defined with Mongoose for users, wine bottles, orders, and administrators.
- Server Configuration: Use of Express and middleware for handling requests, authentication, and CORS.
- Additional Dependencies: Tools such as Nodemon, Dotenv, and Cors to streamline development and deployment.
- Startup Scripts: Commands configured to facilitate execution in development and production environments.

### **[Endpoints]**

The server is designed to accept HTTP requests, which allow interaction with the information stored in the database. Currently, endpoints have been implemented for the following entities:

- Users: Allows obtaining information from registered users.
- Wines: Provides a list of wines stored in the database.

As the server progresses in development, more endpoints will be added to cover additional functionalities.

#### **[Topics]**

Users

- GET /users/:id: Gets information about a user by ID.
- POST /users: Creates a new user.
- PATCH /users/:id: Updates a user's profile.
- DELETE /users/:id: Deletes a user's account.

Wine Bottles

- GET /wines: List of wine bottles (with optional filters).
- POST /wines: Registers a new wine bottle (requires administrator approval).

### **[Database-entities/collections]**

The data model is organized into MongoDB collections, including:

Users: This collection stores basic information about users registered on the platform.

Properties:

- id (String, unique): Unique identifier of the user.
- name (String): Full name of the user.
- email (String, unique): Email address.
- password (String): Encrypted password for authentication.
- role (String): User role, can be "user" or "admin".
- createdAt (Date): Date the user was created.

Wine Bottles: This collection contains information about registered wine bottles.

Properties:

- id (String, unique): Unique identifier of the bottle.
- name (String): Name of the wine.
- winery (String): Name of the winery that produces the wine.
- region (String): Wine region of origin.
- price (Number): Price of the bottle.
- stock (Number): Quantity available in inventory.
- description (String): Brief description of the wine.
- createdAt (Date): Date of registration in the system.

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