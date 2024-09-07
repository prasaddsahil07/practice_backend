import { Movie } from "../models/movie.model.js";

// Fetch all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Add a new movie
export const addNewMovie = async (req, res) => {
  const { name, yor, genre, directedBy } = req.body;

  if (!name || !yor || !directedBy) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  try {
    const newMovie = await Movie.create({
      name,
      yor,
      genre,
      directedBy,
    });

    return res.status(201).json({
      message: "Movie created successfully",
      newMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Movie could not be created",
      error: error.message,
    });
  }
};
