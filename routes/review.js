const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const Listings = require("../Models/listing.js");
const Review = require("../Models/review.js");

const reviewController = require("../controllers/reviews.js");

// Create Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createPost));

// Delete Post Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deletePost));

module.exports = router;