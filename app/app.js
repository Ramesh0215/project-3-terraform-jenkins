const http = require("http");
const server = http.createServer.Server((req,res) => {
    res.eriteHead(200, { "Content-Type": "text/plain" });
    res.end("CI/CD pipeline working");
});

server.listen(3000, () => {
    console.log("App running on port 3000");
});
