import express from "express";
import { v4 as uuidv4 } from "uuid";
const app = express();
app.use(express.json());

const usuario = [];
const mensagem = [];

app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;
  const emailJaUtilizado = usuario.find((usuario) => usuario.email === email);

  if (emailJaUtilizado) {
    return res.status(400).json({
      message: "Email em uso!!!",
    });
  }
  const novoUsuario = {
    id: uuidv4(),
    nome,
    email,
    senha,
  };
  usuario.push(novoUsuario);

  res.status(201).json({
    message: "Conta Criada",
    usuario: novoUsuario,
  });
});

app.listen(8080, () => console.log("Servidor iniciado!!"));
