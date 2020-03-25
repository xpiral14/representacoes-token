import dotenv from "dotenv";
dotenv.config();
import app from "./App";

const porta = process.env.APP_PORT;
const host = process.env.APP_HOST;
app.listen(porta, () => {
  console.log("Aplicação rodando em " + host + porta);
});
