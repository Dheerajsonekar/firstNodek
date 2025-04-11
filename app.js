const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
  const url = req.url;
  const method = req.method;

   if(url==='/'){
     //form
     res.setHeader('Content-Type', 'text/html');

     res.end(`<form action="/message" method="POST">
      <label>Enter Text: </label>
      <input type="text" name="username" />
      <button type="submit">Add</button>
      </form>`)


   }
   else {
    if(url==='/message'){
      
      res.setHeader("Content-Type", "text/html");

      let body = [];
      req.on("data", (chunks)=>{
        body.push(chunks);
      })

      req.on("end", ()=>{
        let buffer = Buffer.concat(body);
        let formData = buffer.toString();
        let formValue = formData.split('=')[1];

        fs.writeFile("data.txt", formValue, (err)=>{
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      })
      } )

     

    }
   }


})

server.listen(3000, ()=>{
  console.log("server is running.")
})