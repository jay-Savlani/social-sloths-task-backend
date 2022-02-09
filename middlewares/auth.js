const jsonwebtoken = require("jsonwebtoken");

// Middleware to authorize a user. If user has not passed access_token in header. Then request will terminate

module.exports = (req,res,next) => {
    console.log("Request recieved for verifying json web token");
    const {access_token} = req.headers;
    console.log("Access token for middleware: ", access_token);
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