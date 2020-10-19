const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && /^(\/images\/).*(.png)$/.test(req.url)) {
    // 获取文件状态
    fs.stat(`${process.cwd()}${req.url}`, (err, stat) => {
      if (err || !stat.isFile) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      serve(`${process.cwd()}${req.url}`, 'application/jpg');
    })
  } else if (req.method === 'GET' && req.url === '/') {
    serve(`${process.cwd()}/index.html`, 'text/html');
  } else {
    res.writeHead(404);
    res.end('not found')
  }

  function serve(path, type) {
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(path).pipe(res);
  }
});

server.listen(3000, () => {
  console.log('server is running');
})