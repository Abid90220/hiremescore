import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] || "build/client");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);

const contentTypes = {
    ".css": "text/css",
    ".gif": "image/gif",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".js": "text/javascript",
    ".json": "application/json",
    ".mjs": "text/javascript",
    ".png": "image/png",
    ".svg": "image/svg+xml",
};

const server = createServer((request, response) => {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    const safePath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
    let filePath = join(root, safePath);

    if (!existsSync(filePath) || url.pathname.endsWith("/")) {
        filePath = join(root, "index.html");
    }

    const type = contentTypes[extname(filePath)] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": type });
    createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
    console.log(`Serving ${root} at http://${host}:${port}`);
});
