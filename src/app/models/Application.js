import { sequilize } from "../../database/index.js";
import { DataTypes } from 'sequelize';
import { Course } from "./Course.js";
import { User } from "./User.js";

const Application = sequilize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    course: {
        type: DataTypes.STRING,
        references: {
            model: Course,
            key: 'id',
        },
        allowNull: false
    },
    applicant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id', 
        },
    },
    payment: {
        type: DataTypes.STRING,
        values: ['Pending', 'Paid'],
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        values: ['New', 'In progress', 'Completed'],
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        values: ['Male', 'Female', 'Prefer not to say']
    }
});

Application.sync();

export { Application };