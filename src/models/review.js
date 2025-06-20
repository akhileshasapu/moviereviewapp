const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
movieId:{type:String,required:true},
userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
reviewText:{type:String,required:true},
score:{type:Number,required:true,timestamps: true }
})
module.exports = mongoose.model("review",ReviewSchema)