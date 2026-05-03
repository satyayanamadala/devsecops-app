const http = require('http');

http.createServer((req, res) => {
  res.write("Secure Healthcare App 🏥");
  res.end();
}).listen(3000);