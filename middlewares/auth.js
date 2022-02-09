const jsonwebtoken = require("jsonwebtoken");

module.exports = (req,res,next) => {
    const {access_token} = req.body;
    try{
        jsonwebtoken.verify(access_token, "hash55");
        next();
    }
    catch(ex) {
        res.status(401).json({
            message: "user unauthorized"
        })
    }
}