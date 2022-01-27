const fs = require('fs')
const http = require('http')
const querystring = require('query-string')
http.createServer((req, res) => {
    if (req.url === "/") {
        let tmp = fs.readFileSync('page.html')
        let r = fs.readFileSync('data.txt').toString().split('},')
        let t = []
        for (let i = 0; i < r.length - 1; i++) {
            r[i] += '}'
        }
        r.pop()
        r.map((ele) => {
            ele = JSON.parse(ele);
            t.push(`<tr><td>${ele.name}</td><td>${ele.age}</td><td>${ele.city}</td><td>${ele.salary}</td></tr>`);
        })
        let c = '<table>'
        t.map(ele => c += ele)
        c += '</table>'
        res.write(tmp)
        res.write(c)
        res.end()
    }
    if (req.url === "/addemployee" && req.method === "GET") {
        res.writeHead(200, { 'Content-Type': 'text / html' });
        let tmp = fs.readFileSync('addemp.html')
        res.write(tmp);
        res.end()
    }
    if (req.method === "POST" && req.url === "/addemployee") {
        let body = ''
        req.on('data', (data) => {
            body += data
        })
        req.on('end', () => {
            let tmp3 = querystring.parse(body.toString())
            console.log(typeof (tmp3))
            fs.appendFileSync('data.txt', `\n${JSON.stringify(tmp3)},`, (err) => { if (err) throw err; })
        })
        res.writeHead(301, { 'Location': 'http://localhost:8888/' })
        res.end()
    }
}).listen(8888)