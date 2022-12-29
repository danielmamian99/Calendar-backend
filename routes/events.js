/*
    Event Routes
    host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/idDate");
const { fieldValidator } = require("../middlewares/fieldValidator");

const { validarJWT } = require('../middlewares/validar-jwt');

router = Router();
//Todas las rutas debajo de esta linea tienen que pasar por la validación del JWT
router.use( validarJWT );

//Obtener eventos
router.get('/', getEvents );

//Crear evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha final es obligatoria').custom( isDate ),
        fieldValidator
    ],
    createEvent );

//Actualizar evento
router.put('/:id',[

], updateEvent );

//Borrar eventos
router.delete('/:id', [

], deleteEvent );

module.exports = router;
