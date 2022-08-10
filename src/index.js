// Se llama al módulo que permite crear el servidor
const express = require('express');

// Se crea el servidor de Node
const app = express();

// Se llama a la librería para trabajar con directorios
const path = require('path');

// Utilizamos la librería nodemailer para configurar la cuenta de correo asignada
const nodemailer = require('nodemailer');

// Incluye soporte para autorización y autenticación con OAuth 2.0, API Keys y tokens JWT
const { google } = require('googleapis');

// Llamamos a la librería para configurar el mensaje de alerta
// const Swal = require('sweetalert2');

// Llamamos a la biblioteca que permite realizar las validaciones de los campos de un formulario
// const {body, validationResult} = require('express-validator');

// ********************************************************************************************************************
// Sección de configuración
// Se definen el puerto donde se desplegará la página web, las rutas de las distintas páginas que conforman
// el sitio web y el motor de plantillas

// Puerto del sitio web
app.set('puerto', process.env.PORT || 3000);

// Se indica el motor de plantilla de vistas que se va a utilizar en la aplicación o sitio web
app.set('views', path.join(__dirname, 'views'));

// Se indica el motor de plantilla de vistas que se va a utilizar en la aplicación o sitio web
app.set('view engine', 'ejs');

// ********************************************************************************************************************
// Sección de middlewares
// Métodos/funciones/operaciones que se llaman entre el procesamiento de la Solicitud y el envío de la respuesta en su 
// método de aplicación.

// Método incorporado en express para reconocer el objeto de solicitud entrante como cadenas o matrices.
app.use(express.urlencoded({extends:true}));

// Los siguientes métodos se necesitan para las solicitudes POST y PUT, porque en ambas solicitudes está enviando datos
// Método incorporado en express para reconocer el objeto de solicitud entrante como un objeto JSON.
app.use(express.json());

// ********************************************************************************************************************
// Sección de rutas
// Para utilizar la ruta que se ha exportado desde el archivo rutas.js
app.use(require('./routes/rutas'));

// ********************************************************************************************************************
// Sección de static files: se listan las fuentes, imágenes, iconos, archivos .css, archivos .js y múltiples archivos
// que se van a utilizar para mejorar la interfaz o front-end de la aplicación o sitio web
app.use(express.static(path.join(__dirname, 'public')));

// ********************************************************************************************************************
//
// app.post('/validaciones', [
//     body('nombre', 'Ingrese un nombre y apellido completos')
//         .exists()                                              // Controla que el campo de entrada no esté vacío
//         .isLength({min:5}),                                    // Especifica la cantidad mínima de caracteres
//     body('correo', 'Ingrese un email válido')
//         .exists()
//         .isEmail(),                                            // Comprueba que la estructura básica de un email se la correcta
//     body('direccion', 'Ingrese un domicilio válido')
//         .exists()
//         .isLength({min:10}),
//     body('telcasa', 'Ingrese un número válido')
//         .exists()
//         .isNumeric(),                                          // Comprueba que en el campo se ingresen solamente valores numéricos
//     body('telcelular', 'Ingrese un número válido')
//         .exists()
//         .isNumeric()
//     body('marca', 'Elija la marca del vehículo')
//         .exists(),
        
//     body('modelo', 'Digite el modelo de su vehículo')
//         .exists()
//         .isLength({min:10}),
//     body('anio', 'Digite el año de fabricación de su vehículo')
//         .exists()
//         .isNumeric(),
//     body('fcita', 'Elija una fecha para su cita')
//         .exists(),

//     body('hcita', 'Elija una hora para su cita')
//         .exists(),
        
//     body('servicio', 'Elija el servicio que necesita realizar')
//         .exists(),
        
//     body('comentario', 'Describa con más detalle el servicio que necesita')
//         .exists(),
        
//     ], (solicitud, respuesta) => {

//     // Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones útiles
//     const errors = validationResult(solicitud);

//     // En caso de que se detecten errores se genera un arreglo donde se guardarán todos los errores
//     if (!errors.isEmpty()) {
//         // return respuesta.status(400).json({ errors: errors.array() });
//         // console.log(errors);
//         console.log(solicitud.body);
//         const valores = solicitud.body;
//         const errores = errors.array();
//         respuesta.render('/validaciones', {errores: errores, valores: valores});
//     }else{
//         respuesta.send('¡Validación Exitosa!');
//         console.log(solicitud.body);
//     }
// })

// ********************************************************************************************************************
app.listen(app.get('puerto'), () => {
    console.log('El servidor se está inicializando en el puerto', app.get('puerto'));
})