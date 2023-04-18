const { md, existeRuta, resolverRuta, leerArchivo, validarLinks, processLink} = require('./auxiliar.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (existeRuta(path)){
      // console.log(existeRuta(ruta), 'hola mi ruta esta aquí')
      if (resolverRuta(path)){
        // console.log(resolverRuta(ruta), 'mi ruta es soy absoluta')
        if (md(path)){
          // console.log(md(ruta), 'mi archivo es md :)')
          if (leerArchivo('./files/links.md').then((result) => {
            const links = processLink(result,'./files/links.md')
            if (!options.validate) {
              resolve(links)
                // (result, ruta)) //si el resultado es negativo, solo me debe devolver los link, no validarlos.
            } else {
              resolve(validarLinks(links))
              // (result, ruta) //en cambio si es true, debe validar el link.
            } 
          }).catch((error) => {
            reject(error)
          })
          );
        }
        }  
        }  
        })    
  }

mdLinks('./files/links.md', {validate:true}).then(console.log).catch(console.log)

module.exports = {
  mdLinks
};






//Funciones auxiliares
//1. ¿Existe la Ruta?
//2. ¿La ruta es absoluta?
//3. Leer archivo, para eso utilizar la ruta absoluta
//4. Validar que el archivo sea md
//5. Validar si el archivo tiene links. Si no contiene, lanzar error.
//6. Extraer los links
//7. Obtener validate en true o false
//8. Si validate es true retornamos información completa. Si validate es false, retornamos información false.

