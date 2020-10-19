const http = require('http');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    res.writeHead(200);
    res.end('done');
    console.log(`got name: ${qs.parse(body).name}`);
  })
});

server.listen(3000, () => {
  console.log('server is running');
})