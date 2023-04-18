const { pathExist, pathAbsolute, fileExtension, readFiles, analyzeLink, validateLinks } = require('./auxiliar.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (pathExist(path)) {

      if (pathAbsolute(path)) {

        if (fileExtension, (path)) {

          if (readFiles('./files/links.md').then((result) => {
            const links = analyzeLink(result, './files/links.md')
            if (!options.validate) {

              resolve(links)

            } else {
              resolve(validateLinks(links))

            }
          }).catch((error) => {
            reject(error)
          })
          );
        }
      }
    }
  })
}

mdLinks('./files/links.md', { validate: true }).then(console.log).catch(console.log)

module.exports = {
  mdLinks
};




