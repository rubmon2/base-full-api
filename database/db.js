import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql"
});

const conectarDB = async () => {
    try {
        // Crear la base de datos si no existe
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME};`);
        console.log(`Base de datos '${process.env.DATABASE_NAME}' creada o existente.`);

        // Autenticar conexión
        await sequelize.authenticate();

        await sequelize.sync();  // Esto sincroniza los modelos con la base de datos
        console.log("Conexión exitosa a la base de datos.");
    } catch (error) {
        console.error("Error al conectar a la base de datos: ", error);
    }
};

export { sequelize, conectarDB };
