import { sequilize } from "../../database/index.js";
import { DataTypes } from 'sequelize';

const Application = sequilize.define('Application', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    }
})