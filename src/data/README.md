# Wine Application - Data
Here it is explained the different data the server uses, the reason of usage, and how it was created (if it applies).

## Table of Contents
1. [MongoDB Database](#mongodb-database)
    1. [How it was created](#how-it-was-created)

---

## MongoDB Database
To allow the server work with some data, it has been decided to use a **MongoDB cluster** to store the that information.  

### How it was created
To initialize the database, below steps were followed:

1. **Create** an organization inside *[MongoDB Atlas](https://cloud.mongodb.com/)* webpage: ```06-fsdesp-1024-equipo-rojo```

2. **Add** users to the *[Organization Access](https://cloud.mongodb.com/v2#/org/67712d85968fd25eb0bd8fa0/access/users)* webpage:
    1. Marti Planaguma - Organization Owner
    2. Jose - Organization Member
    3. Maria - Organization Member
    4. Nico - Organization Member

3. **Create** a project inside the created organization: ``` TFM - Wine Application```

4. **Add** users to the *[Project Access](https://cloud.mongodb.com/v2/67712e8d74ee353776ed51a7#/access)* webpage:
    1. Marti Planaguma - Project Owner
    2. Jose - Project Data Access Read/Write
    3. Maria - Project Data Access Read/Write
    4. Nico - Project Data Access Read/Write

5. **Create** a cluster inside the created project: ```Cluster```

6. **Add** users to the *[Database Access](https://cloud.mongodb.com/v2/67712e8d74ee353776ed51a7#/security/database/users)* webpage:
    1. Marti Planaguma - Atlas admin
    2. Jose - Read and write to any database
    3. Maria - Read and write to any database
    4. Nico - Read and write to any database

    > Just for review purposes, it has also been added a *"teacher"* user to enable anyone (from the teaching staff) to access the database:
    >
    > 5. teacher - Read and write to any database

7. **Configure** the permitted IPs in the *[Network Access](https://cloud.mongodb.com/v2/67712e8d74ee353776ed51a7#/security/network/accessList)* webpage:
    1. Marti Planaguma IP
    2. Jose IP
    3. María IP
    4. Nico IP

    > Just for review purposes, it has also been added an *"anywhere"* IP address to enable anyone (from the teaching staff) to access the database:
    >
    > 5. `0.0.0.0/0`

8. **Configure** the connection from the server to the database, using:
    ```
    mongodb+srv://<db_username>:<db_password>@<db_cluster>.qdd0s.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<db_cluster>
    ```
    Notice that all of these `<param>` parameters shall be defined in `.env` file from the root of the project.
