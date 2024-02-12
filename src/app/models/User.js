import { sequilize } from "../../database/index.js";
import { DataTypes } from 'sequelize';

const User = sequilize.define('User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.ENUM('leaner', 'admin'),
            allowNull: false,
            defaultValue: 'leaner',
        },

    }
);

User.sync();

export { User };