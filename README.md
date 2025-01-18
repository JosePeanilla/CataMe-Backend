# Wine Application (Backend) - Grupo Rojo
This project contains the backend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (Express and JS).

## Table of Contents
1. [Description](#description)
2. [Content](#content)
    1. [Endpoints](#endpoints)
        1. [Users](#users)
        2. [Wine bottles](#wine-bottles)
    2. [Database collections](#database-collections)
        1. [Users collection](#users-collection)
        2. [Wine bottles collection](#wine-bottles-collection)
4. [How to run the project](#how-to-run-the-project)
    1. [Prerequisites](#prerequisites)
    2. [Execution](#execution)
5. [How it was created](#how-it-was-created)
6. [Additional dependencies installed](#additional-dependencies-installed)
    1. [Express](#express)
    2. [Nodemon (dev)](#nodemon)
    3. [Dotenv](#dotenv)
    4. [Cors](#cors)
    5. [Mongoose](#mongoose)

---

## Description

This project is the backend server of a **wine application**, designed to offer a personalized experience to consumers, approach them to different bottles' reviews by other customers, and visibility to wineries to promote their products.  
It provides registration, authentication, information filtering, and content management features related to types of wine, and wine regions, among others.

## Content

Below are listed the different endpoints the server is able to accept (so possible requests to make to), and the different entities/collections the database stores:

### Endpoints

The server is designed to accept HTTP requests, which allow interaction with the information stored in the database.  
Below can be found the current implemented endpoints, divided by topic:

#### Users

These endpoints allow obtaining information from the registered users:

- `GET /users` - Get the list of all registered users.
- `GET /users/:id` - Gets information about a specific user.
- `POST /users` - Creates a new user.
- `PATCH /users/:id` - Updates a user's profile.
- `DELETE /users/:id` - Deletes a user's account.

#### Wine bottles

These endpoints allow obtaining information from the wine bottles:

- `GET /wines` - Get the list of all the wine bottles.
- `POST /wines` - Registers a new wine bottle (requires administrator approval).

### Database collections

The data model is organized into MongoDB collections, which are:

#### Users collection

This collection stores basic information about users registered in the platform, and their properties are:

- _id (String, unique): Unique identifier of the user. Provided automatically by MongoDB when creating the item.
- full_name (String): User's full name.
- email (String, unique): User's email address. Must not be repeated among the database.

#### Wine bottles collection

This collection stores the information about the bottles of wine which belong to any of the registered wineries, and their properties are:

- description (String): Brief description of the wine.
- _id (String, unique): Unique identifier of the bottle. Provided automatically by MongoDB when creating the item.
- name (String): Name of the wine.
- price (Number): Price of the bottle.

## How to run the project

### Prerequisites

These are the steps needed to be **executed only once**, to set the environment:

1. Install the Node packages:
    ```bash
    npm install
    ```
2. Create a .env file at the root of the project:
    ```bash
    touch .env
    ```
3. Fill the created .env file with:
    ```env
    DB_CLUSTER=<db_cluster_name>
    DB_NAME=<db_name>
    DB_PASSWORD=<db_user_password>
    DB_USERNAME=<db_username>
    PORT=<server_port>
    ```

### Execution

As this is an Express (back-end) application, it is set to be launched simply with:
- During development - ```npm run dev```.
- During deployment - ```npm run start```.

Backend (server) should be running at **http://localhost:3000/**.

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

### **[Moment](https://momentjs.com/)**:

This package is used to get date and time with specific format in a simpler way.

```bash
npm install moment
```
