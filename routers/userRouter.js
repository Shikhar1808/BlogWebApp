const {Router} = require('express');
const User = require('../models/blogUserModel');

const router = Router();

router.get('/signin', (req,res)=>{
    return res.render('signin');
})

router.post('/signin', (req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    const user = User.matchPassword(email,password);

    console.log("user:",user);
    return res.redirect('/');
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
        console.log(req.body);
    }
    catch(err){
        console.log(err);
    }
    return res.redirect('/');
})

module.exports = router;