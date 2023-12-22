const { Schema, models, model } = require("mongoose");

// Mongo Mmenu item Model
const UploadSchema = new Schema(
  {
    image: {
      type: String,
      //   requireed: true,
    },
  },
  { timestamps: true }
);

export const Upload = models?.Upload || model("Upload", UploadSchema);
