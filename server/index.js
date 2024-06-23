// modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

// internal file imports
const stateRouter = require('./routers/stateRouter');
const areaRouter = require('./routers/areaRouter');
const cityRouter = require('./routers/cityRouter');
const communityRouter = require('./routers/communityRouter');



// configure funtionality
const app = express();

dotenv.config();
app.use(cors({
  origin: "https://localhost:3000",
}))


mongoose.connect(process.env.MONGOOSE_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(()=> console.log('database connection successfully'))
.catch((err)=> console.log(err))

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))


// Root routes

app.use('/state', stateRouter);
app.use('/area', areaRouter);
app.use('/city', cityRouter);
app.use('/community', communityRouter);



// Server listening
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, ()=> {
  console.log(`The server has started at ${PORT}`)
})










