import express from "express"
import { formularioLogin, formularioRegistro, formularioResetPassword } from "../controllers/usuarioController.js"

const router = express.Router()

// Enrutado
router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.get('/reset_password', formularioResetPassword);

export default router