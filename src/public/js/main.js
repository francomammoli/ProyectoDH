
/*==================== SHOW MENU ====================*/
    const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

// ----------------Remover menu de movil------------------------

const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction));


// ==========================================CARROUSEL============================================

const grande = document.querySelector('.grande');
const punto = document.querySelectorAll('.punto'); //obtenemos un array de elementos

//recorre todos los puntos
punto.forEach( (cadaPunto, i)=>{
    //asignamos un click a cadaPunto
    punto[i].addEventListener('click',()=>{

        //guarda la posicion de ese punto
        let position = i; 
        //calculando el espacio que debe desplazarse el div grande  
        let operacion = position * -33.3;

        //movemos el div grande
        grande.style.transform = `translateX(${operacion}%)`;

        //recorremos todos los puntos
        punto.forEach((cadaPunto, i)=>{
            //quitamos la clase activo a todos los puntos   
            punto[i].classList.remove('activo');
        });

        //añadimos la clase activo en el punto que hemos echo click 
        punto[i].classList.add('activo');
    });
});

// // =====================================VENTANA POP UP======================================
// const nuevoError = require('../controllers/mainController.js');
// const open = document.getElementById('open');
// const modal_container = document.getElementById('modal_container'); 
// const close = document.getElementById('close'); 

// open.addEventListener('click',()=>{
//     modal_container.classList.add('show');
// });

// close.addEventListener('click',()=>{
//     modal_container.classList.remove('show');
// });
