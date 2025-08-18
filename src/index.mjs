import express from 'express';
import http from 'http';


const app = express();
const PORT = 3000;


//create server
const server = http.createServer(
    function (request, response) {
        if (request.url === '/'){
            response.setHeader('Content-type', 'text/plain');
            response.writeHead(200,{'Content-type':'text/html'});
            response.write('<h1>Hello World!</h1>'
                // , (error) => console.log(`error: ${error.message}`)
            );
            response.end(console.log('End of response.'));
        }
        else {
            response.writeHead(404);
            response.end('Page not found');
        }
    }
);


//listen
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})

const options = {
    hostname: 'example.com',
    port:80,
    path:'/upload',
    method:'POST',
    headers: { 'Content-Type':'application/json'}
};

//request
// const req = http.request(options, (res) => {
//     console.log(`status code:${res.statusCode}
//         headers: ${res.headers}\n
//     `);
//     res.setEncoding('utf-8');
//     res.on('data', (chunk) => {
//         console.log(`Chunk's data type: ${typeof chunk}
//             Chunk's length: ${chunk.length}
//             Body (chunk itself): ${chunk}`);
//     });
//     res.on('end', () => {console.log('No more data in response.')});
// });
// req.on('error', (error) => {console.log(`Problem with request. Error message: ${error.message}`);});
// req.write(JSON.stringify({key:"value"}));
// req.end('End of request.');

//get
// http.get('http://www.example.com', (res) => {
//     const { statusCode }  = res;
//     console.log('status code:', statusCode);
//     res.on('data' , (chunk) => {
//         console.log(`body: ${chunk}`);
//     });
// });