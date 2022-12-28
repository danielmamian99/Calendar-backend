const {response} = require('express') // No es necesario, pero sirve para recueprar las ayudas del idle
const User = require('../models/User');

const createUser = async(req, res = response) => {// el = response no es necesario, pero ayuda a recuperar las ayudas del idle
    const { email, password } = req.body;
    try{
        let user = await User.findOne({ email });
        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        user = new User( req.body );

        await user.save();
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const userLogin = (req, res) => {
    const {email, password} = req.body

    res.status(201).json({
        ok:true,
        msg:'login',
        email,
        password
    });
}

const renewToken = (req, res) => {
    res.json({
        ok:true,
        msg:'renew'
    });
}

module.exports = { 
    createUser,
    userLogin,
    renewToken
};