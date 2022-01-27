const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let data = fs.readFileSync('./glass.html')
        res.write(data)
    }
    res.end();
}).listen(8888);
