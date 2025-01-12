# Wine Application (Backend) - Grupo Rojo
This project contains the backend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (Express and JS).

## Table of Contents
1. [Description](#description)
2. [Content](#content)
    1. [Endpoints](#endpoints)
        1. [Topics](#topics)
3. [Database collections](#Database-collections)
4. [How it was created](#how-it-was-created)
5. [Additional dependencies installed](#additional-dependencies-installed)
    1. [Express](#express)
    2. [Nodemon (dev)](#nodemon)
    3. [Dotenv](#dotenv)
    4. [Cors](#cors)
    5. [Mongoose](#mongoose)
6. [How to run the project](#how-to-run-the-project)

---

## Description

This project is the backend server of a **wine application**, designed to offer a personalized experience to consumers and wineries.  
It provides registration, authentication, information filtering, and content management features related to wines, wine regions, and designations of origin.

## Content

The project contains the following:
Below are listed the different endpoints the server is able to accept (so possible requests to make to), and the different entities/collections the database stores:

### Endpoints

The server is designed to accept HTTP requests, which allow interaction with the information stored in the database.  
Below can be found the current implemented endpoints, divided by topic:

#### Users

These endpoints allow obtaining information from the registered users:

- ```GET /users```: Get the list of all the registered users.
- ```POST /users```: Creates a new registered user.

#### Topics

Users

- GET /users/:id: Gets information about a user by ID.
- POST /users: Creates a new user.
- PATCH /users/:id: Updates a user's profile.
- DELETE /users/:id: Deletes a user's account.

Wine Bottles

- GET /wines: List of wine bottles (with optional filters).
- POST /wines: Registers a new wine bottle (requires administrator approval).

## Database-collections

The data model is organized into MongoDB collections, including:

This collection stores basic information about users registered in the platform, and their properties are:

Users

Properties:

- _id (String, unique): Unique identifier of the user.
- full_name (String): User's full name.
- email (String, unique): User's email address. Must not be repeated among the database.

Wine Bottles

Properties:

- _id (String, unique): Unique identifier of the bottle.
- name (String): Name of the wine.
- winery (String): Name of the winery that produces the wine.
- region (String): Wine region of origin.
- price (Number): Price of the bottle.
- stock (Number): Quantity available in inventory.
- description (String): Brief description of the wine.

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
