const http = require('http');

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
  } else if (req.url === '/url') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      you sent a ${req.method} request!
    `);
  }

})

server.listen(3000, () => {
  console.log('server is running');
})