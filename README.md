# Wine Application (Backend) - Grupo Rojo
This project contains the final degree project for the "*Full-Stack Developer*" master.  
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
