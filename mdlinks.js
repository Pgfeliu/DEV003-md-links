const { md, existeRuta, resolverRuta, leerArchivo, validarLinks, 
  processLink, ruta, validate, stats, validarOpciones, links } = require('./auxiliar.js')

const mdLinks = () => {
  return new Promise((resolve, reject) => {
    if (existeRuta(ruta)){
      console.log(existeRuta(ruta), 'hola mi ruta esta aquí')
      if (resolverRuta(ruta)){
        console.log(resolverRuta(ruta), 'mi ruta es soy absoluta')
        if (md(ruta)){
          console.log(md(ruta), 'mi archivo es md :)')
          if (leerArchivo(ruta).then((result) => {
            if (validate) {
              resolve(processLink(result, ruta)) //si el resultado es negativo, solo me debe devolver los link, no validarlos.
            } else if(validate===true && stats===false) {
              resolve(validarLinks(processLink(result, ruta))) //en cambio si es true, debe validar el link.
            } else if(stats) {
              resolve(validarOpciones(links))
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

mdLinks(ruta, {validate}).then().catch






//Funciones auxiliares
//1. ¿Existe la Ruta?
//2. ¿La ruta es absoluta?
//3. Leer archivo, para eso utilizar la ruta absoluta
//4. Validar que el archivo sea md
//5. Validar si el archivo tiene links. Si no contiene, lanzar error.
//6. Extraer los links
//7. Obtener validate en true o false
//8. Si validate es true retornamos información completa. Si validate es false, retornamos información false.

