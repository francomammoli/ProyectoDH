//requiere express
const express = require('express');
const app = express();
//requiere a los controladores que ppreviamente fueron exportados
const mainController = require('../controllers/mainController');
//requiere a el metodo router de express, nos permite modularizar el sistema de ruteo de forma sencilla
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {body} = require('express-validator');
const adminMiddleware = require('../middleware/adminMiddleware');
// =======================Config Multer==============================
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./public/imagenes');
    },
    filename : (req,file,cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({storage});

//agregarlos a una carpeta de midelware
const valdiations = [
    body('nombre').notEmpty().withMessage('Debes asignar un nombre'),
    body('precio').notEmpty().withMessage('Debes asignar un precio'),
    body('categoria').notEmpty().withMessage('Debes asignar una categoria'),
    body('producto').custom((value, {req})=>{
        let file = req.file;
        let acceptedExt = ['.jpg','.png'];

        if(!file){
            throw new Error('Tienes que agregar una imagen');
        } else{
            let fileExten = path.extname(file.originalname);
        if(!acceptedExt.includes(fileExten)){
            throw new Error('Tienes que agregar una imagen con formato png o jpg');
        }
        }
        return true;
    }),

    // body('email').notEmpty().withMessage('Debes asignar una categoria').bail()
    // .isEmail().withMessage('Debes escribri un email valido'),
];
//---------------------------------------------------------

//crea la rutas del home y pide el metodo home de mainController
router.get('/',mainController.home);

router.get('/menu',mainController.menuadmin);

router.get('/products',mainController.products);
//ruta add producto
router.get('/products/add',mainController.productsadd);
//procesa el fromulario add
router.post('/products/add',uploadFile.single('producto'),valdiations,mainController.procesoProducts);

//ruta editar producto
router.get('/products/editar/:idproductos',mainController.editar);
router.post('/products/editar/:idproductos',uploadFile.single('producto'),mainController.actualizar);


//borrar producto
router.post('/products/borrar/:idproductos',mainController.borrar);

//exporta las rutas
module.exports = router;