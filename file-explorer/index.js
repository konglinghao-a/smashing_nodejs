// 通过运行 npm install 就能验证自己的 package.json 有没有问题

const fs = require('fs');
const stdin = process.stdin;
const stdout = process.stdout;


// 采用异步读取的方式；同步读取的方式就是 readdirSync
// process.cwd() 会返回 nodejs 进程的当前工作目录
fs.readdir(process.cwd(), (err, files) => {
  console.log('');
  if (!files.length) {
    return console.log('no files to show!\n')
  }
  console.log('select which file or dictionary you want to see\n');
  let stats = []; // 记录文件或目录的元数据，用来判断对应文件是不是目录

  function file(i) {
    let filename = files[i];

    // 给出文件或者目录的元数据
    fs.stat(`${__dirname}/${filename}`, (err, stat) => {
      stats[i] = stat;

      if (stat.isDirectory()) {
        console.log(`${i}  ${filename} /`);
      } else {
        console.log(`${i}  ${filename}`);
      }

      if (++i == files.length) {
        read();
      } else {
        file(i);
      }
    })
  }

  function read() {
    console.log('');
    stdout.write('enter your choice: '); // 与 console.log 的区别就是不用换行再输入
    stdin.resume(); // 等待用户输入
    stdin.setEncoding('utf-8'); // 设置 utf-8 这样就能支持特殊字符

    // 设置了 stdin 编码后就能监听 data 事件
    stdin.on('data', option);
  }

  function option(data) {
    let filename = files[parseInt(data)];
    let stat = stats[parseInt(data)];
    if (!filename) {
      stdout.write('enter your choice again: ');
    } else if (!stat.isDirectory()) { // 如果是文件就显示文件的内容
      stdin.pause();
      fs.readFile(`${__dirname}/${filename}`, 'utf8', (err, data) => {
        console.log(data);
      })
    } else { // 如果是目录那就显示出目录下的所有文件
      stdin.pause();
      fs.readdir(`${__dirname}/${filename}`, (err, files) => {
        files.forEach((file) => {
          console.log(`${file}`);
        })
      })
    }
  }
  file(0)
})