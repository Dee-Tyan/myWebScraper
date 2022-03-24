import http, { IncomingMessage, Server, ServerResponse } from "http";
import https from "https";
import { JSDOM } from "jsdom";
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST") {
       let body = "";
       req.on("data", (chunk) => { 

          body += chunk.toString();
       })
       
       req.on("end", () => {
         const urlObj = JSON.parse(body);
         const url = urlObj.website;

         
         https.get(url, (response) => {
            let sourceCode = ""
            response.on("data", (chunk) => {
               sourceCode += chunk.toString();
               
            })

            response.on("end", () => {
              const frag = JSDOM.fragment(sourceCode)
              const title = frag.querySelector("title")?.textContent;
              const meta = frag.querySelector('meta[name="description"]');
              const description = meta?.getAttribute("content")
              
              const img= frag.querySelectorAll("img")
              let imgArr:HTMLImageElement[] = [];
              img.forEach(image => {
                let getAttr:any = image.getAttribute("src")
                imgArr.push(getAttr)
              })
              

              const result = { title, description, imgArr}
              
              res.end(JSON.stringify(result));
              


               
            })
         })
       })
    }
  }
);
let port = process.env.PORT || 3010;
server.listen(port, () => {console.log(`Server running at: ${port}`)});
 