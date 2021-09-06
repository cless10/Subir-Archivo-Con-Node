var express = require("express");
var multer = require("multer");
var path = require('path');
var app = express();

var fs = require("fs");

app.get('', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var storage = multer.diskStorage({
    destination: function( req, file, callback) {
        if(!fs.existsSync('./uploads')) {
            fs.mkdir('./uploads', function(err) {
                if(err) {
                    console.log(err.stack)
                } else {
                    callback(null, './uploads');
                }
            }); 
        } else {
            callback(null, './uploads');
        }
    },
    filename: function( req, file, callback) {
        //callback(null, file.fieldname + '-' + Date.now());
        //callback(null, file.originalname + '-' + Date.now());     //originalname: trae el nombre completo del archivo conext
        callback(null, path.basename(file.originalname) + '-' + Date.now() + path.extname(file.originalname));
        
    }
});

app.post('/api/file', function(req, res){
    var upload = multer ({storage : storage}).single('userFile');
    upload(req, res, function(err){
        if(err) {
            return res.end('Error al cargar el archivo!');
        }
        res.end('Archivo cargado');
    })
})

app.listen(3000, function(){
    console.log('Servidor trabajando en el puerto 3000.');
})