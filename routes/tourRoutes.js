const express = require("express");
const { protect } = require("../controllers/authController");

const {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  findPlaces,
  findPlacesAndUpdate,
  addToTourPlace,
  deleteFromTourPlace,
} = require("./../controllers/tourController");

const router = express.Router();

// apsaugotas routas
router.route("/").get(protect, getAllTours).post(createTour);

router.route("/:id/tour/delete/:subID").patch(deleteFromTourPlace);

router.route("/:id/tour/update/:subID").patch(findPlacesAndUpdate);

router.route("/:id/tour").patch(addToTourPlace);

router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

router.route("/:id/:subId").patch(findPlacesAndUpdate);

module.exports = router;
