import Propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'

// Propiedad tiene un precio  1:1
Precio.hasOne(Propiedad, {foreignKey: 'precioId'});
// Propiedad.belongsTo(Precio) // Estas dos lineas son equivalentes

// Cada propiedad tiene una y solo una categoria
Categoria.hasOne(Propiedad, {foreignKey: 'categoriaId'})

// Cada usuario tiene una propiedad
Propiedad.hasOne(Usuario, {foreignKey: 'usuarioId'})

export {
  Propiedad,
  Precio,
  Categoria,
  Usuario
}