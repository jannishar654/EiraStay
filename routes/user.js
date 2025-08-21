const express= require("express"); 
const router = express.Router();
const User = require("../models/user.js"); 
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js"); 

router.get("/signup",(req,res) =>{
    res.render("users/signup.ejs"); 
}); 

router.post("/signup",wrapAsync(async(req,res,next) =>{
    try{
     let {username,email,password} = req.body; 
    const newUser = new User({username,email}); 
    const registeredUser = await User.register(newUser,password); 
    //console.log(registeredUser);
    req.login(registeredUser,(err) =>{ // for automatically login , when sign up 
        if(err){
            return next(err); 
        }
        req.flash("success","Welcome to EiraStay") ; 
        res.redirect("/listings");
    })
     
    } catch (e) {
        req.flash("error",e.message); 
        res.redirect("/signup"); 
    }
    
})); 

router.get("/login",(req,res) =>{
    res.render("users/login.ejs"); 

}); 

router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect: "/login" , failureFlash:true
}), 
async(req,res) =>{
    req.flash("success","Wecome back to EiraStay "); 
    let redirectUrl = res.locals.redirectUrl || "/listings" ;  // agar direct listings page se login karenge toh isauthenticated
                                                               // trigger nhi hoga , then res.locals .redirectUrl empty hoga , so uss case me
                                                               // redirect to "/listings "
    res.redirect(redirectUrl); // going to url , from where we want to access 
}); 

// logout route 

router.get("/logout",(req,res,next) =>{
    req.logOut((err) =>{
        if(err){
            return next(err); 
        }
        req.flash("success","you are logged out"); 
        res.redirect("/listings"); 
    });
});

module.exports=router ; 