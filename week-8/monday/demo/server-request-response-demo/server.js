const http = require('http');
const fs = require("fs");

let database = [];
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Formulate a Response in http
    // if (req.method === "GET" && req.url === "/") {
    //     res.statusCode = 200;
    //     res.setHeader("Content-Type", "text/html");
    //     return res.end('<h1>Hello World!</h1>');
    // }

    // Create route handlers
    // if (req.method === "GET" && req.url === "/") {
    //     res.statusCode = 200;
    //     res.setHeader("Content-Type", "text/html");
    //     return res.end('<h1>Hello World!</h1>');
    // }

    // Serve static assets in http
    if (req.method === "GET" && req.url === "/") {
        const htmlPage = fs.readFileSync("index.html", "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(htmlPage);
    }
    
    if (req.method === "GET" && req.url === "/main.css") {
        const resBody = fs.readFileSync("main.css");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        return res.end(resBody);
    }

    // HTML templating
    if (req.method === "GET" && req.url === "/tasks") {
        const htmlPage = fs.readFileSync("tasks.html", "utf-8");
        const tasksList = database.map(task => {
            return `<li>${task["tasks"]} - ${task["time"]}</li>`
        });
        const resBody = htmlPage
            .replace(/#{tasks}/g, tasksList.join(""));
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(resBody);
    }

    // Process HTMLform Submissions
    let reqBody = "";
    req.on("data", (data) => {
        reqBody += data;
    });

    req.on("end", () => {
        // Parsing the body of the request
        if (reqBody) {
            req.body = reqBody
                .split("&")
                .map((keyValuePair) => keyValuePair.split("="))
                .map(([key, value]) => [key, value.replace(/\+/g, " ")])
                .map(([key, value]) => [key, decodeURIComponent(value)])
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
            console.log(req.body);
        }
        if (req.method === "POST" && req.url === "/tasks") {
            console.log(req.body);
            database.push(req.body);
            res.statusCode = 302;
            res.setHeader("Location", "/tasks");
            return res.end();
        }
    });
    
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));