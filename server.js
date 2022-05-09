const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const app = require("./app");

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

const DB =
  "mongodb+srv://Justina:lqcqMvjqowMoF6MU@cluster0.pebci.mongodb.net/tours?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Prisijungta prie DB...:)");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
