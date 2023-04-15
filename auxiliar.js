const path = require('path');
const fs = require('fs');


//1. ¿Existe la ruta??
const existeRuta = (ruta) => {
  return fs.existsSync(ruta)
};


//2. ¿Es absoluta? Transformación de Ruta relativa a absoluta
const resolverRuta = (ruta) => {
  return path.resolve(ruta)
};
//2.1 Ruta absoluta
// const rutaAbsoluta = (ruta) => {
//   return path.isAbsolute(ruta)
// };
// console.log(rutaAbsoluta)

//3.¿Es un archivo md? 
const md = (archivo) => {
  const extension = path.extname(archivo);
  if (extension === '.md') {
    return true
  } else {
    return false
  }
};
md('./files/links.md');

//4. Leer archivo
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


//5.6. Validación y extración de links si el archivo tiene links. 
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
leerArchivo('./files/links.md').then((result) => {
  processLink(result, './files/links.md')
});

//7. Validar los link y recorrer los HTML
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


leerArchivo('./files/links.md').then((result) => {
  validarLinks(processLink(result, './files/links.md')).then(console.log)
})

module.exports = {
  md,
  existeRuta,
  resolverRuta,
  leerArchivo,
  validarLinks,
  processLink,
};


//Funciones auxiliares

//1. ¿Existe la Ruta?
//2. ¿La ruta es absoluta?
//3. Validar que el archivo sea md
//4. Leer archivo
//5. Validar si el archivo tiene links. Si no contiene, lanzar error.
//6. Extraer los links
//7. Si validate es true retornamos información completa. Si validate es false, retornamos información false.


