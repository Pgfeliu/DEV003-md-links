
const path = require('path');
const fs = require('fs');

//4.¿Es un archivo md? FUNCIÓN Y LLAMAR A ARCHIVO.
const md = (archivo) => {
  const extension = path.extname(archivo);
  if (extension === '.md') {
    return true
  } else {
    return false
  }
};
md('./files/links.md');


//5. ¿Existe la ruta??
const existeRuta = (ruta) => {
  return fs.existsSync(ruta)

};

//6.0 Transformación de Ruta relativa a absoluta
const resolverRuta = (ruta) => {
  return path.resolve(ruta)
};
//6.0¿1 Ruta absoluta
// const rutaAbsoluta = (ruta) => {
//   return path.isAbsolute(ruta)
// };


// console.log(rutaAbsoluta)





//7. Leer archivo, para eso utilizar la ruta absoluta
const leerArchivo = (rutas) => {
  return new Promise((resolve, reject) => {
    fs.readFile(rutas, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
};

leerArchivo('./files/links.md').then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
});


//8-9. Validación y extración de links si el archivo tiene links. Si no contiene, lanzar error.
const processLink = (contenidoArchivo, contenidoRuta) => {
  // console.log(contenidoArchivo)
  const linkCompletoExpresReg = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g; //expresión regular
  //tomar el contenido del archivo y comparalo a la expresión regular  (linkCompleto)
  const url = /\(([^)]+)\)/ //me muestra solo lo que esta en parentesis del link.
  const keys = /\[(.*?)\]/; //me muetra lo que esta entre llaves del link
  const informationLink = Array.from(contenidoArchivo.match(linkCompletoExpresReg), (links) => {
    return {
      href: links.match(url)[1],
      text: links.match(keys)[1],
      file: contenidoRuta,
    }
  })
  // console.log(informationLink)
  return informationLink
}
// leerArchivo('./files/links.md').then((result) => {
//   processLink(result,'./files/links.md')
// });

//10. Validar los link y recorrer los HTML
const validarLinks = (arregloDatos) => {
  const recorrerDatos = arregloDatos.map(objetos => {
    return fetch(objetos.href)
      .then((respuesta) => {
        return {
          href: objetos.href, //repasar los objetos, qué le estoy pasando.
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
        }
      })
  });
  return Promise.all(recorrerDatos)
}


// leerArchivo('./files/links.md').then((result) => {
//   validarLinks(processLink(result, './files/links.md')).then(console.log)
// })

module.exports = {
  md,
  existeRuta,
  resolverRuta,
  leerArchivo,
  validarLinks,
  processLink,
};


//Funciones auxiliares
//4. Validar que el archivo sea md
//5. ¿Existe la Ruta?
//6. ¿La ruta es absoluta?
//7. Leer archivo, para eso utilizar la ruta absoluta
//8. Validar si el archivo tiene links. Si no contiene, lanzar error.
//9. Extraer los links
//10. Obtener validate en true o false
//11. Si validate es true retornamos información completa. Si validate es false, retornamos información false.


