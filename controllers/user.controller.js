const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const {fromString, isUuid} = require("uuidv4");
const jsonwebtoken = require("jsonwebtoken");

exports.getAllUsers = (req,res) => {
    console.log("Recieved request to get all users");
    User.find({})
    .then(users => {
        if(users.length === 0) {
            res.status(404).json({
                message: "No Users Found"
            })
        }
        res.status(200).json({
            users: users,
            message: "Got All Users Successfully"
        })
    })
    .catch(err => {
        console.log("Server error in getting all users");
        console.log("Error: ", err);
        res.status(500).json({
            message: "Internal server error"
        })
    })
    
}

exports.login = (req,res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400).json({
            message: "Please provide email and password"
        })
    }

    const filter = {email: email};
    User.findOne(filter)
    .then(user => {
        if(user === null) {
            res.status(404).json({
                message: "User does not exist"
            })
        }
        else {
            if(bcrypt.compareSync(password, user.password)) {
                const access_token = jsonwebtoken.sign(user._id, "hash55");
                const uuid = fromString(user._id);
                user.uuid = uuid;
                user.access_token = access_token;
                user.isLoggedIn = true;
                user.save()
                res.status(200).json({
                    uuid: uuid ,
                    message: "Logged in Successfully"
                }) 
            }
            else {
                res.status(401).json({
                    user: user,
                    message: "Invalid Password"
                }) 
            }
        }
    })
    .catch(err => {
        console.log("Server error in logging user");
        console.log("Error: ", err);
        res.status(500).json({
            message: "Internal server error in logging user"
        })
    })
}

exports.logout = (req,res) => {
    const {uuid} = req.body;
    if(!uuid) {
        res.status(400).json({
            message: "uuid missing"
        })
    }
    if(isUuid(uuid)) {
        User.findOne({uuid: uuid})
        .then(user => {
            if(user !== null) {
                user.isLoggedIn = false;
                user.access_token = "",
                user.uuid = ""
                user.save();
                res.status(200).json({
                    message: "Logged Out Successfully"
                })
            }
            else {
                res.status(404).json({
                    message: "User not found with provided uuid"
                })
            }
        })
        .catch(err => {
            console.log("Server error in loggin out user");
            console.log("Error: ", err);
            res.status(500).json({
                message: "Internal server error in logging out user"
            })
        })
    }
}

exports.signUp = (req,res) => {
    const {name , email, password , age} = req.body;
    if(!name || !email || !password || !age) {
        res.status(400).json({
            message: "Please provide all details"
        });
    }
    const hashPassword = bcrypt.hashSync(password,10);
    const signUpData = {
        name: name,
        email: email,
        password: hashPassword,
        age: age
    }
    const newUser = new User(signUpData);
    newUser.save()
    .then(user => {
        res.status(200).json({
            message: "Sign Up Successfull. Please login"
        });
    })
    .catch(err => {
        console.log("Server error in signing up user");
        console.log("Error: ", err);
        res.status(500).json({
            message: "Internal server error in signing user"
        })
    })
}

exports.delete = (req,res) => {
    const {email} = req.body;
    if(!email) {
        res.status(400).json({
            message: "Email required to delete a user"
        })
    }
    User.deleteOne({email: email})
    .then(user => {
        if(user === null) {
            res.status(400).json({
                message: "Invalid Email"
            })
        }
        res.status(200).json({
            message: "User deleted successfully"
        })
    })
    .catch(err => {
        console.log("Server error in deleting user");
        console.log("Error: ", err);
        res.status(500).json({
            message: "Internal server error in deleting user"
        })
    })

}