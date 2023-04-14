const functionAuxiliares = require('../auxiliar.js');

describe('ver si la ruta existe', ()=>{
    it ('si existe la ruta retornar true', () =>{
        expect(functionAuxiliares.existeRuta('./files/links.md')).toEqual(true)
    });
});

// describe('es una ruta absoluta', () =>{
//     it ('retorna la ruta si esta es absoluta', () => {
//         expect(functionAuxiliares.resolverRuta('./files/links.md')).toEqual('./files/links.md')
//     });
// });