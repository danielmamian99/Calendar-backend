/*
    Rutas de Usuario / Auth
    host + /api/auth
*/

const {Router} = require('express');
const router = Router();

router.get('/',(req, res) => {
    res.json({});
});

module.exports = router;