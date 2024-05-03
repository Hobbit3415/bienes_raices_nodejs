import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcryptjs";

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
    token: DataTypes.STRING, // Token para enviar al usuario y validar que existe (como confirmacion en dos pasos)
    confirmado: DataTypes.BOOLEAN,
}, {
    hooks: {
        beforeCreate: async function (usuario) {
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password, salt);
        }
    }
})

export default Usuario;
