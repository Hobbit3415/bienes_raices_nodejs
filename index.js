// Importar express para crear servidor
import express from 'express'
import userRoutes from "./routes/userRoutes.js"

// Crear la app
const app = express()

// Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

// Routing
app.use("/", userRoutes)
app.use("/auth", userRoutes)

// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})