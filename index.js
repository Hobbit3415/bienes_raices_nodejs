// Importar express para crear servidor
import express from 'express'
import userRoutes from "./routes/userRoutes.js"
import db from "./config/db.js"

// Crear la app
const app = express()

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({extended: true}))

// Conexion a la base de datos
try{
    await db.authenticate();
    db.sync()
    console.log('Conexion correcta a la db')
}catch(error){
    console.log(error)
}

// Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta publica
// Donde buscar el CSS
app.use(express.static('public'))

// Routing
app.use("/", userRoutes)
app.use("/auth", userRoutes)



// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})