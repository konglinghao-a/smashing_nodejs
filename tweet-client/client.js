const http = require('http');
const qs = require('querystring');

function send(theName) {
  const request = http.request({
    host: '127.0.0.1',
    port: 3000,
    url: '/',
    method: 'POST'
  }, (res) => {
    res.setEncoding('utf8');
    res.on('data', (data) => {
      console.log(` the res data: ${data}`);
    })
    res.on('end', () => {
      console.log(` request complete! `);
      process.stdout.write('\n your name: ');
    });
  })

  // 请求数据是通过 end 发送
  request.end(qs.stringify({ name: theName }));
}

process.stdout.write(`\n your name: `);
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (name) => {
  name = name.replace('\r\n', '');
  send(name);
})


