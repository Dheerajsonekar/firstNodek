const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  let message = "";

  switch (req.url) {
    case "/home":
      message = "welcome to home page";
      break;
    case "/node":
      message = "welcome to node page";
      break;
    case "/about":
      message = "welcome to about page";
      break;
    default:
      message = "page not found";
      break;
  }

  res.write(`<html>
        <head><title>Response</title></head>
        <body><h1>${message}</h1></body>
        </html>`);

  res.end();
});


server.listen(3000, ()=>{
    console.log("server is running");
})
