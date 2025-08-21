const express= require("express"); 
const router = express.Router({mergeParams:true}); // by using merge params , :id of listing can be accessible here also

const wrapAsync = require("../utils/wrapAsync.js"); 


const Listing = require("../models/listing.js"); 
const Review = require("../models/review.js");
const {validateReview,isLoggedIn,isReviewAuthor} =require("../middleware.js");  
//console.log("Review model loaded as:", Review);



// Reviews //post ruoute 
router.post("/" ,isLoggedIn,validateReview,wrapAsync(async(req,res) =>{
    let listing = await Listing.findById(req.params.id); 
    let newReview = new Review(req.body.review); 
    newReview.author=req.user._id; 

    listing.reviews.push(newReview); 

    await newReview.save(); 
    await listing.save(); 
    req.flash("success", "New Review  created !"); 

    res.redirect(`/listings/${listing._id}`); 

})); 

// Post route for deleting review 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async (req,res) =>{
    let {id, reviewId} = req.params; 

    // we will use pull operator to delete that review from reviws array of that listing 

    await Listing.findByIdAndUpdate(id ,{$pull: {reviews:reviewId}}); 
    await Review.findByIdAndDelete(reviewId); 
    req.flash("success", "Review Deleted  !"); 

    res.redirect(`/listings/${id}`); 
})) 

module.exports = router ; 

