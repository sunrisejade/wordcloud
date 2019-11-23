let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs'); 

axios.get('https://ca.indeed.com/job/full-stack-developer-73db070d2cd97fac')
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;

            const $ = cheerio.load(html); 
            let wordGot = [];

            $('li,span,p').each(function(i,elm) {
              wordGot[i] = $(this).text().replace(/\s+/g," ")    
            });
            const wordGotTrim = wordGot.filter(n => n != undefined)
            fs.writeFile('wordgot.json', 
                          JSON.stringify(wordGotTrim, null, 4), 
                          (err)=> console.log('File successfully written!'))
    }
}, (error) => console.log(err) );
