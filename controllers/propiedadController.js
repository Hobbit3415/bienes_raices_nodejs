import Precio from '../models/Precio.js'
import Categoria from '../models/Categoria.js'

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
const crear = async(req, res) => {
  // Consultar modelo de precio y categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll()
  ])

    res.render('propiedades/crear', {
       pagina: 'Crear Propiedad',
       barra: true, 
       categorias,
       precios
    })
}

export {
    admin,
    crear
}

