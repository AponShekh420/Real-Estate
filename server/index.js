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
const amenityRouter = require("./routers/amenityRouter");
const reviewRouter = require("./routers/reviewRouter");
const commentRouter = require("./routers/commentRouter");
const wishlistRouter = require("./routers/wishlistRouter");

// user
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const passport = require('./utils/passport');

// configure funtionality
const app = express();

dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  next()
})


app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://real-estate-ten-phi.vercel.app"],
  credentials: true,
  methods: "GET, POST, PATCH, DELETE, PUT"
}))


mongoose.connect(process.env.MONGOOSE_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(()=> console.log('database connection successfully'))
.catch((err)=> console.log(err))

app.use(cookieParser())
app.use(express.json({limit: "50000mb"}))
app.use(express.urlencoded({extended: true, limit: "50000mb"}))
app.use(express.static(path.join(__dirname, "public")))


// password for social login
passport(app);

// community items
app.use('/api/state', stateRouter);
app.use('/api/area', areaRouter);
app.use('/api/city', cityRouter);
app.use('/api/community', communityRouter);
app.use('/api/models', CMTRouter);
app.use('/api/amenity', amenityRouter);


// blog items
app.use('/api/catagory', catagoryRouter);
app.use('/api/subcatagory', subcatagoryRouter);
app.use('/api/blog', blogRouter);


// login and logout item
app.use('/api/user', userRouter)
app.use('/auth', authRouter)




// review
app.use('/api/review', reviewRouter);
app.use('/api/comment', commentRouter);


// community wishlist
app.use('/api/wishlist', wishlistRouter);



// Root routes
app.get('/', (req, res) => {
  res.status(200).json({
    msg: "welcome to the home page"
  })
})


// Server listening
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, ()=> {
  console.log(`The server has started at ${PORT}`)
})










