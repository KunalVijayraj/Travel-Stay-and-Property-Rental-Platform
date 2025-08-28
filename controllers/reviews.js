let Listings = require("../Models/listing.js");
let Review = require("../Models/review.js");

module.exports.createPost = async(req, res) => {
    let listing = await Listings.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review is created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deletePost = async(req, res, next) => {
    let {id, reviewId} = req.params;
    await Listings.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "The review is deleted");
    res.redirect(`/listings/${id}`)
};