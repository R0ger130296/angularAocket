const User = require("../models/userModel"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken");

let login = (req, res) => {
    let { data } = req.body,
        email = data.email,
        password = data.password;
    User.find({ email })
        .then(data => {
            let token,
                tokenBody = {
                    nombre: data[0].nombre,
                    email: data[0].email,
                    rol: data[0].rol,
                    sessionID: data[0].sessionID,
                };
            bcrypt.compareSync(password, data[0].passw) ?
                ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
                        algorithm: "HS256",
                        expiresIn: 300,
                    })),
                    res.status(200).json({
                        ok: true,
                        data: null,
                        msg: "User OK",
                        token,
                    })) :
                res.status(404).json({
                    ok: false,
                    data: null,
                    msg: "Incorrect password",
                    token: null,
                });
        })
        .catch((err) => {
            res.status(404).json({
                ok: false,
                data: null,
                msg: "Email not found",
            });
        });
};

module.exports = {
    login,
};