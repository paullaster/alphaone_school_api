import { Sequelize } from "sequelize";
import { database as db } from "../config";

const { database, username, password, ...options } = db;

const sequilize = new Sequelize(database, username, password, options);

try {
    await sequilize.authenticate();
    console.log("Database connection established!");
} catch (error) {
    console.error('Unable to connect to dataase ', error);
}

export { sequilize };