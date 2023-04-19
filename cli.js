const {mdLinks} = require('./mdlinks');
const process = require('process'); //process.argv siempre devolvera un strings.
const chalk = require('chalk')

//Llamar al process para que lo lea en la consola.
const path = process.argv[2];
const validate = process.argv.includes('--validate')||process.argv.includes('--v');
const stats = process.argv.includes('--stats')||process.argv.includes('--s');
const options = {validate, stats};


//Función para Total links
const totalLinks = (link) => {
    const totalOfLinks = link.length;
    return totalOfLinks;
};

//Función para Unique links
const uniqueLinks = (link) =>{
    const href = link.map(links => links.href);
    const hrefsUnique = new Set(href);
    return hrefsUnique.size;
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
        console.log(chalk.green('Total links:'), totalLinks(result))
        console.log(chalk.yellow('Unique links:'), uniqueLinks(result))
        console.log(chalk.red('Broken links:'), brokenLinks(result))
    }else if(validate){
       result.forEach(links =>{
        console.log(chalk.blue('href:'), links.href)
        console.log(chalk.blue('text:'), links.text)
        console.log(chalk.blue('file:'), links.file)
        console.log(chalk.blue('status:'), links.status)
        console.log(chalk.blue('ok:'), links.ok)
       })
    }else if(stats){
        console.log(chalk.magentaBright('Total'),totalLinks(result))
        console.log(chalk.cyanBright('Unique'),uniqueLinks(result))
    }else{
        result.forEach(links =>{
        console.log(chalk.yellow('href'), links.href)
        console.log(chalk.orange('text'), links.text)
        console.log(chalk.yellow('file'), links.file)
        })  
    }
}).catch((error) => {
    console.log(error)
});



