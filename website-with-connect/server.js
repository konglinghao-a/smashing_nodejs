const connect = require('connect');

const server = connect.createServer();
server.use(connect.static(__dirname + '/website'));

server.listen(3000)