var http = require('http');
var formidable = require('formidable');

var fs = require('fs');

// Dùng postman giả lập upload
const hostname = '127.0.0.1';
const port = 8000;
// port >= 3000


const server = http.createServer((req, res) => {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      if (files.file.type === 'image/jpeg') {
        console.log('files: ', files);
        fs.writeFile(`./uploads${files.file.name}`, files, function (err, data) {
          if (err) {
            res.end('Upload fail')
          } else {
            res.end('Upload succeeded')
          }
        })

      }
      
    });

    return;
  }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



// -------------------



// dùng file .gitignore để bỏ node_modules
