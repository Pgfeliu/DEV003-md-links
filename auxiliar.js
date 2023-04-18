const path = require('path');
const fs = require('fs');

//1. ¿Existe la ruta??
const pathExist = (ruta) => {
  return fs.existsSync(ruta)
};

//2. ¿Es absoluta? Transformación de Ruta relativa a absoluta
const pathAbsolute = (ruta) => {
  return path.resolve(ruta)
};

//3.¿Es un archivo md? 
const fileExtension = (ruta) => {
  const extension = path.extname(ruta);
  if (extension === '.md') {
    return true
  } else {
    return false
  }
};
fileExtension('./files/links.md');

//4. Leer archivo
const readFiles = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
};
// readFiles('./files/links.md').then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// });


//5. Analisis de los link
const analyzeLink = (fileContent, pathContent) => {
  // console.log(contenidoArchivo)
  const totalLinkExpresReg = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g; //expresión regular
  //tomar el contenido del archivo y comparalo a la expresión regular  (linkCompleto)
  const url = /\(([^)]+)\)/ //me muestra solo lo que esta en parentesis del link.
  const keys = /\[(.*?)\]/; //me muetra lo que esta entre llaves del link
  const informationLink = Array.from(fileContent.match(totalLinkExpresReg), (links) => {
    return {
      href: links.match(url)[1],
      text: links.match(keys)[1],
      file: pathContent,
    }
  })
  return informationLink
}
// readFiles('./files/links.md').then((result) => {
//   analyzeLink(result, './files/links.md')
// });

//7. Status de los links
const validateLinks = (arrData) => {
  const analyzeDatos = arrData.map(objetos => {
    return fetch(objetos.href)
      .then((respuesta) => {
        return {
          href: objetos.href,
          text: objetos.text,
          file: objetos.file,
          status: respuesta.status,
          ok: respuesta.statusText,
        }
      })
      .catch((error) => {
        return {
          href: objetos.href,
          text: objetos.text,
          file: objetos.file,
          status: error.message,
          ok: 'fail',
        }
      })
  });
  return Promise.all(analyzeDatos)
}
// readFiles('./files/links.md').then((result) => {
//   validarLinks(analyzeLink(result, './files/links.md')).then(console.log)
// })


module.exports = {

  pathExist,
  pathAbsolute,
  fileExtension,
  readFiles,
  analyzeLink,
  validateLinks

};


//Funciones auxiliares

//1. ¿Existe la Ruta?
//2. ¿La ruta es absoluta?
//3. Validar que el archivo sea md
//4. Leer archivo
//5. Validar si el archivo tiene links. Si no contiene, lanzar error.
//6. Extraer los links
//7. Si validate es true retornamos información completa. Si validate es false, retornamos información false.


