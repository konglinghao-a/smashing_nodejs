const http = require('http');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
    <form method="POST" action="/url">
      <h1>my form</h1>
      <fieldset>
      <label>personal information</label>
      <p>what is your name?</p>
      <input type="text" name="name" />
      <p><button>submit</button></p>
    </form>
  `);
  } else if (req.url === '/url' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      // data 以流的形式传过来，所以要一点一点加
      body += chunk;
    })

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <p>Content-Type: ${req.headers['content-type']}</p>
        <p>your name is : ${qs.parse(body).name}</p>
      `)
    })
  } else {
    res.writeHead(404);
    res.end('not found!')
  }

})

server.listen(3000, () => {
  console.log('server is running');
})