/*
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { fieldValidator } = require("../middlewares/fieldValidator");
const { createUser, userLogin, renewToken } = require("../controllers/auth");
const { validarJWT } = require('../middlewares/validar-jwt')

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Email no valido").isEmail(),
    check("password", "La contraseña debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email no valido").isEmail(),
    check("password", "La contraseña debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  userLogin
);


router.get("/renew", validarJWT ,renewToken);


module.exports = router;
