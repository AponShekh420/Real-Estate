// modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors')
// internal file imports



// configure funtionality
const app = express();
dotenv.config();
app.use(cors({
  origin: "https://localhost:3000",
}))


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))


// Root routes





// Server listening
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, ()=> {
  console.log(`The server has started at ${PORT}`)
})










