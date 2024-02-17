import { sequilize } from "../../database/index.js";
import { DataTypes } from 'sequelize';

const Image = sequilize.define('Image', {
    entryNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        unique: true,
    }
});

Image.sync();

export { Image };