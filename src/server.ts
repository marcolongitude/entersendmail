import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "./database";

import "./shared/container";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - #{error.message}`,
    });
  }
);

app.listen(3000, () => console.log("Server is running on port 3000"));
