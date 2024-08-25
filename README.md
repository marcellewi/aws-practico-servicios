# Configuración de CLI

### Primero configura un nuevo usuario, en este caso "asp":

```bash
aws configure --profile asp
```

De ahora en adelante todos los comandos que se corran desde esta consola deberan tener la flag al final --profile asp

Para ver las credenciales en mac podemos abrir el archivo utilizando el comando

```bash
open ~/.aws/credentials
```

en windows normalmente se encuentran en:

```bash
C:\NOMBRE_DE_TU_USUARIO\.aws\credentials
```

# CREAR UNA BASE DE DATOS CON TABLAS

Como estamos usando sequelize, se utilizan los siguientes comandos para crear una base y una tabla con Users como modelo

Crear base de datos:

```bash
npx sequelize-cli db:create
```

Generar modelo y crear migracion (si ya se genero el modelo una vez no es necesario este paso)

```bash
npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string
```

Correr migraciones

```bash
npx sequelize-cli db:migrate
```

Para el siguiente ejemplo se utilizo Sequelize como ORM. Las configuraciones se podrian automatizar para detectar automaticamente el entorno en el que se esta trabajando. Para este ejemplo simplemente modificaremos el código manualmente.

Si se esta corriendo local

### CONFIG.JSON

```bash
{
    "development": {
        "username": "postgres",
        "password": "marcel",
        "database": "aws-practico-servicios",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
}
```

### DATABASE.JSON

```bash
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: false
  }
});

module.exports = { sequelize };
```

Para usar con servicios de AWS (Produccion)

### CONFIG.JSON

```bash
{
    "development": {
        "username": "postgres",
        "password": "postgres",
        "database": "aws-practico-servicios",
        "host": "aws-practica-servicios.cvd2cr73x5qr.us-east-1.rds.amazonaws.com",
        "dialect": "postgres",
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }
}
```

### DATABASE.JS

```bash
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = { sequelize };
```
