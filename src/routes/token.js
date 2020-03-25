import { Router } from "express";
import upload from "../config/multer";
import RepresentacaoController from "../controllers/RepresentaçãoController";

const tokenRouter = Router();

tokenRouter.post("/", upload.single("certificado"), RepresentacaoController.obterToken);

export default tokenRouter;
