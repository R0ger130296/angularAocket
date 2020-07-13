;
'use strict'
const fs = require('fs'),
    path = require('path'),
    bcrypt = require('bcrypt'),
    jwt = require("jsonwebtoken"),
    usuarios_model = require('../modelos/usuarios');

let getUsuario = (req, res) => {
    usuarios_model.find()
        .then(data => {
            res.status(200).json({
                msg: 'ok',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })
}

//Actualizar uno
let updateOne = (req, res) => {
    let _id = req.params.id,
        data = req.body.data;

    usuarios_model.updateOne({ '_id': _id }, { $set: data })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ready",
                token: req.token,
            });
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: err,
            });
        });
};

//delete One
let deleteOne = (req, res) => {
    id = req.params.id
    usuarios_model.deleteOne({ '_id': id })
        .then(data => {
            res.status(200).json({
                msg: `${data.deletedCount}`,
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })
}

//ingresar usuarios con bcryp
let nuevoUsuario = (req, res) => {
    let usuario = req.body.data
    usuarios_model.create(usuario)
        .then(data => {
            res.status(200).json({
                msg: 'ok',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })

}


let login = (req, res) => {
    let { data } = req.body,
        email = data.email,
        password = data.password;

    usuarios_model.find({ email })
        .then((data) => {
            if (data[0].email === email) {
                let token,
                    tokenBody = {
                        nombre: data[0].nombre,
                        email: data[0].email,
                        rol: data[0].rol,
                        sessionID: data[0].sessionID,
                    };
                bcrypt.compareSync(password, data[0].passw) ?
                    ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, console.log(token), {
                            algorithm: "HS256",
                            expiresIn: 60000,
                        })),
                        res.status(200).json({
                            transaccion: true,
                            data: data,
                            msg: "User OK",
                            token,
                        })) :
                    res.status(404).json({
                        transaccion: false,
                        data: null,
                        msg: "Incorrect password",
                        token: null,
                    });
            }
        })
        .catch((err) => {
            res.status(404).json({
                transaccion: false,
                data: null,
                msg: "Email not found",
            });
        });
};
module.exports = {
    getUsuario,
    login,
    nuevoUsuario,
    deleteOne,
    updateOne
}