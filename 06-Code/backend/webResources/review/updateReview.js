const reviewController = require("../../controllers/reviewController");

const updateReview = (req, res) => {
  // Llamar al controlador de creación de personal
  reviewController.updateReview(req, res);
};

module.exports = updateReview;