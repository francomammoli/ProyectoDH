// const User = require('../models/Users');
// function adminMiddleware(req,res,next){
//     //locals son variables que podemos compartir atraves de todas las vistas
//     admin = false;
//     console.log(req.body);
//     if(req.body.email == "francomammoli@hotmail.com"){
//         admin = true;
//         console.log(locals.admin);
//         console.log('entraste como admin');
//     }

//     next();
// }

// module.exports = adminMiddleware;
function adminMiddleware (req, res, next){

    if(req.session.userLogged && req.session.userLogged.email == 'francomammoli@gmail.com'){
        res.redirect("/menu");
    } else {
        res.redirect("/")
    }
    next()
    
    
}

module.exports = adminMiddleware