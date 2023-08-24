import express, { response } from "express";
import { v4 as uuid } from "uuid";
const app = express();
app.use(express.json());

const usuario = [];
const mensagem = [];

app.post("/cadastro", (req, res) => {
  const emailJaUtilizado = usuario.find((usuario) => usuario.email === email);

  if (emailJaUtilizado) {
    return response.status(400).json({
      mensage: "Email em uso!!!",
    });
  }
});

app.listen(8080, () => console.log("Servidor iniciado!!"));
