const process = require('process');
const path = require('path');
const fs = require('fs');



//PROCESO A REALIZAR
//1. Escribir en la consola
//2. Registrar lo escrito en la consola
//3. De lo que se escribió obtener el archivo
//4. Validar que el archivo sea md
//5. ¿Existe la Ruta?
//6. ¿La ruta es absoluta?
//7. Leer archivo, para eso utilizar la ruta absoluta
//8. Validar si el archivo tiene links. Si no contiene, lanzar error.
//9. Extraer los links
//10. Obtener validate en true o false
//12. Si validate es true retornamos información completa. Si validate es false, retornamos información false.


//1,2,3
// const archivo = process.argv[2];
// console.log(archivo)

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


//6. ¿Es absoluta??
const rutaAbsoluta = (ruta) => {
  return path.resolve(ruta)
}; //pongo archivo, porque queremos sacar la ruta al archivo
// console.log(rutaAbsoluta)

//7. Leer archivo, para eso utilizar la ruta absoluta
const leerArchivo = (rutas) => {
return new Promise ((resolve,reject) => {
  fs.readFile(rutas,'utf-8', (err,data) => {
    if(err){
      reject (err);
    } else {
      resolve (data);
    }
  })
}) 
};

leerArchivo('./files/link.md').then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
});


//8. Validar si el archivo tiene links. Si no contiene, lanzar error.
const processLink = (contenidoArchivo, contenidoRuta) => {
  console.log(contenidoArchivo)
  const linkCompletoExpresReg = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g; //expresión regular
  //tomar el contenido del archivo y comparalo a la expresión regular  (linkCompleto)
  const url = /\(([^)]+)\)/ //me muestra solo lo que esta en parentesis del link.
  const keys = /\[(.*?)\]/; //me muetra lo que esta entre llaves del link
  const informationLink = Array.from(contenidoArchivo.match(linkCompletoExpresReg), (links) => {
    console.log(informationLink)
    return {
      href: links.match(url)[1] ,
      txt: links.match(keys)[1],
      file: contenidoRuta,
    }
  })
    return informationLink
  // console.log(contenidoArchivo)
}
leerArchivo('./files/links.md').then((result) => {
  processLink(result,'./files/links.md')
})
// processLink(leerArchivo('./files/link.md'))

//9. Extraer los links
//10. Obtener validate en true o false
//12. Si validate es true retornamos información completa. Si validate es false, retornamos información false.

// const mdLinks = (ruta,options) =>{
  
//   if(existeRuta(ruta)) {
//     const rutaAbsoluta = path.resolve(ruta); //pongo archivo, porque queremos sacar la ruta al archivo
//     console.log(rutaAbsoluta);
//   } else {
//     console.log('error');
//   }

// };
// console.log(mdLinks(archivo,{}));
