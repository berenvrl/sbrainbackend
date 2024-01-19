const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
//const bodyParser = require("body-parser");

require("dotenv").config();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "3292",
    database: "sbdatabase",
  },
});

db.select()
  .from("users")
  .then((data) => {
    console.log("db select", data);
  });

const app = express();

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleAPICall(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
console.log(`Server is listening on port ${process.env.PORT}`);
/*
/ --> res= this is working
/signin --> POST= success/fail
/register -->POST =user 
/profile/:userid --> GET =user
/image --> PUT -->user
*/
