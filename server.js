const path = require('path');

const express = require("express");
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const router = require("./routers/userRouter");
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

app.get('/', (req,res)=>{
    res.render('home',{
        user: req.user,
    });
})
app.use('/user', router);
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