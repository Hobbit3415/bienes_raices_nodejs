import path from 'path'

export default{
  mode: 'development',
  entry: {
    mapa: './src/js/mapa.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js') // Obtiene la ruta absoluta de la carpeta JS de public
  }
}