
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const {body} = require('express-validator');
const req = require('express/lib/request');

const validationsLogin = [
    body('email').notEmpty().withMessage('Debes asignar una email').bail()
    .isEmail().withMessage('Debes escribri un email valido'),
    body('passwordd').notEmpty().withMessage('Debes escribir un password'),
];
const valdiations = [
    body('nombre').notEmpty().withMessage('Debes asignar un nombre'),
    body('email').notEmpty().withMessage('Debes asignar una email').bail()
    .isEmail().withMessage('Debes escribri un email valido'),
    body('password').notEmpty().withMessage('Debes asignar un password'),
    body('passwordconfi').notEmpty().withMessage('Debes confirmar el password'),
    body('date').notEmpty().withMessage('Debes ingresar tu fecha de nacimiento'),
];

//formulario de login
router.get('/login',guestMiddleware,userController.login);

//procesa formulario de login 
router.post('/login',userController.procesoLogin);

//perfil usuario
router.get('/profile/:userId',userController.profile);

//formulario de registro
router.get('/registro',guestMiddleware,userController.registro);

//procesa el registro
router.post('/registro',valdiations,userController.procesoRegistro);

//ruta perfil usuario
router.get('/profileUser',userController.profile);

//ruta logout 
router.get('/logout',userController.logout);

module.exports = router;