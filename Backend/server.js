const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const users = require("./routes/userRoute");

//app
const app = express();

//DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.json());
app.use(cors());

//routes

app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.use("/", (req, res) => {
  res.status(200).send("uuu");
});

//server create
const Port = process.env.PORT || 3005;
app.listen(Port, () => console.log(`listening on port${Port}`));
