const fs = require('fs');
//requiere el modulo path que viene por defecto en node para las carpetas 
const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
//requiere la base de datos
let db = require("../../database/models");
//crea un objeto con los diferentes metodos que reaccion a las rutas
const mainController = {
    home: (req, res) => {
    return res.render('index');
    },
    products:(req,res) => {
        db.Producto.findAll()
            .then(function(productos){
                return res.render("products",{
                    productos:productos
                });
            })
            
    },
    menuadmin:(req,res)=>{
        db.Producto.findAll()
        .then(function(productos){
            return res.render("menu",{
                productos:productos
            });
        })
    },
    productsadd:(req,res)=>{
    return res.render('addproduct');
    },

    procesoProducts:(req,res) => {
    const resultvalidation = validationResult(req);
    if(resultvalidation.errors.length > 0){
        return res.render('addproduct',{
        errors: resultvalidation.mapped(),
        oldData: req.body
        });
    }
    // let productCreate = {
    //     ...req.body,
    //     imagen:req.file.filename
    // }
    db.Producto.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        tipo: req.body.categoria,
        img: req.file.filename,
    });
    console.log(req.file.filename);
    res.redirect("/products");

    // Producto.create(productCreate);
    // req.session.productoAdd = productCreate;
    // return res.render('products');
    },
    editar: function(req,res){
    db.Producto.findByPk(req.params.idproductos)
    .then(function(productos){
        res.render("editarProducto",{productos:productos});

    });
    },
    actualizar: function(req,res){
        console.log(req.body);
        db.Producto.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            tipo:  req.body.categoria,
            img: req.file.filename,
        },{
            where:{
                idproductos: req.params.idproductos
            },
        });
        res.redirect("/products");
    },
    borrar: function(req,res){
        db.Producto.destroy({
            where:{
                idproductos: req.params.idproductos
            }
        });
        //elimina la imagen
        // let ruta = (__dirname + productos.img);
        // console.log(ruta);
        // fs.unlink(ruta,(error)=>{
        //     if(error){console.log(error);}
        //     console.log('imagen eliminada');
        // })
        res.redirect("/products");
    },
};
    module.exports = mainController;
