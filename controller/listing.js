const fs = require("fs");
const path = require("path");
const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  const { listing } = req.body;
  const newListing = new Listing(listing);
  newListing.owner = req.user._id;

  if (req.file) {
    const fileData = fs.readFileSync(req.file.path);
    newListing.image = {
      data: fileData.toString("base64"),
      contentType: req.file.mimetype,
    };
    fs.unlinkSync(req.file.path); // clean up uploaded file
  }

  await newListing.save();
  req.flash("success", "New listing created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing);

  if (req.file) {
    const fileData = fs.readFileSync(req.file.path);
    listing.image = {
      data: fileData.toString("base64"),
      contentType: req.file.mimetype,
    };
    fs.unlinkSync(req.file.path); // clean up
    await listing.save();
  }

  req.flash("success", `Listing "${listing.title}" was updated`);
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", `Listing "${deletedListing.title}" deleted`);
  res.redirect("/listings");
};
