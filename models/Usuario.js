import { DataTypes } from "sequelize";
import db from "../config/db.js"

/**
 * The Define method defines a new model representing a table in the DB.
 * The table columns are defined by the hash that is given as the second argument. 
 * Each attribute of the hash represents a column.
 */
const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
})

export default Usuario;
