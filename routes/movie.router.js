import { Router } from "express";
import { getAllMovies, addNewMovie } from "../controllers/movie.controller.js";

const router = Router();

router.route("/").get(getAllMovies);
router.route("/addMovie").post(addNewMovie);

export default router;
