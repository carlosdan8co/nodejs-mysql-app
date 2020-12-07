const router = require('express').Router();
const passport = require('passport');

const {isLoggedIn,IsNotLoggedIn} = require('../lib/auth');

router.get('/signup',IsNotLoggedIn,(req,res)=>{
    res.render('auth/signup');
})

router.post('/signup',IsNotLoggedIn,passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect:'/signup',
    failureFlash:true
}));

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile');
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logOut();
    res.redirect('/signin');
});

router.get('/signin',IsNotLoggedIn,(req,res)=>{
    res.render('auth/signin');
});

router.post('/signin',IsNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local.signin',{
    successRedirect: '/profile',
    failureRedirect:'/signin',
    failureFlash:true
    })(req,res,next)
});
module.exports = router;