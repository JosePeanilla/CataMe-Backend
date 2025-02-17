# **Wine Application (Backend) - Grupo Rojo**

This project contains the backend part of the final master's project (*Full-Stack Developer*).  
It has been developed using the knowledge acquired during the master's program, utilizing **Express** and **JavaScript**.

---

## **Table of Contents**

1. [Description](#description)
2. [Content](#content)
    1. [Endpoints](#endpoints)
        1. [Consumer Users](#consumer-users---endpoints)
        2. [Wine Bottles](#wine-bottles---endpoints)
        3. [Winery Users](#winery-users---endpoints)
    2. [Database Collections](#database-collections)
        1. [Consumer Users](#consumer-users---collections)
        2. [Winery Users](#winery-users---collections)
3. [Project Structure](#project-structure)
4. [How to Run the Project](#how-to-run-the-project)
5. [Authentication and Authorization](#authentication-and-authorization)
6. [Logging System](#logging-system)
7. [Additional Dependencies](#additional-dependencies)

---

## **Description**

This project serves as the **backend server** for a **wine application**, designed to provide a personalized experience for consumers, allow them to access wine bottle reviews from other users, and give wineries visibility to promote their products.  

The backend provides functionalities for:
- **User registration**
- **Authentication and authorization**
- **Content and user management**
- **Filtering information about wines and wine regions**

---

## **Content**

The server accepts HTTP requests to interact with the database.  
Implemented endpoints are categorized as follows:

### **Endpoints**

#### Consumer Users - Endpoints

- `GET /users/consumers` - Retrieves a list of all registered consumers.
- `GET /users/consumers/:id` - Retrieves information about a specific consumer user.
- `POST /users/consumers` - Creates a new consumer user.
- `POST /users/login` - Consumer user login.
- `PUT /users/consumers/:id` - Updates a consumer user profile.
- `PATCH /users/consumers/:id/:field` - Updates a specific field of a consumer user profile.
- `DELETE /users/consumers/:id` - Deletes a consumer user account.

#### Wine Bottles - Endpoints

- `GET /wines` - Retrieves a list of all wine bottles.
- `POST /wines` - Registers a new wine bottle (requires administrator approval).

#### Winery Users - Endpoints

- `GET /users/wineries` - Retrieves a list of all registered wineries.
- `GET /users/wineries/:id` - Retrieves information about a specific winery user.
- `POST /users/wineries` - Creates a new winery user.
- `POST /users/login` - Winery user login.
- `PUT /users/wineries/:id` - Updates a winery user profile.
- `PATCH /users/wineries/:id/:field` - Updates a specific field of a winery user profile.
- `DELETE /users/wineries/:id` - Deletes a winery user account.

### **Database Collections**

#### **[Consumer Users](https://cloud.mongodb.com/v2/67a777b4c1a21515f10c8093#/metrics/replicaSet/67a7791765d5d93ca0617377/explorer/test/consumers/find)** - Collections

#### **[Winery Users](https://cloud.mongodb.com/v2/67a777b4c1a21515f10c8093#/metrics/replicaSet/67a7791765d5d93ca0617377/explorer/test/wineries/find)** - Collections

---

## **Project Structure**

```
src/
│-- server.js
│-- auth/
│   │-- authController.js
│   │-- authMiddlewares.js
│   │-- authService.js
│-- constants/
│   │-- statusCodes.js
│-- data/
│   │-- dbConnection.js
│-- users/
│   │-- usersController.js
│   │-- usersRouter.js
│   │-- usersService.js
│   │-- consumers/
│   │   │-- ConsumerModel.js
│   │   │-- consumersController.js
│   │   │-- consumersMiddlewares.js
│   │   │-- consumersRouter.js
│   │   │-- consumersService.js
│   │-- wineries/
│   │   │-- WineryModel.js
│   │   │-- wineriesController.js
│   │   │-- wineriesMiddlewares.js
│   │   │-- wineriesRouter.js
│   │   │-- wineriesService.js
│-- utils/
│   │-- Logger.js
│-- .env
│-- README.md
```

---

## **How to Run the Project**

### **1. Prerequisites**
These steps are **only required once** to set up the environment:

1. Install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file in the project's root directory:
    ```bash
    touch .env
    ```
3. Populate the `.env` file with the following variables:
    ```env
    PORT=3000
    DB_CLUSTER=<cluster_name>
    DB_NAME=<database_name>
    DB_USERNAME=<username>
    DB_PASSWORD=<password>
    JWT_SECRET=<secret_key>
    JWT_DEFAULT_EXPIRATION=1h
    ```

### **2. Execution**

To start the backend server:

- For development:
    ```bash
    npm run dev
    ```
- For production:
    ```bash
    npm run start
    ```

The backend will run by default at **http://localhost:3000/**.

---

## **Authentication and Authorization**

Authentication and authorization are managed using **JWT (JSON Web Token)**.

- Users log in via `POST /users/login`.
- A **JWT token** is generated for authenticated users.
- The middleware `checkProvidedTokenIsValid` protects restricted routes.
- `checkUserIsAuthorized` prevents users from modifying other users' accounts.

---

## **Logging System**

The logging system is managed by `Logger.js` in the `utils/` folder.

- **Logs each incoming request** (`logRoute` in `server.js`).
- **Captures errors** (authentication failures, database issues).
- **Logs successful operations** (user creation, data updates).

Logging levels: **debug, info, warn, error**.

---

## **Additional Dependencies**

### **1. [Cors](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)**  
Enables *Cross-Origin Resource Sharing* to allow external connections.
```bash
npm install cors
```

### **2. [Dotenv](https://www.dotenv.org/)**  
Loads environment variables from `.env` files.
```bash
npm install dotenv
```

### **3. [Express](https://expressjs.com/)**  
Web framework for Node.js.
```bash
npm install express
```

### **4. [JSON Web Token](https://jwt.io/)**  
Generates and verifies authentication tokens.
```bash
npm install jsonwebtoken
```

### **5. [Moment](https://momentjs.com/)**  
Handles dates and times with custom formats.
```bash
npm install moment
```

### **6. [Mongoose](https://mongoosejs.com/)**  
ODM to manage MongoDB models.
```bash
npm install mongoose
```

### **7. [Nodemon](https://nodemon.io/)**  
Automatically restarts the server during development.
```bash
npm install nodemon --save-dev
```

---
