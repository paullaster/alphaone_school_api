import { sequilize } from "../../database/index.js";
import { DataTypes, Model} from 'sequelize';

class User extends Model {};

User.init({
    id: {
        type : DataTypes.INTEGER,
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

}, {
    sequilize,
    timestamps: true,
});

User.sync();

export { User };