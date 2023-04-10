const fs = require('fs');
const path = require('path');
const process = require('process');

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
const archivo = process.argv [2];
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
const existeRuta = (path) => {
fs.access(path,fs.constants.F_OK,(error) => {
  if (error) {
    return error;
  } else {
    console.log ('si existe una ruta')
  } 
})
};
existeRuta(archivo); 

//6. ¿Es absoluta??
const rutaAbsoluta = path.resolve(archivo); //pongo archivo, porque queremos sacar la ruta al archivo
console.log (rutaAbsoluta)

//7. Leer archivo, para eso utilizar la ruta absoluta
//8. Validar si el archivo tiene links. Si no contiene, lanzar error.
//9. Extraer los links
//10. Obtener validate en true o false
//12. Si validate es true retornamos información completa. Si validate es false, retornamos información false.


