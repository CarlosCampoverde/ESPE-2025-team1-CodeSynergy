const reviewController = require("../../controllers/reviewController");

const createReview = (req, res) => {
  // Llamar al controlador de creación de personal
  reviewController.createReview(req, res);
};

module.exports = createReview;