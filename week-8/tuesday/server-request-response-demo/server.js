const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end('<h1>Hello world!</h1>');
});

const port = 5000;

server.listen(port, () => console.log('Server is running on port', port));

