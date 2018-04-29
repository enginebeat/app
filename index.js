/*
*
*Primary file for the API
*
*/

var app = {};

// dependencies
const http  = require('http');
var url     = require('url');

const {StringDecoder} = require('string_decoder');

const server = http.createServer((req, res)=>{
    //get the url and parse it
    var parsedUrl = url.parse(req.url, true);
    //Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get the query string as an object
    var queryStringObject = parsedUrl.query;

    //Get the headers as an object
    var headers = req.headers;

    //Get the HTTP Method
    var method = req.method.toLowerCase();

    // Get The payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data)=>{
        buffer += decoder.write(data);
    });
    req.on('end', ()=>{
        buffer += decoder.end();

        //Send the request
        res.end('Hello World\n');

        //Log the request path
        console.log('Request received with this payload: ', buffer);

    });
    /*
    //Send the request
    res.end('Hello World\n');

    //Log the request path
    console.log('Request received with these headers', headers);
    */

    /*
    console.log('Request received on path: ' + trimmedPath +
        ' with method: ' + method +
        ' and these query string params: ', queryStringObject);
    */
});

server.listen(3000, ()=>{
    console.log('The Server is Listening on port 3000 now!');
});

// Define the handlers
var handlers = {};

// Sample handler
handlers.sample = (data, callback)=>{
    callback(406, {'name': 'samplehandler'});
};

// Not found handler
handlers.noFound = (data, callback)=>{
    callback(404);
};


// Define a request router
var router = {
    'sample': handler.sample
};