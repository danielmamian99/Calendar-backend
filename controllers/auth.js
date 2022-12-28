const {response} = require('express') // No es necesario, pero sirve para recueprar las ayudas del idle
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');

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

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        const token = await generarJWT( user.id, user.name );
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const userLogin = async(req, res) => {
    const {email, password} = req.body

    try {

        let user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email no valido'
            }); 
        }

        //confirmar las contraseñas
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg:'Password incorrecto'
            })
        }
        //Generar JWT
        const token = await generarJWT( user.id, user.name );

        res.status(200).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        });
    }
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