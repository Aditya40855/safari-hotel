const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request:", req.method, req.url);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello\n");
});

server.listen(4000, "127.0.0.1", () => {
  console.log("tiny http server listening on 127.0.0.1:4000");
});