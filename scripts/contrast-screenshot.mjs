import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function serve(dir, port) {
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".woff2": "font/woff2",
  };
  const abs = path.resolve(dir);
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    const file = path.join(abs, urlPath);
    if (!file.startsWith(abs) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end("missing");
      return;
    }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  server.listen(port, "127.0.0.1");
  return server;
}

const book = serve(path.join(root, "apps/book-site/dist"), 8791);
const board = serve(path.join(root, "apps/build-board/dist"), 8792);
const edge =
  process.env.EDGE_PATH ||
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const out = path.join(root, ".local/tmp/contrast-audit");
fs.mkdirSync(out, { recursive: true });

const shots = [
  ["fix-book-home.png", "http://127.0.0.1:8791/"],
  ["fix-book-decl.png", "http://127.0.0.1:8791/declaration/"],
  ["fix-book-status.png", "http://127.0.0.1:8791/status/"],
  ["fix-board-home.png", "http://127.0.0.1:8792/"],
];

for (const [name, url] of shots) {
  const file = path.join(out, name);
  await new Promise((resolve, reject) => {
    const p = spawn(
      edge,
      [
        "--headless=new",
        "--disable-gpu",
        "--window-size=1440,1100",
        `--screenshot=${file}`,
        url,
      ],
      { stdio: "inherit" }
    );
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`edge ${code}`))));
  });
  console.log("[OK]", name, fs.statSync(file).size);
}

book.close();
board.close();
