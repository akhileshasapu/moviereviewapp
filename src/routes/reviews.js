import dotenv from "dotenv";
import express from "express";
import Review from "../models/review.js";
import auth from "../middleware/auth.js";
import axios from "axios";

dotenv.config();

router.get("/movie", async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ message: "Movie title is required" });

  const OMDB_API_KEY = process.env.OMDB_API_KEY; // put your key in .env file

  try {
    const response = await axios.get(` http://www.omdbapi.com/?&apikey=${OMDB_API_KEY}&t=${title}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie from OMDb", error });
  }
});

router.post("/", auth , async (req,res) => {
const {movieId,reviewText,score}=req.body
if(!movieId )
{
    return res.status(400).json({message:"missing ,movieid is required"})
}
if(!reviewText || !score)
{
  return res.status(400).json({message:"missing ,reviewtext and score are required"})
}
try{
    const newreview = new Review({
        movieId,
        userId:req.user._id,
        reviewText,
        score

    })
    await newreview.save()
    res.status(201).json(newreview)
}catch(err){
    res.status(500).json({ message: "Error saving review", err });
}
})

router.get("/my", auth ,async(req,res)=>{
   try{
     const myreviews = await Review.find({userId:req.user._id})
     res.json(myreviews)
   }catch(err){
     res.status(500).json({ message: "Error fetching your reviews", error });
   }
})


router.get("/:movieId",async(req,res)=>{
    try{
        const reviews = await Review.find({movieId:req.params.movieId}).populate("userId","username")
        res.json(reviews)

    }catch(err){
        res.status(500).json({ message: "Error fetching reviews", error });
    } 
})




module.exports = router
