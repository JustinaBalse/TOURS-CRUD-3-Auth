const mongoose = require("mongoose");

const placesToVisitSchema = new mongoose.Schema(
  {
    places: {
      type: String,
      trim: true,
      maxlength: [
        40,
        "A place name must have less or equal then 40 characters",
      ],
      minlength: [2, "A place name must have more or equal then 2 characters"],
    },
    duration: Number,
  },
  {
    timestamps: true,
  }
);

// DB schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requared: [true, "A tour name must have a name."],
      trim: true,
      maxlength: [
        40,
        "A tour name must have less or equal then 40 characters.",
      ],
      minlength: [2, "A tour name must have more or equal then 2 characters."],
    },
    price: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "({VALUE}) - price must be greater than 0",
      },
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty."],
      enum: {
        values: ["easy", "medium", "difficult"],
        message:
          "({VALUE}) is not supported. Difficulty is either: easy, medium, difficult.",
      },
    },
    placesToVisit: [placesToVisitSchema],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// tourSchema.pre("save", function () {
//   console.log(this);
// });

// Modelis
const Tour = new mongoose.model("Tour", tourSchema);

// Duomenų siuntimas į DB
// const testTour = new Tour({
//   name: "Kaunas",
//   price: 300,
//   difficulty: "easy",
//   placesToVisit: [
//     {
//       places: "Pirma vieta",
//       duration: 23,
//     },
//     {
//       places: "Antra vieta",
//       duration: 33,
//     },
//     {
//       places: "Trecia vieta",
//       duration: 53,
//     },
//   ],
// });

//testTour.save();

module.exports = Tour;
