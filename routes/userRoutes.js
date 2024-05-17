import express from "express"
import { formularioLogin, formularioRegistro, formularioResetPassword, registrar, confirmar, resetPassword, comprobarToken, nuevoPassword, } from "../controllers/usuarioController.js"

const router = express.Router()

// Enrutado
router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);

// Metodo post para enviar la info del formulario al servidor y registrar
// la informacion del usuario
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/reset_password', formularioResetPassword);
router.post('/reset_password', resetPassword);

// Almacena el nuevo password
router.get('/reset_password/:token', comprobarToken);
router.post('/reset_password/:token', nuevoPassword);

export default router