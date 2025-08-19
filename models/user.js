const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose"); 

const userSchema = new Schema({ 
    email:{
        type:String,
        required : true 
    }
}); 



userSchema.plugin(passportLocalMongoose);// no need to define username and password field , passport will automatically define it 

module.exports = mongoose.model('User', userSchema);