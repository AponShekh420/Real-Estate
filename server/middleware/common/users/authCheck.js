const jwt = require('jsonwebtoken');
const UserModel = require('../../../models/UserModel');



const authCheck = async (req, res, next) => {
    const {token} = req.signedCookies;
    
    if(token) {
        try {
            const verifyedToken = await jwt.verify(token, process.env.TOKEN_SECRET)

            if(verifyedToken) {
                const checkValidation = await UserModel.findOne({_id: verifyedToken.id, email: verifyedToken.email}, '-password');
                if(checkValidation) {
                    req.user = verifyedToken;
                    next();
                } else {
                    res.json({
                        errors: {
                            login: {
                                msg: "Authentication Problem"
                            }
                        }
                    })
                }
            } else {
                res.json({
                    errors: {
                        login: {
                            msg: "Authentication Problem"
                        }
                    }
                })
            }
        } catch(err) {
            console.log(err)
        }
    } else {
        res.json({
            errors: {
                login: {
                    msg: "Authentication Problem"
                }
            }
        })
    }
}


module.exports = authCheck;