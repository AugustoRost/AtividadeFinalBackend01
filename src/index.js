import express from "express";
import { v4 as uuidv4 } from "uuid";
const app = express();
app.use(express.json());

const usuarios = [];
const mensagens = [];

app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;
  const emailJaUtilizado = usuarios.find(
    (usuarios) => usuarios.email === email
  );

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
  usuarios.push(novoUsuario);

  res.status(201).json({
    message: "Conta Criada",
    usuarios: novoUsuario,
  });
});

app.post("/login", (req, res) => {
  const { senha, email } = req.body;

  const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email);

  if (!usuarioEncontrado) {
    return res.status(404).json({
      message: "Senha ou Usuário inválidos!!",
    });
  }

  if (usuarioEncontrado.senha !== senha) {
    return res.status(404).json({
      message: "Senha ou Usuário inválidos!!",
    });
  }

  res.status(200).json({
    message: "Login realizado com sucesso",
  });
});

app.post("/mensagem", (req, res) => {
  const { titulo, texto, idUsuario } = req.body;
  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.id === idUsuario
  );

  if (!usuarioEncontrado) {
    return res.status(404).json({
      message: "Usuario não encontrado",
    });
  }

  const mensagemNova = {
    id: uuidv4(),
    titulo,
    texto,
    idUsuario,
  };
  mensagens.push(mensagemNova);
  res.status(201).json({
    message: "Mensagem adicionada no perfil.",
    mensagemNova,
  });
});

app.get("/mensagem/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.id === idUsuario
  );
  if (!usuarioEncontrado) {
    return res.status(404).json({
      message: "Usuario não encontrado!!!!!",
    });
  }
  const mensagemUsuario = mensagens.find(
    (mensagem) => mensagem.idUsuario === idUsuario
  );
  res.status(200).json(mensagemUsuario);
});
app.listen(8080, () => console.log("Servidor iniciado!!"));
