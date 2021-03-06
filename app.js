var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json);
app.use = (cors());

//parametros de conexiòn
var conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'articulosdb'
});

conexion.connect(function(error){
    if(error){
        throw error;
    } else {
        console.log("Conexion exitosa a la base de datos");
    }
});

app.get('/', function(req,res){
    res.send('ruta INICIO');
});

//Mostrar todos los articulos
app.get('/api/articulos', (req,res)=> {
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        } else {
            res.send(filas);
        }
    });
});

//Mostrar solo un articulo
app.get('/api/articulos/:id', (req,res)=> {
    conexion.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (error,fila)=>{
        if(error){
            throw error;
        } else {
            res.send(fila);
            //res.send(fila[0].descripcion);
        }
    });
});

// Crear un articulo nuevo
app.post('/api/articulos', (req, res)=> {
    let data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock};
    let sql = "INSERT INTO articulos SET?";
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        } else {
            res.send(results);
        }
    });
});

// Editar articulo
app.put('api/articulos/id:', (req, res)=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, stock, id], function(error, results) {
        if(error){
            throw error;
        } else{
            res.send(results);  
        }
    });
});

// Elminar articulo
app.delete('api/articulos/id:', (req, res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error;
        } else{
            res.send(filas);  
        }
    });
});

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function() {
    console.log("Servidor ok en puerto " + puerto);
});