const { md, existeRuta, resolverRuta, leerArchivo, validarLinks, processLink } = require('./auxiliar.js')

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    if (existeRuta(ruta)) {
      console.log(existeRuta(ruta), 'hola mi ruta esta aquí');
      //si la ruta es relativa:
      if (resolverRuta(ruta)) {
        console.log(resolverRuta(ruta), 'mi ruta es soy absoluta')
        if (md(ruta)) {
          console.log(md(ruta), 'mi archivo es md :)')
          if (leerArchivo(ruta)
            .then((result) => {
              if (!options.validate) {
                resolve(processLink(result, './files/links.md'))
              } else {
                resolve(validarLinks(processLink(result, './files/links.md')))
              }
            }).catch((error) => {
              reject(error)
            }))
          
      }
    }
  }})

};

mdLinks('./files/links.md', { validate: true }).then().catch





//Funciones auxiliares
//1. ¿Existe la Ruta?
//2. ¿La ruta es absoluta?
//3. Leer archivo, para eso utilizar la ruta absoluta
//4. Validar que el archivo sea md
//5. Validar si el archivo tiene links. Si no contiene, lanzar error.
//6. Extraer los links
//7. Obtener validate en true o false
//8. Si validate es true retornamos información completa. Si validate es false, retornamos información false.

module.exports = {
  mdLinks
};