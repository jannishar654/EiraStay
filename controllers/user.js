const User = require("../models/user.js"); 
module.exports.renderSignupForm = (req,res) =>{
    res.render("users/signup.ejs"); 
}; 

module.exports.signUp= async(req,res,next) =>{
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
    
}; 

module.exports.renderLoginForm = (req,res) =>{
    res.render("users/login.ejs"); 

}; 

module.exports.login= async(req,res) =>{
    req.flash("success","Wecome back to EiraStay "); 
    let redirectUrl = res.locals.redirectUrl || "/listings" ;  // agar direct listings page se login karenge toh isauthenticated
                                                               // trigger nhi hoga , then res.locals .redirectUrl empty hoga , so uss case me
                                                               // redirect to "/listings "
    res.redirect(redirectUrl); // going to url , from where we want to access 
}; 

module.exports.logOut= (req,res,next) =>{
    req.logOut((err) =>{
        if(err){
            return next(err); 
        }
        req.flash("success","you are logged out"); 
        res.redirect("/listings"); 
    });
}; 