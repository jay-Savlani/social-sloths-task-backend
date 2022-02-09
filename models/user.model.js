module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
        name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
        password: {
            required: true,
            type: String
        },
        age: {
            required: true,
            type: String
        },
        isLoggedIn: {
            required: true,
            default: false,
            type: Boolean
        },
        uuid: {
            required: false,
            type: String
        },
        access_token: {
            required: false,
            type: String
        }
        
    });

    const User = mongoose.model("user", userSchema);
    return User;
}