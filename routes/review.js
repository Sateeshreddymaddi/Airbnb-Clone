const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js")
const {validateReview, isLoggedIn, isreviewAuthor}=require("../middleware.js");
const listingcontroller = require("../controller/review.js");


    //Reviews
//Post Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(listingcontroller.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(listingcontroller.destroyReview));

module.exports=router;