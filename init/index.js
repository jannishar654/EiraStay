const mongoose = require("mongoose"); 
const initData = require("./data.js"); 
const Listing = require("../models/listing.js"); 

const MONGO_URL ="mongodb://127.0.0.1:27017/eirastay";

main().then(() =>{
    console.log("Connected to DB"); 
}).catch((err) =>{
    console.log(err); 
}); 

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({}); 
//     // SInce data has both filename and url , so used it 
//     const simplifiedData = initData.data.map((listing) => {
//     return {
//         ...listing,
//         image: listing.image.url ,  // extract only the URL as a string
//         owner: "68a421f357649d683eb7259e" // to add owner to each listing  
//     };
    
// });

const simplifiedData = initData.data.map((listing) => {
  return {
    ...listing,
    image: { 
      url: listing.image.url,
      filename: listing.image.filename || "sample"
    },
    owner: "68a421f357649d683eb7259e"
  };
});


await Listing.insertMany(simplifiedData);
    console.log("data was initialised"); 
}; 
initDB(); 