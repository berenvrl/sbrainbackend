// import express from "express";
// import bcrypt from "bcryptjs";
// import cors from "cors";
// import knex from "knex";

// import handleRegister from "./controllers/register.js";
// import handleSignin from "./controllers/signin.js";
// import handleProfileGet from "./controllers/profile.js";
// import handleAPICall from "./controllers/image.js";
// import handleImage from "./controllers/image.js";

const express = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// import dotenv from "dotenv";
// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = knex({
  client: "pg",
  connection: {
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    ssl: { rejectUnauthorized: false },
  },
});

db.select()
  .from("users")
  .then((data) => {
    console.log("db select", data);
  });

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

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// app.listen(5432 || 3000, () => {
//   console.log(`Server is listening on port ${5432}`);
// });

/*
/ --> res= this is working
/signin --> POST= success/fail
/register -->POST =user 
/profile/:userid --> GET =user
/image --> PUT -->user
*/
