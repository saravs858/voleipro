const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();

// Banco de dados
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB..."))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Configurações
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessão
app.use(session({
  secret: "volei_secret_key",
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAdmin = req.session.user?.isAdmin || false;
  next();
});

// Rotas
const indexRoutes = require("./routes/index");
const contactsRoutes = require("./routes/contact");
const adminTrainingsRoutes = require("./routes/adminTrainings");

app.use("/", indexRoutes);
app.use("/contacts", contactsRoutes);
app.use("/admin/trainings", adminTrainingsRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("404", { user: req.session.userId });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
