"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const jsdom_1 = require("jsdom");
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const urlObj = JSON.parse(body);
            const url = urlObj.website;
            https_1.default.get(url, (response) => {
                let sourceCode = "";
                response.on("data", (chunk) => {
                    sourceCode += chunk.toString();
                });
                response.on("end", () => {
                    var _a;
                    const frag = jsdom_1.JSDOM.fragment(sourceCode);
                    const title = (_a = frag.querySelector("title")) === null || _a === void 0 ? void 0 : _a.textContent;
                    const meta = frag.querySelector('meta[name="description"]');
                    const description = meta === null || meta === void 0 ? void 0 : meta.getAttribute("content");
                    const img = frag.querySelectorAll("img");
                    let imgArr = [];
                    img.forEach(image => {
                        let getAttr = image.getAttribute("src");
                        imgArr.push(getAttr);
                    });
                    const result = { title, description, imgArr };
                    res.end(JSON.stringify(result));
                });
            });
        });
    }
});
let port = process.env.PORT || 3010;
server.listen(port, () => { console.log(`Server running at: ${port}`); });
