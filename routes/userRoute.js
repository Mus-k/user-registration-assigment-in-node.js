const express =  require("express");
const { getUser, loginUser, createUser,  } = require("../controllers/userControllers");

const userRoute = express.Router();
userRoute.get("/",getUser) // Home page 
userRoute.post("/register",createUser) // to register user 
 userRoute.post("/login",loginUser) // to login user  

module.exports = { userRoute}