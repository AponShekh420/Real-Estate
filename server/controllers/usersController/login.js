const UserModel = require("../../models/UserModel");
const bcrypt = require('bcryptjs')
const tokenGenerator = require("../../helpers/tokenGenerator");
// const cookie = require('cookie-parser')
const login = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const data = await UserModel.findOne({email});
        console.log(data)
        if(data) {
            const compare = await bcrypt.compare(password, data.password);
            console.log(compare)
            if(compare) {
                const token = tokenGenerator(res, data) 
                res.json({
                    data: {
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        id: data._id,
                        role: data.role,
                        provider: data.provider,
                        avatar: data.avatar,
                        accountId: data.accountId,
                    },
                    token: token,
                    msg: "login sucessfully"
                })
            } else {
                res.json({
                    errors: {
                        login: {
                            msg: 'Invalid login credentials'
                        }
                    }
                })
            }
        } else {
            res.json({
                errors: {
                    login: {
                        msg: 'Invalid login credentials'
                    }
                }
            })
        }
    } catch(err) {
        console.log(err)
    }
}   




module.exports = login;