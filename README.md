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

# Elastick Beanstalk

Primero analizar la aplicacion y que hace.

Para crear una aplicacion en Elastic Beanstalk, primero debemos crear un archivo zip con el contenido de nuestra aplicacion

Tambien en el .env pondremos todas las variables de entorno que necesitamos para que la aplicacion funcione correctamente. Recordar que no es buena practica subir las variables de entorno a un repositorio publico.

# Bucket S3

Remplazar "Resource" por el nombre de tu bucket

```bash
{
  "Version": "2012-10-17",
  "Id": "MyPolicy",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tu-arn/*"
    }
  ]
}
```

Por que se necesita un bucket s3 para subir el frontend?
Porque el frontend es una aplicacion estatica y no se puede subir a un servidor de aplicaciones como Elastic Beanstalk, y para hacerlo deberiamos subirlo a un servidor web como Apache o Nginx, pero esto es mas complicado y costoso, por lo que se sube a un bucket s3 que es mas facil y barato.
