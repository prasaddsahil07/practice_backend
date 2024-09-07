import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    directedBy: {
      type: String,
      required: true,
    },
    yor: {
      type: Number,
    },
    genre: {
      type: String,
      required: true,
    },
    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

export const Movie = mongoose.model("Movie", movieSchema);
