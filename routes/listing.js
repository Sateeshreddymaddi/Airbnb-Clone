// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const multer  = require('multer')
// const {storage}=require("../cloudConfig.js");
// const upload = multer({storage});

// const listingcontroller = require("../controller/listing.js");

// router.route("/")
// .get(wrapAsync(listingcontroller.index))//Index Route
// .post(upload.single('listing[image]'),validateListing, wrapAsync(listingcontroller.createListing));//Create Route


// //New Route
// router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

// router.route("/:id")
// .get(wrapAsync(listingcontroller.showListing))//Show Route
// .put(
//   isLoggedIn,
//   isOwner,
//   upload.single('listing[image]'),
//   validateListing,
//   wrapAsync(listingcontroller.updateListing))//Update Route
// .delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.destroyListing));//Delete Route

// //Edit Route
// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingcontroller.renderEditForm)
// );

// module.exports = router;


const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");

// Use local storage for multer (to get access to file buffer for base64)
const upload = multer({ dest: "uploads/" }); 

const listingController = require("../controller/listing.js");

// Index + Create
router.route("/")
  .get(wrapAsync(listingController.index)) // Index Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show + Update + Delete
router.route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
