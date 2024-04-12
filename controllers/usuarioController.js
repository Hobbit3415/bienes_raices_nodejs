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

export {
    formularioLogin,
    formularioRegistro,
    formularioResetPassword
}