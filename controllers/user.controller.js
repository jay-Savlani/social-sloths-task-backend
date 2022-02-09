const db = require("../models");
const User = db.user;
// requiring bcrypt to store hashed password in database
const bcrypt = require("bcrypt");
const {fromString, isUuid} = require("uuidv4");
const jsonwebtoken = require("jsonwebtoken");
const uitls = require("../utils/utils");

// Function to get all users data 
// will not work if user has not passed access token for authorization
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

// Function to login a user. An unique uuid and access_token is sent to user for subsequent access
exports.login = (req,res) => {
    let authHeader = req.headers["authorization"];
    // console.log("auth header is", authHeader);
    if(!authHeader) {
        res.status(401).json({
            message: "Access-token not provided"
        })
    }
    const {email, password} = uitls.extractEmailAndPasswordFromHeader(authHeader);
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
                const access_token = jsonwebtoken.sign({_id: user._id}, "hash55");
                // console.log("access token generated: ", access_token);
                const uuid = fromString(user._id.toString());
                // console.log("uuid generated");
                user.uuid = uuid;
                user.access_token = access_token;
                user.isLoggedIn = true;
                user.save()
                res.status(200).json({
                    uuid: uuid,
                    access_token: access_token,
                    user: user,
                    message: "Logged in Successfully"
                }) 
            }
            else {
                res.status(401).json({
                    
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

// Function to logout user. UUID sent to user during login is checked to validate user
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

// Function to sign up user. Data is sent in request body
exports.signUp = (req,res) => {
    const {name , email, password , age} = req.body;
    if(!name || !email || !password || !age) {
        res.status(400).json({
            message: "Please provide all details"
        });
    }
    // password is hashed using bcrypt before storing in database. This way database will be secure from attackers
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

// function to delete a user based on email. As in schema all emails are defined as unique
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