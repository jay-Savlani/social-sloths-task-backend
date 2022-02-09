const b2a = require("b2a");

// Email and password from user are sent in authorization header for security purpose.
// atob method is used to decode the email and password sent in header
// function returns an object containing decoded email and password

const extractEmailAndPasswordFromHeader = (authHeader) => {
    let authHeaderArray = authHeader.split(" ");
    let emailAndPasswordArray = authHeaderArray[1].split(":");
    let email = b2a.atob(emailAndPasswordArray[0]);
    let password = b2a.atob(emailAndPasswordArray[1]);
    return {email, password};
}


module.exports = {
    extractEmailAndPasswordFromHeader
}