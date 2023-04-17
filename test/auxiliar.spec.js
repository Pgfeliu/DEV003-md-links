const functionAuxiliares = require('../auxiliar.js');

describe('ver si la ruta existe', () => {
    it ('si existe la ruta retornar true', () =>{
        expect(functionAuxiliares.existeRuta('./files/links.md')).toEqual(true)
    });
});

// describe('si la ruta no existe', () => {
//     it ('si la ruta no existe, retorna false', () => {
//         expect(functionAuxiliares.existeRuta('./files/noexiste.md')).toEqual(false)
//     });
// });
// describe('es una ruta absoluta', () =>{
//     it ('retorna la ruta si esta es absoluta', () => {
//         expect(functionAuxiliares.resolverRuta('C:\Users\the_p\ProyectosPame\DEV003-md-links\files\links.md')).toEqual('C:\Users\the_p\ProyectosPame\DEV003-md-links\files\links.md')
//     });
// });