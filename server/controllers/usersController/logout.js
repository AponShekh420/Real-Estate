
const logout = async (req, res) => {
    try {
        const logout = res.clearCookie("session");
        if(logout) {
            res.json({
                message: "logged out successfully"
            });
        } else {
            res.status(500).json({
                errors: {
                    server: {
                        msg: "There was an server side error",
                    }
                },
            });
        }
    } catch(err) {
        console.log(err);
    }
}


module.exports = logout;