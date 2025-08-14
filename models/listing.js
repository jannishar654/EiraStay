const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const listingSchema = new Schema({
    title : {
        type: String , 
        required : true , 
    },   
    description : String , 
    image : {
        type : String, 
        default : "https://plus.unsplash.com/premium_photo-1673292359615-f28e1b865b5b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set : (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1673292359615-f28e1b865b5b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        :v, 
    }, 
    price: Number, 
    location : String , 
    country : String , 
    reviews: [ // 1xn relationship 
        {
            type:Schema.Types.ObjectId , 
            ref:"Review", 
        },

    ],

}); 

const Listing = mongoose.model("Listing",listingSchema); 
module.exports = Listing ; 