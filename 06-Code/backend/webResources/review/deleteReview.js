const reviewController = require("../../controllers/reviewController");

const deleteReview = (req, res) => {
  // Llamar al controlador de creación de personal
  reviewController.deleteReview(req, res);
};

module.exports = deleteReview;