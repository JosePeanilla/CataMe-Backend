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

2. **Add** users to the *[Organization Access](https://cloud.mongodb.com/v2#/org/67a777b4c1a21515f10c8074/access/users)* webpage:
    1. Jose Peanilla - Organization Owner
    2. Maria Zamora - Organization Owner
    3. Nicolas Rende - Organization Owner

3. **Create** a project inside the created organization: ``` TFM - Wine Application```

4. **Add** users to the *[Project Access](https://cloud.mongodb.com/v2/67a777b4c1a21515f10c8093#/access)* webpage:
    1. Jose Peanilla - Organization Owner
    2. Maria Zamora - Organization Owner
    3. Nicolas Rende - Organization Owner

5. **Create** a cluster inside the created project: ```Cluster```

6. **Add** users to the *[Database Access](https://cloud.mongodb.com/v2/67a777b4c1a21515f10c8093#security/database/users)* webpage:
    1. Jose Peanilla - Organization Owner
    2. Maria Zamora - Organization Owner
    3. Nicolas Rende - Organization Owner

    > Just for review purposes, it has also been added a *"teacher"* user to enable anyone (from the teaching staff) to access the database:
    >
    > 5. teacher - Read and write to any database

7. **Configure** the permitted IPs in the *[Network Access](https://cloud.mongodb.com/v2/67a777b4c1a21515f10c8093#/security/network/accessList)* webpage:
    1. Jose Peanilla IP
    2. María Zamora IP
    3. Nicolas Rende IP

    > Just for review purposes, it has also been added an *"anywhere"* IP address to enable anyone (from the teaching staff) to access the database:
    >
    > 5. `0.0.0.0/0`

8. **Configure** the connection from the server to the database, using:
    ```
    mongodb+srv://<db_username>:<db_password>@<db_cluster>.qdd0s.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<db_cluster>
    ```
    Notice that all of these `<param>` parameters shall be defined in `.env` file from the root of the project.
