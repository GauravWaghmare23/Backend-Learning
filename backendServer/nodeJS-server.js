import { createServer } from "http";
const hostname = '127.0.0.1';
const port = 3000

const server = createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        res.end("Hello this is the main page")
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end("404 Not found")
    }
})

server.listen(port, hostname, () => {
    console.log(`Server is listening at port http://${hostname}:${port}/`);
})