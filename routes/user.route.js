import { Router } from "express";
import {
  getUserWithMovies,
  addMovieToUser,
  registerUser,
  getUserById,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/newuser").post(registerUser);
router.route("/:userId").get(getUserById);
router.route("/:userId/movies").get(getUserWithMovies);
router.route("/:userId/addMovie").post(addMovieToUser);

export default router;
