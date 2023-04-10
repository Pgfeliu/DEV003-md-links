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
const archivo = process.argv[2];
console.log(archivo)

//4.¿Es un archivo md? FUNCIÓN Y LLAMAR A ARCHIVO.
const md = (archivo) => {
  const extension = path.extname(archivo);
  if (extension === '.md') {
    return archivo
  } else {
    console.log('Error')
  }
};
md(archivo);


//5. ¿Existe la ruta??
const existeRuta = (ruta) => {
    return fs.existsSync(ruta)
    
};


//6. ¿Es absoluta??
const rutaAbsoluta = path.resolve(archivo); //pongo archivo, porque queremos sacar la ruta al archivo
console.log(rutaAbsoluta)

//7. Leer archivo, para eso utilizar la ruta absoluta
const leerArchivo = (rutas) => {
return new Promise ((resolve,reject)=>{
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
})
// readfile(nombre de archivo, include_path, contexto)

//8. Validar si el archivo tiene links. Si no contiene, lanzar error.
// fs.readlink('./',(err,archivo) => {
//   if(err) {
//     return err;
//   } else {
//     console.log(archivo)
//   }
// })

const processLink = (contenidoArchivo) => {
  const linkCompleto = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g; //expresión regular
  //tomar el contenido del archivo y comparalo a la expresión regular  (linkCompleto)
  const compararLink = Array.from(contenidoArchivo.match(linkCompleto))
  console.log(compararLink)
}
processLink(leerArchivo('./files/link.md'))

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
