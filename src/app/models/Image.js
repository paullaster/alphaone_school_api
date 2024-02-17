import { sequilize } from "../../database/index.js";
import { DataTypes } from 'sequelize';

const Image = sequilize.define('Image', {
    entryNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    sourceID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 
        }
    }
});

Image.sync();

export { Image };