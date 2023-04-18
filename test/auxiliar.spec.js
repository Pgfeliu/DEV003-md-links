const functionAuxiliares = require('../auxiliar.js');

describe('ver si la ruta existe', () => {
       it ('si existe la ruta retornar true', () =>{
        expect(functionAuxiliares.pathExist('./files/links.md')).toEqual(true)
    });
});

describe('ver si la ruta no existe', () => {
    it ('si no existe la ruta retorar false', () =>{
     expect(functionAuxiliares.pathExist('./files/linkses.md')).toEqual(false)
 });
});


describe('es una ruta absoluta', () =>{
    it ('retorna la ruta si esta es absoluta', () => {
        expect(functionAuxiliares.pathAbsolute('C:\\Users\\the_p\\ProyectosPame\\DEV003-md-links\\files\\links.md')).toBe('C:\\Users\\the_p\\ProyectosPame\\DEV003-md-links\\files\\links.md')
    });

    it ('retorna ruta absoluta, aunque pase una ruta relativa', () => {
        expect(functionAuxiliares.pathAbsolute('files\\links.md')).toEqual('C:\\Users\\the_p\\OneDrive\\Desktop\\ProyectosPame\\DEV003-pame md-links\\files\\links.md')
    });
});