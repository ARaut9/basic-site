const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const pathName = "." + reqUrl.pathname;
  let fileName;
  console.log(pathName);
  if (pathName === './') {
    fileName = 'index.html';
  } else {
    fileName = pathName + ".html";
  }

  fs.readFile(fileName, (err, data) => {
    if (err) {
      fs.readFile("./404.html", (err, data) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);