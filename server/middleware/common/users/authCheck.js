const jwt = require('jsonwebtoken');
const UserModel = require('../../../models/UserModel');



const authCheck = async (req, res, next) => {
    const {session} = req.cookies;
    
    if(session) {
        try {
            const verifyedToken = jwt.verify(session, process.env.TOKEN_SECRET)

            if(verifyedToken) {
                const checkValidation = await UserModel.findOne({_id: verifyedToken.id, email: verifyedToken.email}, '-password');
                if(checkValidation) {
                    req.user = checkValidation;
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