const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./models");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

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

