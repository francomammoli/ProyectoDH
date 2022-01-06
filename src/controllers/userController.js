const bcryptjs = require('bcryptjs');
const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
//requiere la base de datos
let db = require("../../database/models");
const { required } = require('nodemon/lib/config');
const userController = {
    profile:(req,res)=>{
        db.Usuario.findAll()
        .then(function(usuarios){
            return res.render("profileUser",{
                usuarios:usuarios,
            });
        })

        },
    registro: (req, res) => {
    return res.render('registro');
    },
    procesoRegistro:(req,res)=>{
        const resultvalidationR = validationResult(req);
            if(resultvalidationR.errors.length > 0){
                return res.render('registro', {
                errors: resultvalidationR.mapped(),
                oldDataRegistro: req.body,
                });
            }
                
            //verificamos si el usuario ya esta registrado 
            db.Usuario.findAll().then((users) => {
                let userInDB = users.find((i) => i.email == req.body.email)
                if (userInDB) {
                return res.render('registro', {
                    errors: {
                    email: {
                        msg: 'Este email ya esta registrado',
                    },
                    },
                    oldData: req.body,
                })
                } else {
                    //hasear pw
                db.Usuario.create({
                    nombre: req.body.nombre,
                    email:req.body.email,
                    password: req.body.password,
                    fecha_nacimiento:req.body.date,
                })
                    .then(() => {
                    return res.redirect('/login')
                    })
                    .catch((error) => {
                    console.log(error)
                    })
                }
            })
            
            // let userInDB = db.Usuario.findAll({attributes: [correo,'email']});
            
            // if(userInDB){
            //     return res.render('registro', {
            //         errors: {
            //             email:{
            //                 msg: 'Este email ya esta registrado'
            //             },
            //         },
            //         oldDataRegistro: req.body,
            //         });
            // }
            // //hashea la pw, como es un objeto literal el pw que agregamos pisa al pw que viene del req.body ya que un objeto no puede tener dos propiedades que se llamen igual
            // let pass={
            //     password: bcryptjs.hashSync(req.body.password,10),
            //     passwordconfi: bcryptjs.hashSync(req.body.password,10),
            // }
            // //agrega al imagen
            // // let userToCreate = {
            // //     ...req.body,
            // //     avatar : req.file.filename,
            // // }
            // db.Usuario.create({
            //     nombre: req.body.nombre,
            //     email:req.body.email,
            //     password: pass,
            //     fecha_nacimiento:req.body.date, 
            // });
        

            // //let userCreated = User.create(userToCreate);

            // return res.redirect('/login');
            },
    login:(req,res) => {
        return res.render('login');
        },
    procesoLogin:(req,res)=>{
        const resultvalidationL = validationResult(req);
        if(resultvalidationL.errors.length > 0){
            return res.render('login', {
            errors: resultvalidationL.mapped(),
            oldDataLogin: req.body,
            });
        }
        db.Usuario.findAll().then((users) => {
            let userToLogin = users.find((i) => i.email == req.body.email)
            if (userToLogin) {
            if (req.body.passwordd == userToLogin.password) {
                delete userToLogin.password
                req.session.userLogged = userToLogin
                if (req.body.recordar) {
                  res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 }) //60 minutos
                }
                return res.redirect('/profileUser')
            }
            return res.render('login', {
                errors: {
                email: {
                    msg: 'Las credenciales son inválidas',
                },
                },
        })
            } 
            return res.render('login', {
            errors: {
                email: {
                msg: 'El email de usuario que ingresó no pertenece a una cuenta',
                },
            },
            })
        })
        },
    //     // let userToLogin = db.Usuario.findByField('email',req.body.email);
    //     let userToLogin = db.Usuario.findAll({attributes: ['email']});
        
    //     if(userToLogin){
    //     let isOkPassword = bcryptjs.compareSync(req.body.passwordd, userToLogin.password);
    //     if(isOkPassword){
    //         //con delete eliminamos una propiedad determianda
    //         delete userToLogin.password;
    //         req.session.userLogged = userToLogin;

    //         if(req.body.recordar){
    //             res.cookie('userEmail',req.body.email,{maxAge: (1000 * 60)*2});
    //             console.log('recordado');
    //         } 

    //         return res.redirect('/profileUser');
    //     }
        
    //     return res.render('login',{
    //         errors:{
    //             passwordd:{
    //                 msg:'Las credenciales son inválidas'
    //             }
    //         }
    //     });
    //     }

    //     return res.render('login',{
    //         errors:{
    //             email:{
    //                 msg:'El email de usuario que ingresó no pertenece a una cuenta'
    //             }
    //         }
    //     });
    // },
    logout:(req,res)=>{
    //borra todo lo que esta en session
   // res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
    },
};

module.exports = userController;