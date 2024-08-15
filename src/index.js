// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
// const app = express()(async (async) => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("ERR:", error);
//       throw error; //error handling
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("ERROR", error);
//     throw err;
//   }
// })();

import dotenv from "dotenv";
import { app } from "./app.js";

import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection failed !!", err);
  });
