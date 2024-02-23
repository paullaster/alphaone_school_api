import { sequilize } from "../../database/index.js";
import { DataTypes } from 'sequelize';

const Transaction = sequilize.define('Transaction', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    transactionID: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    status: {
        type: DataTypes.STRING,
        values: ['Pending', 'Settled'],
        allowNull: false,
    },
    transactionDate: {
        type: DataTypes.STRING,
        allowNull:true,
    }
});

Transaction.sync();

export { Transaction };
