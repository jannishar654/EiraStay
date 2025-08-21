const express= require("express"); 
const router = express.Router({mergeParams:true}); // by using merge params , :id of listing can be accessible here also

const wrapAsync = require("../utils/wrapAsync.js"); 


const Listing = require("../models/listing.js"); 
const Review = require("../models/review.js");
const {validateReview,isLoggedIn,isReviewAuthor} =require("../middleware.js"); 
const reviewController=require("../controllers/reviews.js") ; 
//console.log("Review model loaded as:", Review);



// Reviews //post ruoute 
router.post("/" ,isLoggedIn,validateReview,wrapAsync(reviewController.createReview)); 

// Post route for deleting review 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview)) ; 

module.exports = router ; 

