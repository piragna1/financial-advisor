import app from 'express';
import http from 'http';


//create server
const server = http.createServer(
    function (request, response) {
        response.statusCode =200;
        response.setHeader('Content-type', 'text/plain');
        response.end('End of response.');
    }
);

//listen
server.listen(3000, () => {
    'Server running at http://localhost:3000'
})

//request
const req = http.request(options, (res) => {
    console.log(`status code:${res.statusCode}
        headers: ${res.headers}\n
    `);
    res.setEncoding('utf-8');
    res.on('data', (chunk) => {
        console.log(`Chunk's data type: ${typeof chunk}
            Chunk's length: ${chunk.length}
            Body (chunk itself): ${chunk}`);
    });
    res.on('end', () => {console.log('No more data in response.')});
});
req.on('error', (error) => {console.log(`Problem with request. Error message: ${error.message}`);});
req.write(JSON.stringify({key:"value"}));
req.end('End of request.');

//get
http.get('http://www.example.com', (res) => {
    const { statusCode }  = res;
    console.log('status code:', statusCode);
    res.on('data' , (chunk) => {
        console.log(`body: ${chunk}`);
    });
});import express from 'express';