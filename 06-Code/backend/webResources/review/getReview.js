const reviewController = require("../../controllers/reviewController");

const getReview = (req, res) => {
  // Llamar al controlador de creación de personal
  reviewController.getReview(req, res);
};

module.exports = getReview;