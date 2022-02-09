module.exports = (app) => {
     
    const router = require("express").Router();
    const auth = require("../middlewares/auth");
    const userController = require("../controllers/user.controller");

    app.use("/api/user", router);

    router.get("/users" , auth, userController.getAllUsers);

    router.post("/user/signup" , userController.signUp);

    router.post("user/login" , userController.login);

    router.post("user/logout", userController.logout);

    router.delete("user/delete" , auth , userController.delete);
    

}