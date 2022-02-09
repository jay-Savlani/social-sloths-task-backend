const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// using dotenv package to use env variablse
require("dotenv").config();

const db = require("./models");

// initialising express
const app = express();
// using middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// using cors to allow cross origin requests
app.use(cors());

// database connection
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to database");
})
.catch(err => {
    console.log("Error in connection to database");
    console.log("Connectio error: ", err);
})

app.get("/" , (req, res) => {
    res.send('Connected to database');
})

// Routes

require("./routes/user.routes")(app);

app.listen(process.env.PORT, () => console.log(`Server is listening on ${process.env.PORT}`));

