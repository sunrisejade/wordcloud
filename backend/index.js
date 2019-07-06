const express = require('express');
const app = express();

const Freq = require('wordfrequenter')
const axios=require('axios');
const cheerio = require('cheerio');

app.listen(5000,function(){
    console.log("Server is running on Port");
  });
  app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Credentials","true")
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "x-requested-with");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
    res.header("Access-Control-Max-Age", "86400");
    next();  
});

  
function axiosGet(){
    return axios.get(`https://ca.indeed.com/job/full-stack-developer-73db070d2cd97fac`)
    .then(res => {
        const html = res.data;
        const $ = cheerio.load(html);

        let wordGot = [];
            $('li,span,p,a').each(function(i,elm) {
              wordGot[i] = $(this).text().replace(/\s+/g," ")    
            });
        const wordGotTrim = wordGot.filter(n => n != undefined)
        const wf = new Freq(wordGotTrim.toString().split(' '))
        wf.set('string')
        // console.dir(wf.get('cool'))
        // console.dir(wf.list())
        let words=wf.list()

        let list = [];
        for (let i in words) {
          list.push({text:words[i]["word"] ,value:words[i]["count"]})
        }      
        return list
    }).catch((err)=> console.error(err))
}


app.get('/', function(req, res) {
    axiosGet().then(list=> res.json(list))
});
  