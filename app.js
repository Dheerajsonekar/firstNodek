const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/' && method === 'GET') {
    
    fs.readFile('data.txt', (err, data) => {
      res.setHeader('Content-Type', 'text/html');
      const messages = err ? '' : data.toString().replace(/\n/g, '<br>');

      res.end(`
        <html>
          <body>
            <h2>Messages:</h2>
            <div>${messages}</div>
            <hr>
            <form action="/" method="POST">
              <label>Enter Text: </label>
              <input type="text" name="username" />
              <button type="submit">Add</button>
            </form>
          </body>
        </html>
      `);
    });
  }

  else if (url === '/' && method === 'POST') {
    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const buffer = Buffer.concat(body);
      const formData = buffer.toString();
      const formValue = decodeURIComponent(formData.split('=')[1].replace(/\+/g, ' '));

      // Read existing messages, prepend new message
      fs.readFile('data.txt', (err, data) => {
        const previousData = err ? '' : data.toString();
        const newData = formValue + '\n' + previousData;

        fs.writeFile('data.txt', newData, (err) => {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          res.end();
        });
      });
    });
  }

  else {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 - Page Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log("Server is running.");
});
