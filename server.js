const http = require('node:http'); //import thư viện
const hostname = '127.0.0.1'; //localhost
const port = 3003; //Cổng lắng nghe server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
//   Xử lý phía backend để lấy d
  res.write('<h1>NodeJS - Bai 1</h1>');
  res.write('<br>');
  res.write('<p>Tạo project Hello world bằng Nodejs - MD18306</p>');
  res.write(`<h1>HTML5 - Nội dung 1</h1>
  <h2>HTML5 - Nội dung 2</h2>
  <p>HTML5 - Nội dung 3</p>`)
  res.end();
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});