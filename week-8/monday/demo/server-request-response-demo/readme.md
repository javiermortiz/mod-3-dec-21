# Server Request/Response Demo

1. You have an html and a css file... now what? We need a server to listen for requests for these resources.
2. We'll use the http request package today. You won't be tested on any of this syntax, on module 4 you'll learn Express which is a web framework that will hide most of the implementation you do today, but the cool thing is that you'll know how a library like express works behind doors. The important thing is understanding the request/response cycle and how the server looks at both the verb and url to send back some assets.
3. Create a server, explain that req and res are objects you can use to access and manipulate the incoming http request from the client and the response the server will send.
```js
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
```
4. The url bar will make a GET request, and the path is whatever is after the host (localhost:5000 or google.com). The root url (/) typically displays the homepage, let's implement that. Show request and response.
```js
const fs = require("fs");

if (req.method === "GET" && req.url === "/") {
    const resBody = fs.readFileSync("index.html");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(resBody);
}
```
5. Nice! the problem now is that the html is linked to a css file, so the browser automatically makes another request for it, let's handle that as well
```js
if (req.method === "GET" && req.url === "/main.css") {
    const resBody = fs.readFileSync("main.css");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css");
    return res.end(resBody);
}
```
6. Alright let's submit the form. What are the method and url that form is submitting? We would receive the info inside req.body but req.body is undefined.
```js
if (req.method === "POST" && req.url === "/tasks") {
    console.log(req.body);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
}
```
7. We need to listen for the data, once we have received all the data let's take a look at it. It doesn't look very nice, does it? 
```js
    // Before the route handler
    let reqBody = "";
    req.on("data", (data) => {
        reqBody += data;
    });

    req.on("end", () => {
        console.log(reqBody);
    });
```

8. Let's parse it to make it easier to work with.
```js
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
                .map(([key, value]) => [key, value.replace("+", " ")])
                .map(([key, value]) => [key, decodeURIComponent(value)])
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
            console.log(req.body);
        }
        if (req.method === "POST" && req.url === "/tasks") {
            console.log(req.body);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        }
    });
```
## Part 2
9. Now let's add that new data into our database and from there into our page
```js
const http = require('http');
const fs = require("fs");

let database = [];
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
        
    if (req.method === "GET" && req.url === "/") {
        const htmlPage = fs.readFileSync("index.html", "utf-8");
        const tasksList = database.map(task => {
            return `<li>${task["tasks"]} - ${task["time"]}</li>`
        });
        const resBody = htmlPage
            .replace(/#{tasks}/g, tasksList.join(""));
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(resBody);
    }

    if (req.method === "GET" && req.url === "/main.css") {
        const resBody = fs.readFileSync("main.css");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        return res.end(resBody);
    }

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
            res.setHeader("Location", "/");
            return res.end();
        }
    });
    
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
```
