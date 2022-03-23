// import http, { IncomingMessage, Server, ServerResponse } from "http";
// /*
// implement your server code here
// */

// const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
//     if (req.method === "GET") {
//       res.end(JSON.stringify({ name: "hello" }));
//     }
//   }
// );

// const port = process.env.PORT || 3005

// server.listen(port, () => {console.log(`Server running on Port: ${port}...`)});

const http = require("http");
const record = require("../database.json")
const { getData, getEach } = require("../controllers/dataControllers")
/*
implement your server code here
*/

const server = http.createServer((req, res) => {
  if (req.url === "/server/database" && req.method === "GET") {
     getData(req, res)
  } else if (req.url.match(/\/server\/database\/[0-9]+)/) && req.method === "GET") {
     
     const id = req.url.split("/")[3]  
     getEach(req, res, id)
    
    } else{
    res.writeHead(404, { "Content-Type": "database/json" });
    res.end(JSON.stringify({message: 'Not found'}));
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server VS running on Port: ${port}...`);
});
