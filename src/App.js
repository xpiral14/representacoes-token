import "dotenv";
import express from "express";
import tokenRouter from "./routes/token";
import bodyParser from "body-parser";

class App {
  constructor() {
    this.app = express();
    this.execMidlewares();
    this.execRoutes();
  }

  execMidlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  execRoutes() {
    this.app.use("/obter-token", tokenRouter);
    this.app.use((err, req, res, next) => {
      console.log(err)
      return res.status(500).json(err.message);
    });
  }
}

export default new App().app;
