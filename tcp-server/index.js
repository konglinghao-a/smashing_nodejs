/**
 * 创建 http 服务的是 http 模块
 * 创建 tcp 连接的是 net 模块
 * 所以 http 是继承自 net
 */

// 建立一个基本的 tcp 服务器
const net = require('net');

// 创建服务器
let count = 0; // 显示人数，共享状态的并发
let users = {}; // 键为用户名字，值为连接
const server = net.createServer((conn) => { // conn 对象是个可读可写流
  conn.write(
    `new connection!\r\n
    ${count} other people are connected at this time, \r\n
    please write your name and press enter: `
  );
  count++;

  /**
   * 输出客户端发来的数据
   */
  let nickname = undefined;
  conn.setEncoding('utf8'); // 接收到的数据是字节，需要编码（tcp 传输的是字节）
  conn.on('data', (data) => {
    data = data.replace('\r\n', '');

    // 第一个输入的是名字，后面的才是聊天
    if (!nickname) {
      if (users[data]) {
        conn.write('the name already in use, try agin: ');
      } else {
        users[data] = conn;
        nickname = data;
        // 广播消息
        Object.keys(users).forEach((user) => {
          users[user].write(`${nickname} joined the room!\r\n`)
        })
      }
    } else { // 聊天
      Object.keys(users).forEach((user) => {
        if (user !== nickname) {
          users[user].write(`${nickname} say: ${data} \r\n`);
        }
      })
    }
  })

  /**
   * end 和 close 都能终止连接，但是触发 error 事件的时候 end 事件不会触发，
   * 因为服务器端没有收到 'fin' 信号。但是 close 不管怎样（发生错误或者关闭
   * 连接）都能触发，所以采用 close
   */
  conn.on('close', () => {
    count--;
    delete users[nickname]
  })

})

// 监听端口
server.listen(3000, () => {
  console.log('server is running');
})