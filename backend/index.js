const express = require('express');
const app = express();
const Freq = require('wordfrequenter')
const axios=require('axios');
const cheerio = require('cheerio');


// listen server
app.listen(5000,function(){
    console.log("Server is running on Port");
  });

//Access-Control-Allow-Credentials：附带身份凭证的请求，标志设置为 true，代表向服务器发送cookie。一般跨域请求浏览器不会发送身份凭证信息。
//Access-Control-Allow-Origin: * 表明，该资源可以被任意外域访问。
//如果服务端仅允许来自 http://foo.example 的访问，该首部字段的内容如下：Access-Control-Allow-Origin: http://foo.example
//Access-Control-Allow-Headers：首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。
//x-requested-with 请求头 区分ajax请求还是普通请求。为 null，则为传统同步请求。XMLHttpRequest为 Ajax 异步请求
//Access-Control-Allow-Methods：表明服务器允许客户端使用 POST, GET 等方法发起请求
//Access-Control-Max-Age：表明该响应的有效时间为 86400 秒，也就是 24 小时。在有效时间内，浏览器无须为同一请求再次发起预检请求。
//Other：5000端口作为服务器端口需要进行跨域设置，允许该资源可以被任意外域访问，这样前端的3000端口访问时才能成功

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Credentials","true")
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "x-requested-with");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
    res.header("Access-Control-Max-Age", "86400");
    next();  
});


// 1.Use Axios and cheerio for web scraping
// 2.Use wordfrequenter to split string and count words
// 3.Create a words count list then format this list's shape based on react-d3-cloud's data shape  

function axiosGet(){
    return axios.get(`https://ca.indeed.com/job/full-stack-developer-73db070d2cd97fac`)
    .then(res => {
        const html = res.data;
        const $ = cheerio.load(html);

        let wordGot = [];
            $('li,span,p,a').each(function(i,elm) {
              wordGot[i] = $(this).text().replace(/\s+/g," ")   
            });

        const wordGotTrim = wordGot.filter(n => n != undefined);
        const wf = new Freq(wordGotTrim.toString().split(' '));

        wf.set('string')
        // console.dir(wf.get('cool'))
        let words=wf.list()

        let list = [];

        for (let i in words) {
          list.push({text:words[i]["word"] ,value:words[i]["count"]})
        } 

        return list
    }).catch((err)=> console.error(err))
}

// 3.Send back list to front end
app.get('/', function(req, res) {
    axiosGet().then(list=> res.json(list))
});

// split()：方法用于把一个字符串分割成字符串数组
// str.replace(/\s+/g," ") 将字符间的多个空格替换成1个空格

//  finalWordsArray = Object.keys(wordsMap).map(function (key) {
//   return {
//     name: key,
//     total: wordsMap[key]
//   };
// });