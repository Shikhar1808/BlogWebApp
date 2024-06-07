const path = require('path');

const express = require("express");
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const userRouter = require("./routers/userRouter");
const blogRouter = require("./routers/blogRouter");
const Blog = require('./models/blogModel');
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/cbConnection");
const checkForAuthentiacationCookie = require('./middleware/authentication');

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(checkForAuthentiacationCookie('token'));

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', async(req,res)=>{
    const allBlogs = await Blog.find();
    res.render('home',{
        user: req.user,
        blogs: allBlogs
    });
})
app.use('/user', userRouter);
app.use('/blog', blogRouter);
const start = async () => {
    try{
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(err){
        console.log(err);
    }
}
start()