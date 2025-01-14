const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar CORS para aceitar solicitações do seu front-end hospedado no Firebase
app.use(
  cors({
    origin: "https://eduardo-6b897.web.app", // Substitua pelo seu domínio correto
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

io.on("connection", (socket) => {
  console.log("Novo usuário conectado");

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

server.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});
