let Listings = require("../Models/listing");

module.exports.index = async(req, res) => {
    let allListings = await Listings.find({});
    res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewListingForm = (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.showAllListings = async(req, res) => {
    let id = req.params.id;
    let listing = await Listings.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if (!listing) {
        req.flash("error", "This listing doesn't exist.");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
};

module.exports.createListings = async(req, res, next) => {
    let { path: url, filename } = req.file;
    
    const listing = new Listings(req.body.listing);
    listing.owner = req.user._id;
    listing.image = {url, filename};
    await listing.save();
    req.flash("success", "New listing added");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req, res) => {
    let id = req.params.id;
    const listing = await Listings.findById(id);
    if (!listing) {
        req.flash("error", "This listing doesn't exist.");
        return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
};

module.exports.updateListings = async(req, res) => {
    let id = req.params.id;
    await Listings.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "The listing is updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListings = async(req, res) => {
    let id = req.params.id;
    await Listings.findByIdAndDelete(id);
    req.flash("success", "The listing is deleted");
    res.redirect("/listings");
};