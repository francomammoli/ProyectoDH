// const User = require('../models/Users');
function logedMiddleware(req,res,next){
    //res.locals son variables que podemos compartir atraves de todas las vistas
    res.locals.islogged = false;

     // let emailinCookie = req.cookies.userEmail;
    //let userFromCookie = User.findByField('email',emailinCookie);
    // console.log(emailinCookie);
    // if(userFromCookie){
    //     req.session.userLogged = userFromCookie;
    // }

    if(req.session.userLogged){
        res.locals.islogged = true;
    }
    next();
}

module.exports = logedMiddleware;