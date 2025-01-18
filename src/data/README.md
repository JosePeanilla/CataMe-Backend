# Wine Application - DataBase
Here it is explained how the DataBase was created, and what are its contents.

## Table of Contents
1. [How it was created](#how-it-was-created)

---

## How it was created

To initialize the database, below steps were followed:

1. **Create** an organization inside *[MongoDB Atlas](https://cloud.mongodb.com/)* webpage:  
    ```06-fsdesp-1024-equipo-rojo```

2. **Add** users to the *[Organization Access](https://cloud.mongodb.com/v2#/org/67712d85968fd25eb0bd8fa0/access/users)* webpage:

    1. Marti Planaguma - Organization Owner
    2. Jose - Organization Member
    3. Maria - Organization Member
    4. Nico - Organization Member

3. **Create** a project inside the created organization:  
    ``` TFM - Wine Application```

4. **Add** users to the *[Project Access](https://cloud.mongodb.com/v2/67712e8d74ee353776ed51a7#/access)* webpage:

    1. Marti Planaguma - Project Owner
    2. Jose - Project Data Access Read/Write
    3. Maria - Project Data Access Read/Write
    4. Nico - Project Data Access Read/Write

5. **Create** a cluster inside the created project:  
    ```Cluster```

6. **Add** users to the *[Database Access](https://cloud.mongodb.com/v2/67712e8d74ee353776ed51a7#/security/database/users)* webpage:

    1. Marti Planaguma - Atlas admin
    2. Jose - Read and write to any database
    3. Maria - Read and write to any database
    4. Nico - Read and write to any database

    In addition, it has been added a "teacher" user to enable anyone from the teaching staff to access the database:  

    5. teacher - Read and write to any database

7. **Configure** the permitted IPs in the *[Network Access](https://cloud.mongodb.com/v2/67712e8d74ee353776ed51a7#/security/network/accessList)* webpage:

    1. Marti Planaguma IP
    2. Jose IP
    3. María IP
    4. Nico IP

    In addition, it has been added an "anywhere" IP address to enable anyone to access the database:  

    5. ```0.0.0.0/0```

8. **Configure** the connection to the database with the server, using:  
    ```
    mongodb+srv://<db_username>:<db_password>@<db_cluster>.qdd0s.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<db_cluster>
    ```
