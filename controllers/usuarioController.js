import { check, validationResult } from "express-validator";
import { generarId } from "../helpers/tokens.js"
import { emailRegistro } from "../helpers/emails.js"

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

// Funcion que confirma una cuenta
const confirmar = async (req, res) => {
    const {token} = req.params;

    const usuario = await Usuario.findOne({where: {token}})
    
    if(!usuario){
        return res.render('auth/confirmar_cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }

    usuario.token = null;
    usuario.confirmado = true;
    // Guarda los cambios en la DB (Como hacer un commit)
    await usuario.save();

    res.render('auth/confirmar_cuenta', {
        pagina: 'Error al confirmar tu cuenta',
        mensaje: 'Tu cuenta se confirmó con éxito',
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
    await check('repetir_password').equals(req.body.password).withMessage("Los passwords no coinciden").run(req)

    // Verificar que el resultado esté vacio
    let resultado = validationResult(req)

    // return res.json(resultado.array())

    if(!resultado.isEmpty()){
        // Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Extraer los datos
    const {nombre, email, password} = req.body

    // Verificar que  el usuario no esté duplicado
    // findOne realiza una consulta a la BD. Por lo tanto se le agrega un await
    // porque será una interacción con la BD
    const existeUsuario = await Usuario.findOne({where: {email}})

    if(existeUsuario){
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El usuario ya está registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Almacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId(),
    })

    // Envia email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    // Mostrar mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email de confirmacion. Presiona en el enlace'
    })
    
}

export {
    formularioLogin,
    formularioRegistro,
    formularioResetPassword,
    registrar,
    confirmar
}