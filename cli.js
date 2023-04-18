const {mdLinks} = require('./mdlinks');
const process = require('process'); //process.argv siempre devolvera un strings.


//Llamar al process para que lo lea en la consola.
const path = process.argv[2]
const validate = process.argv.includes('--validate')||process.argv.includes('--v');
const stats = process.argv.includes('--stats')||process.argv.includes('--s');
const options = {validate, stats};


//Función para Total links
const totalLinks = (link) =>{
    const totalOfLinks = link.length;
    return totalOfLinks;
};

//Función para Unique links
const uniqueLinks = (link) =>{
    const href = link.map(links => links.href);
    const hrefsUnique = new Set(href);
    return hrefsUnique .size;
};

//Función para Broken links
const brokenLinks = (link) =>{
    const filterMessage = link.filter(links => links.ok === 'fail');
    const failsUnique = new Set(filterMessage);
    return failsUnique.size;
};


//Sentencias que se indican al stats y validate para su funcionamiento en el CLI
mdLinks(path, options).then(result => {
    if(stats && validate){
        console.log('Total links:', totalLinks(result))
        console.log('Unique links:', uniqueLinks(result))
        console.log('Broken links:', brokenLinks(result))
    }else if(validate){
       result.forEach(links =>{
        console.log('href:', links.href)
        console.log('text:', links.text)
        console.log('file:', links.file)
        console.log('status:', links.status)
        console.log('ok:', links.ok)
       })
    }else if(stats){
        console.log('Total',totalLinks(result))
        console.log('Unique',uniqueLinks(result))
    }else{
        result.forEach(links =>{
        console.log('href', links.href)
        console.log('text', links.text)
        console.log('file', links.file)
        })  
    }
}).catch((error) => {
    console.log(error)
});



