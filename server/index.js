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
const CMTRouter = require('./routers/CMTRouter');
const catagoryRouter = require("./routers/catagoryRouter");
const subcatagoryRouter = require("./routers/subcatagoryRouter");
const blogRouter = require("./routers/blogRouter");

// user
const userRouter = require("./routers/userRouter")

// configure funtionality
const app = express();

dotenv.config();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))


mongoose.connect(process.env.MONGOOSE_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(()=> console.log('database connection successfully'))
.catch((err)=> console.log(err))

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json({limit: "50000mb"}))
app.use(express.urlencoded({extended: true, limit: "50000mb"}))
app.use(express.static(path.join(__dirname, "public")))


// Root routes

// community items
app.use('/api/state', stateRouter);
app.use('/api/area', areaRouter);
app.use('/api/city', cityRouter);
app.use('/api/community', communityRouter);
app.use('/api/models', CMTRouter);


// blog items
app.use('/api/catagory', catagoryRouter);
app.use('/api/subcatagory', subcatagoryRouter);
app.use('/api/blog', blogRouter);


// login and logout item
app.use('/api/user', userRouter)

// Server listening
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, ()=> {
  console.log(`The server has started at ${PORT}`)
})










