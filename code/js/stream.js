// const fs = require('fs');
// const file = fs.createWriteStream('./big.file');

// for (let i = 0; i <= 1e6; i++) {
//   file.write(
//     'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n',
//   );
// }

// file.end();

const fs = require('fs');

const server = require('http').createServer();

// server.on('request', (req, res) => {
//   fs.readFile('./big.file', (err, data) => {
//     if (err) throw err;
//     res.end(data);
//   });
// });

server.on('request', (req, res) => {
  const src = fs.createReadStream('./big.file'); // 就是
  src.pipe(res); // 这两句
});

server.listen(777, () => console.log('Server is running on port 777'));
