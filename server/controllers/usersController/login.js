const UserModel = require("../../models/UserModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser')
const login = async (req, res, next) => {
    const {email, password} = req.body;
    
    try {
        const data = await UserModel.findOne({email});

        if(data) {
            const compare = await bcrypt.compare(password, data.password);
            if(compare) {
                const token = jwt.sign({id: data._id, email: data.email, name: data.name, avatar: data.avatar}, process.env.TOKEN_SECRET, {
                    expiresIn: '365d',
                });
                res.cookie('token', token, {
                    signed: true,
                    httpOnly: true,
                    secure: false,
                    maxAge: 365 * 24 * 60 * 60 * 1000 // one year
                }) 
                res.json({
                    data: {
                        email: data.email,
                        name: data.name,
                        id: data._id,
                        avatar: data.avatar
                    },
                    token: token,
                    message: "login sucessfully"
                })
            } else {
                res.json({
                    errors: {
                        login: {
                            msg: 'login access invalid'
                        }
                    }
                })
            }
        } else {
            res.json({
                errors: {
                    login: {
                        msg: 'login access invalid'
                    }
                }
            })
        }
    } catch(err) {
        console.log(err)
    }
}   




module.exports = login;