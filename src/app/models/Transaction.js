import { sequilize } from "../../database/index.js";
import { DataTypes } from 'sequelize';

const Transaction = sequilize.define('Transaction', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    status: {
        type: DataTypes.STRING,
        values: ['Active', 'Suspended'],
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull:false,
    }
});

Course.sync();

export { Course };
