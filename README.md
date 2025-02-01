# Wine Application (Backend) - Grupo Rojo

This project contains the backend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (Express and JS).

## Table of Contents

1. [Description](#description)
2. [Content](#content)
    1. [Endpoints](#endpoints)
        1. [Consumers](#consumer-users---endpoints)
        2. [Wine bottles](#wine-bottles---endpoints)
        3. [Wineries](#winery-users---endpoints)
    2. [Database collections](#database-collections)
        1. [Consumers](#consumer-users---collection)
        2. [Wine bottles](#wine-bottles---collection)
        3. [Wineries](#winery-users---collection)
3. [How to run the project](#how-to-run-the-project)
    1. [Prerequisites](#prerequisites)
    2. [Execution](#execution)
4. [How it was created](#how-it-was-created)
5. [Additional dependencies installed](#additional-dependencies-installed)
    1. [Cors](#cors)
    2. [Dotenv](#dotenv)
    3. [Express](#express)
    4. [JSON Web Token](#json-web-token)
    5. [Moment](#moment)
    6. [Mongoose](#mongoose)
    7. [Nodemon (dev)](#nodemon)

---

## Description

This project is the backend server of a **wine application**, designed to offer a personalized experience to consumers, approach them to different bottles' reviews made by other users, and give visibility to wineries to promote their products.  
It provides registration, authentication, information filtering, and content management features related to types of wine, and wine regions, among others.

## Content

Below are listed the different endpoints the server is able to accept (so possible requests to make to), and the different entities/collections the database stores:

### Endpoints

The server is designed to accept HTTP requests, which allow interaction with the information stored in the database.  
Below can be found the current implemented endpoints, divided by topic:

#### Consumer users - Endpoints

These endpoints allow obtaining information from ALL the registered consumers:

- `GET /users/consumers` - Get the list of all registered consumers.
- `GET /users/consumers/:id` - Get the information about a specific consumer user.  
    A consumer user with given ID must exist in the database.
- `POST /users/consumers` - Create a new consumer user.  
    It requires that all necessary arguments are passed in the request body.
- `PUT /users/consumers/:id` - Update a consumer user's profile.  
    A consumer user with given ID must exist in the database.
    It requires that all necessary arguments are passed in the request body.
- `PATCH /users/consumers/:id/:field` - Update a consumer user's profile specific field.  
    A consumer user with given ID must exist in the database.
    The given field must be from a consumer user entity.
- `DELETE /users/consumers/:id` - Delete a consumer user's account.  
    A consumer user with given ID must exist in the database.

#### Wine bottles - Endpoints

These endpoints allow obtaining information from the wine bottles:

- `GET /wines` - Get the list of all the wine bottles.
- `POST /wines` - Register a new wine bottle (requires administrator approval).

#### Winery users - Endpoints

These endpoints allow obtaining information from ALL the registered wineries:

- `GET /users/wineries` - Get the list of all registered wineries.
- `GET /users/wineries/:id` - Get the information about a specific winery user.  
    A winery user with given ID must exist in the database.
- `POST /users/wineries` - Create a new winery user.  
    It requires that all necessary arguments are passed in the request body.
- `PUT /users/wineries/:id` - Update a winery user's profile.  
    A winery user with given ID must exist in the database.
    It requires that all necessary arguments are passed in the request body.
- `PATCH /users/wineries/:id/:field` - Update a winery user's profile specific field.  
    A winery user with given ID must exist in the database.
    The given field must be from a winery user entity.
- `DELETE /users/wineries/:id` - Delete a winery user's account.  
    A winery user with given ID must exist in the database.

### Database collections

The data model is organized into MongoDB collections, which are:

#### **[Consumer Users](https://cloud.mongodb.com/v2/67712e8d74ee353776ed51a7#/metrics/replicaSet/677133a831c8bf6d5272e506/explorer/Database/consumers/find)** - Collection

This collection stores basic information about consumers registered in the platform, and their properties are:

- `_id` *(String, unique)*: Unique identifier of the consumer user. Provided automatically by MongoDB when creating the item.
- `email` *(String, unique)*: Consumer user's account email address. Must not be repeated among the database.
- `is_active` *(Boolean)*: Indicates wheter the user is active or not. Default value is `true`.
- `name` *(String)*: Consumer name.
- `password` *(String)*: Consumer user's account password.
- `role` *(String, immutable)*: User role. Constant default value of `consumer`.
- `surname` *(String)*: Consumer surname.

#### Wine bottles - Collection

This collection stores the information about the bottles of wine which belong to any of the registered wineries, and their properties are:

- `_id` *(String, unique)*: Unique identifier of the bottle. Provided automatically by MongoDB when creating the item.
- `description` *(String)*: Brief description of the wine.
- `name` *(String)*: Name of the wine.
- `price` *(Number)*: Price of the bottle.

#### **[Winery Users](https://cloud.mongodb.com/v2/67712e8d74ee353776ed51a7#/metrics/replicaSet/677133a831c8bf6d5272e506/explorer/Database/wineries/find)** - Collection

This collection stores basic information about wineries registered in the platform, and their properties are:

- `_id` *(String, unique)*: Unique identifier of the winery user. Provided automatically by MongoDB when creating the item.
- `description` *(String, optional)*: Brief information about the winery. Default value is a `null`.
- `email` *(String, unique)*: Winery user's account email address. Must not be repeated among the database.
- `is_active` *(Boolean)*: Indicates wheter the user is active or not. Default value is `false`.
- `location` *(String)*: Location (city, country, etc) where it is located the winery.
- `name` *(String)*: Winery name.
- `password` *(String)*: Winery user's account password.
- `phone` *(String, optional)*: Telephone number to contact the winery. Default value is a `null`.
- `role` *(String, immutable)*: User role. Constant default value of `winery`.
- `web_page` *(String, optional)*: URL of the winery web page. Default value is a `null`.

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

Backend (server) should be running, by default, at **http://localhost:3000/**.

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

### **[Cors](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)**:

This package is used to enable the *Cross-Origin Resource Sharing*, and permit others to connect the server.

```bash
npm install cors
```

### **[Dotenv](https://www.dotenv.org/)**:

This package is used to load *environmental variables* from **.env** files.

```bash
npm install dotenv
```

### **[Express](https://expressjs.com/es/)**:

This package is the most important and sets up the infrastructure for the web aplication.

```bash
npm install express
```

### **[JSON Web Token](https://jwt.io/)**:

This package is used to generate and verify tokens, which is essential for handling authentication and authorization in the application.

```bash
npm install jsonwebtoken
```

### **[Moment](https://momentjs.com/)**:

This package is used to get date and time with specific format in a simpler way.

```bash
npm install moment
```

### **[Mongoose](https://mongoosejs.com/)**:

This package is used to provide schemas for the database models.

```bash
npm install mongoose
```

### **[Nodemon](https://nodemon.io/)**:

This (developer) package is used to restart the server once changes are saved.

```bash
npm install nodemon --save-dev
```
