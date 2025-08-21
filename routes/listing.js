const express= require("express"); 
const router = express.Router(); 
const Listing = require("../models/listing.js"); 
const wrapAsync = require("../utils/wrapAsync.js"); 
const ExpressError=require("../utils/ExpressError.js");
const{ listingSchema} = require("../schema.js");
const {isLoggedIn,isOwner,validateListing} =require("../middleware.js"); 



// Index Route 
router.get("/" , async (req,res) => {
    const allListings = await Listing.find({}); 
    res.render("listings/index.ejs",{allListings}); 

}); 
// New Route 
router.get("/new",isLoggedIn,(req,res) => {
    
   
    res.render("listings/new.ejs"); 
}) ; 
// isko show route se upper hai kyuki , db listings/new ka id match karne lagega


// Show Route 
router.get("/:id", async (req,res) => {
    let {id} = req.params; 
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews", // all reviews 
        populate:{
            path:"author" , // nested populate , har ek reviews ka author bhi aaye 

        },
    })
    .populate("owner"); 
    if(!listing){
        req.flash("error","Listing you requested for ..Does not exist!"); 
        return res.redirect("/listings"); 
    }
    res.render("listings/show.ejs", {listing}); 
})
// CReate Route 
router.post("/" ,isLoggedIn,validateListing, wrapAsync(async(req,res,next) =>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing")
    // }
    // we will use joi validation 
   
    
        const newListing = new Listing(req.body.listing); 
        newListing.owner = req.user._id; 
        await newListing.save(); 
        req.flash("success", "new listing created !"); 
   
        res.redirect("/listings"); 

   
  
})); 

// Edit Route 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res) =>{
    let {id} = req.params; 
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for ..Does not exist!"); 
        return res.redirect("/listings"); 
    } 

    res.render("listings/edit.ejs",{listing}); 

}));

// Update Route 
router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(async(req,res) =>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing")
    }
    let {id} = req.params; 
   await Listing.findByIdAndUpdate(id,{...req.body.listing}); 
   req.flash("success", "Listing Updated !"); 
   res.redirect(`/listings/${id}`); 
}));
// Delete Route 
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async(req,res) =>{
    let {id} = req.params; 
   let deletedListing = await Listing.findByIdAndDelete(id); 
   console.log(deletedListing); 
   req.flash("success", "Listing Deleted  !"); 
   res.redirect("/listings");

})); 

module.exports= router ; 