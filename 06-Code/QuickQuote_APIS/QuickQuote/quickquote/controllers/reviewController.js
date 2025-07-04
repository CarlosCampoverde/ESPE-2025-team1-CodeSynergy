const Review = require('../models/review');

// Obtener todas las reseñas
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();  // Obtener todas las reseñas

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No hay reseñas registradas" });
    }

    res.status(200).json(reviews);  // Retornar todas las reseñas encontradas
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas", error: error.message });
  }
};

// Obtener una reseña por ID
exports.getReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findOne({ id: id });

    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.status(200).json(review);  // Retornar la reseña encontrada
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reseña", error: error.message });
  }
};

// Crear una nueva reseña
exports.createReview = async (req, res) => {
  const { id, id_client, id_venue, review_rating, review_comments } = req.body;

  try {
    const newReview = new Review({ id, id_client, id_venue, review_rating, review_comments });
    await newReview.save();
    res.status(201).json(newReview);  // Reseña creada exitosamente
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reseña", error: error.message });
  }
};

// Actualizar una reseña existente
exports.updateReview = async (req, res) => {
  const { id, id_client, id_venue, review_rating, review_comments } = req.body;

  try {
    const review = await Review.findOne({ id: id });

    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    // Actualizar los campos de la reseña
    review.id_client = id_client;
    review.id_venue = id_venue;
    review.review_rating = review_rating;
    review.review_comments = review_comments;

    await review.save();
    res.status(200).json(review);  // Reseña actualizada
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reseña", error: error.message });
  }
};

// Eliminar una reseña
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findOne({ id: id });

    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    await Review.deleteOne({ id: id });
    res.status(200).json({ message: "Reseña eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reseña", error: error.message });
  }
};

// Obtener calificaciones de un lugar
exports.getReviewsByVenue = async (req, res) => {
  const { venue_id } = req.params;

  try {
    const reviews = await Review.find({ id_venue: venue_id }).select('id_client review_rating review_comments');

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No se encontraron reseñas para este lugar" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas del lugar", error: error.message });
  }
};