const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling uncaught exceptions
// console.log(youtube) : this will give error that youtube is not defined so this is uncaught error
// for that we do this

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejections

// this is the error when u have issue in the connection url or something which is not handled
// like no try catch block like if in place of mongodb we use only mongo so in that case this
// error handling help to shut down the server

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});
