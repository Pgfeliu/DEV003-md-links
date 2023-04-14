const process = require('process');


const archivo = process.argv;
console.log(archivo)

// const ruta = process.argv[2];
// const validate = process.argv.includes('--validate');
// const stats = process.argv.includes('--stats');
// const options = { validate, stats };

// mdLinks(ruta, options)
//   .then(links => {
//     if (stats && validate) {
//       const result = linkStatsComplete(links);
//       console.log(result);
//     } else if (validate) {
//       const result = extractLinksFromFiles(ruta);
//       console.log(result);
//     } else if (stats) {
//       const result = linkStats(links);
//       console.log(result);
//     } else {
//       console.log(getLinks(links));
//     }
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });


// PROCESO CLI

// 1. Escribir en la consola
// 2. Registrar lo escrito en la consola
// 3. De lo que se escribió obtener el archivo