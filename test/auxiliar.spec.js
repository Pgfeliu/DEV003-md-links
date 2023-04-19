const functionAuxiliares = require('../auxiliar.js');
global.fetch = jest.fn()

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

// Test con Mock

const firstArray = [{
    href: 'https://es.wikipedia.og/wiki/Markdown',
    text: 'Markdown',
    file: 'files/links.md',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Link-roto',
    file: 'files/links.md',
  }
]

const lastArray = [{
    href: 'https://es.wikipedia.og/wiki/Markdown',
    text: 'Markdown',
    file: 'files/links.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Link-roto',
    file: 'files/links.md',
    status: 400,
    ok: 'fail'
  }]

//fetch.mockImplementationOnce(cb => cb(null,true))
// .mockImplementationOnce(cb => cb(null,false))


describe('test para validar los links', () => {
 fetch.mockImplementationOnce(() => Promise.resolve({status: 200, statusText: 'ok'}))
.mockImplementationOnce(() => Promise.reject({status: 400, statusText: 'fail'}))
    it('retornar el array recorrido', () => {
        functionAuxiliares.validateLinks(firstArray).then((result) => {
            expect(result).toEqual(lastArray)
        })
    })
    it('retornar el array recorrido aunque este roto', () => {
        functionsAuxiliares.validateLinks(firstArray).then((result) => {
            expect(result).toEqual(lastArray)
        })
    })
})