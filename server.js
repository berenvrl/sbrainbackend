import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";

import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfileGet from "./controllers/profile.js";
import handleAPICall from "./controllers/image.js";
import handleImage from "./controllers/image.js";

// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const knex = require("knex");
// const register = require("./controllers/register");
// const signin = require("./controllers/signin");
// const profile = require("./controllers/profile");
// const image = require("./controllers/image");
//const bodyParser = require("body-parser");

// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const app = express();

const db = knex({
  client: "pg",
  connection: {
    connectionString: config.process.env.DATABASE_URL,
    host: config[process.env.DATABASE_HOST],
    port: config[5432],
    user: config[process.env.DATABASE_USER],
    database: config[process.env.DATABASE_DB],
    password: config[process.env.DATABASE_PASSWORD],
  },
});

db.select()
  .from("users")
  .then((data) => {
    console.log("db select", data);
  });

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  handleAPICall(req, res);
});

// app.listen(process.env.PORT, () => {
//   console.log(`Server is listening on port ${process.env.PORT}`);
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

/*
/ --> res= this is working
/signin --> POST= success/fail
/register -->POST =user 
/profile/:userid --> GET =user
/image --> PUT -->user
*/
