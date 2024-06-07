const {Router} = require('express');
const User = require('../models/blogUserModel');

const router = Router();

router.get('/signin', (req,res)=>{
    return res.render('signin');
})

router.post('/signin', async (req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie('token',token).redirect('/');
    }catch(err){
        return res.render('signin',{
            error: "Invalid Email or Password"
        });
    }

    // console.log("user:",user);
})

router.get('/signup', (req,res)=>{
    return res.render('signup');
})

router.post('/signup', async(req,res)=>{
    const {fullName,email,password} = req.body;
    try{
        await User.create({
            fullName,
            email,
            password
        })
    }
    catch(err){
        console.log(err);
    }
    return res.redirect('/');
})

router.get('/logout' , (req,res)=>{
    res.clearCookie('token');
    return res.redirect('/');
})

module.exports = router;