import { User } from "../models/user.model.js";

// Registering a user
export const registerUser = async (req, res) => {
  const { fullname, email, gender, age, address } = req.body;

  if (!fullname || !email || !gender) {
    res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const newUser = new User({
    fullname,
    email,
    gender,
    age,
    address,
  });

  await newUser.save();

  const userId = await User.findById(newUser._id);
  if (!userId) {
    return res.status(400).json({
      message: "User could not be created",
    });
  }

  return res.status(201).json({
    message: "User created successfully",
    userId,
  });
};

// retrieving the user by id
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Fetch a user and their associated movies
export const getUserWithMovies = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("movies");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Add a new movie and associate it with a user
export const addMovieToUser = async (req, res) => {
  const { userId } = req.params;
  const { name, yor, genre, directedBy } = req.body;

  try {
    const newMovie = await Movie.create({
      name,
      yor,
      genre,
      directedBy,
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.movies.push(newMovie._id);
    await user.save();

    return res.status(201).json({
      message: "Movie added to user successfully",
      movie: newMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
