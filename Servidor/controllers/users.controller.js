const Usuarios = require("../models/userModel"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken");

let login = (req, res) => {
    let data = req.body.data,
        email = data.email,
        password = data.password;
    Usuarios.find({ email })
        .then(data => {
            let token,
                BodyToken = {
                    nombre: data[0].nombre,
                    email: data[0].email,
                    rol: data[0].rol,
                    sessionID: data[0].sessionID,
                };
            bcrypt.compareSync(password, data[0].passw) ?
                ((token = jwt.sign({ data: BodyToken }, process.env.KEY_JWT, {
                        algorithm: "HS256",
                        expiresIn: 6000,
                    })),
                    res.status(200).json({
                        ok: true,
                        data: null,
                        msg: "Usuario Registrado !",
                        token,
                    })) :
                res.status(404).json({
                    ok: false,
                    data: null,
                    msg: "Incorrect",
                    token: null,
                });
        })
        .catch((err) => {
            res.status(404).json({
                ok: false,
                data: null,
                msg: "Email no encontrado",
            });
        });
};

module.exports = {
    login,
};