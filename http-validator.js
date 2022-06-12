const fetch = require('node-fetch');

async function validateLinks(links) {
    console.log('Validating links...');
    const results = await Promise.all(links.map(link => { 
        return validate(link).then(
            status => {
                 console.log(`Status ${status} for ${link.link} from ${link.file}`);
                return {
                    ...link,
                    ...status
                };
            }
        );
    }));
    console.log(results);
}

async function validate(link) {
    console.log(`Validating ${link.link} from ${link.file}`);
    const result = await fetch(link.link);
    return {
        "status": result.status,
        "response": result.status
    };
}

module.exports = validateLinks;