import express from "express"
import { formularioLogin, formularioRegistro, formularioResetPassword, registrar } from "../controllers/usuarioController.js"

const router = express.Router()

// Enrutado
router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);

// Metodo post para enviar la info del formulario al servidor y registrar
// la informacion del usuario
router.post('/registro', registrar);

router.get('/reset_password', formularioResetPassword);

export default router