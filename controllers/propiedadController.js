const admin = (req, res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        barra: true
    })
}

/**
 * Formulario para crear una propiedad
 * @param {*} req 
 * @param {*} res 
 */
const crear = (req, res) => {
    res.render('propiedades/crear', {
       pagina: 'Crear Propiedad',
       barra: true, 
    })
}

export {
    admin,
    crear
}

