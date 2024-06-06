const path = require('path');

const express = require("express");
const dotenv = require('dotenv').config();

const router = require("./routers/userRouter");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/cbConnection");

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res)=>{
    res.render('home');
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