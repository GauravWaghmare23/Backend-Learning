import { createServer } from "http";
import { readFile } from "fs";
import { join, extname } from "path";

const port = 3000;

const server = createServer((req, res) => {
    const filePath = join(
        __dirname,
        req.url === "/" ? "index.html" : req.url
    );

    const extName = String(extname(filePath).toLowerCase());

    const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
    };

    const contentType = mimeTypes[extName] || "application/octet-stream";

    readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 Not Found</h1>", "utf-8");
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
