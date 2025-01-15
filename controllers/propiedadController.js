import { validationResult } from 'express-validator'
import {Precio, Categoria, Propiedad} from '../models/index'

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
const crear = async (req, res) => {
  console.log("Entre a metodo crear")

  // Consultar modelo de precio y categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll()
  ])

  return res.render('propiedades/crear', {
    pagina: 'Crear Propiedad',
    barra: true,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    datos: {}
  })

}

const guardar = async (req, res) => {
  console.log("Entre a metodo guardar")
  // Validacion
  let resultado = validationResult(req)

  if (!resultado.isEmpty()) {
    // Consultar modelo de precio y categorias
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll()
    ])

    return res.render('propiedades/crear', {
      pagina: 'Crear Propiedad',
      barra: true,
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body
    })
  }

  // Crear un registro

  const {titulo, descripcion, categoria:categoriaId, precio:precioId, habitaciones, estacionamiento, wc} = req.body

  try {
    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId,
      categoriaId
    })
  } catch (error) {
    console.log(error)
  }

}

export {
  admin,
  crear,
  guardar
}
