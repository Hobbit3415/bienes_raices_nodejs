import categorias from "./categorias.js";
import precios from "./precios.js";
// import Precio from "../models/Precio.js";
// import Categoria from "../models/Categoria.js";
import db from "../config/db.js"
import {Categoria, Precio} from '../models/index.js'

const importarDatos = async () => {
  try {
    // Autenticar
    await db.authenticate()
    
    // Generar columnas
    await db.sync()
    
    // Insertar los datos
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios)
    ])

    console.log("Datos importados correctamente")
    process.exit(0)

  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const eliminarDatos = async () => {
  try {
    // Eliminar los datos
    await db.sync({force: true})
    console.log("Datos eliminados correctamente")
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

if(process.argv[2] === "-i"){
  importarDatos();
}

if(process.argv[2] === "-e"){
  eliminarDatos();
}
