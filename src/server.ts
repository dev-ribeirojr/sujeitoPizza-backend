import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
/**
  import 'express-async-errors';
  auxilia no erro e crach do app;
  é indicado importar sempre como segundo import;
*/

import cors from "cors";
import { router } from "./routes";

import path from "path";

//inicializando express;
const app = express();

//formato json;
app.use(express.json());

//qualquer url e qualquer ip acessa;
app.use(cors());

//rotiamento;
app.use(router);

//criando rota statica para acessar imagens
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

//middleware de acordo com o que é indicado pela biblioteca de errors;
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //verificando se o que está passando pela rota e do tipo Error;
  if (err instanceof Error) {
    // retornando error
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

//servidor, primeiro elemento a ser chamado;
app.listen(3333, () => console.log("iniciou"));
