import { sequilize } from "../../database/index.js";
import { DataTypes } from 'sequelize';
import { Course } from "./Course.js";

const Application = sequilize.define('Application', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    course: {
        type: DataTypes.STRING,
        references: {
            model: Course,
            key: 'id',
        },
        allowNull: false
    }
})