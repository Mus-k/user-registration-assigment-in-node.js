const express =require("express");

const cors = require('cors');
require('dotenv').config();
const connectToDb =require("./config/db");
const { userRoute } = require("./routes/userRoute");

const app=express()
app.use(cors()); 
app.use(express.json())

const PORT= process.env.PORT || 6000
app.use("/", userRoute)
connectToDb()
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
