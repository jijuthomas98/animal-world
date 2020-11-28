const fs = require('fs');
const http = require('http');
const url = require('url');
//const slugify = require('slugify');
const replaceTemplate = require('./replaceTemplate');



///////////////////////////////////////////////////////////////////////////////////////////



const Data =fs.readFileSync('./ANIMAL.json', 'utf-8');  
const tempOverview =fs.readFileSync('./ok.html', 'utf-8');
const tempProduct =fs.readFileSync('./okProduct.html', 'utf-8');
const tempCard =fs.readFileSync('./okCard.html', 'utf-8');

const DataObj = JSON.parse(Data);



const server = http.createServer((req,res)=>{
    const {query, pathname} = url.parse(req.url, true);


    //OVERVIEW
     if(pathname === '/' || pathname === '/overview'){
      res.writeHead(200,{'content-type':'text/html'});
      const cardHtml = DataObj.map(el=> replaceTemplate(tempCard,el)).join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
      res.end(output);
      
     }
    // Product page
      else if (pathname === '/animal') {
      res.writeHead(200, {
     'Content-type': 'text/html'
      });
       const animal = DataObj[query.id];
       const output = replaceTemplate(tempProduct, animal);
        res.end(output);
 

    //API
    } else if(pathname === '/api'){
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(Data);
      }


    //NOT FOUND
     else{
      
      res.writeHead(404, {'Content-type':'text/html'});
      res.end('<h1>Page not found</h1>');
    }

   
});
server.listen(8000, '127.0.0.1',()=> {
    console.log('Listening to server from port 8000');
});