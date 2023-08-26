import express from "express";
import { v4 as uuidv4 } from "uuid";
const app = express();
app.use(express.json());

const usuarios = [];
const mensagens = [];
//cadastro
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
//login
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
//mensagem
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
//lista mensagem
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
//atualizar mensagem
app.put("/mensagem/:idMensagem", (req, res) => {
  const { idMensagem } = req.params;
  const { titulo, texto } = req.body;

  const mensagemIndex = mensagens.findIndex(
    (mensagem) => mensagem.id === idMensagem
  );
  if (mensagemIndex === -1) {
    return res.status(404).json({
      message: "Mensagem não encontrada",
    });
  }

  mensagens[mensagemIndex].titulo = titulo || mensagens.titulo;
  mensagens[mensagemIndex].texto = texto || mensagens.texto;

  res.status(200).json({
    message: "Mensagem atualizada",
  });
});
//deletar mensagem
app.delete("/mensagens/:idMensagem", (req, res) => {
  const { idMensagem } = req.params;
  const mensagemIndex = mensagens.findIndex(
    (mensagem) => mensagem.id === idMensagem
  );

  if (idMensagem === -1) {
    return res.status(404).json({
      message: "Mensagem não encontrada!!",
    });
  }

  const deletarMensagem = mensagens.splice(mensagemIndex, 1);

  res.status(200).json({
    message: "Mensagem Excluida!!",
    deletarMensagem,
  });
});
app.listen(8080, () => console.log("Servidor iniciado!!"));
