const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
let listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); 


router.route("/")
.get(wrapAsync(listingController.index))   // Index Route
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListings));  // Create Route

// New Route
router.get("/new",isLoggedIn, listingController.renderNewListingForm);

router.route("/:id")
.get(wrapAsync(listingController.showAllListings))  // Show Route
.put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListings))  // Update Route
.delete(isLoggedIn, isOwner,  wrapAsync(listingController.deleteListings));  // Destroy Route


// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;