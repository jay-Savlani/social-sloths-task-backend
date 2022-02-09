module.exports = (app) => {
     
    const router = require("express").Router();
    const auth = require("../middlewares/auth");
    const userController = require("../controllers/user.controller");

    app.use("/api/user", router);

    // implementing middleware to verify json token
    router.get("/" , auth, userController.getAllUsers);

    router.post("/signup" , userController.signUp);

    router.post("/login" , userController.login);

    router.post("/logout", userController.logout);

    // implementing middleware to verify json token
    router.delete("/delete" , auth , userController.delete);
    

}