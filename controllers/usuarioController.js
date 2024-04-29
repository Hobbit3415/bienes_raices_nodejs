import { check, validationResult } from "express-validator";

import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) =>{
    res.render('auth/login', {
        pagina: 'Iniciar Sesion',
    })
}

const formularioRegistro = (req, res) =>{
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
    })
}

const formularioResetPassword = (req, res) =>{
    res.render('auth/reset_password', {
        pagina: 'Reset Password',
    })
}

/**
 * Metodo para crear un nuevo usuario y agregarlo en la tabla Usuarios
 * de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const registrar = async(req, res) => {
    console.log("Registrando...");

    // Validacion
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({min: 6}).withMessage("El password debe ser de al menos 6 caracteres").run(req)
    await check('repetir_password').equals('password').withMessage("Los passwords no coinciden").run(req)

    // Verificar que el resultado esté vacio
    let resultado = validationResult(req)

    // return res.json(resultado.array())

    if(!resultado.isEmpty()){
        // Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array()
        })
    }

    // ValidationResult valida el resultado segun las reglas establecidas arriba
    resultado = validationResult(req)

    const usuario = await Usuario.create(req.body)

    res.json(usuario);
}

export {
    formularioLogin,
    formularioRegistro,
    formularioResetPassword,
    registrar
}