const http = require('http');
const fs = require('fs');

let database = [];

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method === "GET" && req.url === "/") {
        const htmlPage = fs.readFileSync("index.html", "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(htmlPage);
    }

    if (req.method === "GET" && req.url === "/tasks") {
        const htmlPage = fs.readFileSync("tasks.html", "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(htmlPage);
    }
    
    if (req.method === "GET" && req.url === "/main.css") {
        const cssFile = fs.readFileSync("main.css", "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        return res.end(cssFile);
    }

    let reqBody = "";
    req.on("data", (data) => {
        reqBody += data;
    });

    req.on("end", () => {
        if (req.headers['content-type']) {
            req.body = reqBody
                .split("&")
                .map((keyValuePair) => keyValuePair.split("="))
                .map(([key, value]) => [key, value.replace(/\+/g, " ")])
                .map(([key, value]) => [key, decodeURIComponent(value)])
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
        }

        
        if (req.method === "POST" && req.url === "/tasks") {
            database.push(req.body);
            res.statusCode = 302;
            res.setHeader('Location', '/tasks');
            return res.end();
        }

        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end('<h1>Can\'t find that page</h1>');
    });


    

});

const port = 5000;

server.listen(port, () => console.log('Server is running on port', port));

