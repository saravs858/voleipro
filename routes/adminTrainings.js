const express = require("express");
const router = express.Router();
const Training = require("../models/Training");

// 🔐 middleware simples de admin (não mexe no resto)
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  return res.status(403).send("Acesso negado");
}

// 📄 LISTAR TREINOS (ADMIN)
router.get("/", isAdmin, async (req, res) => {
  const trainings = await Training.find();
  res.render("admin/trainings/index", { trainings });
});

// ➕ FORM CRIAR
router.get("/new", isAdmin, (req, res) => {
  res.render("admin/trainings/new");
});

// 💾 SALVAR
router.post("/new", isAdmin, async (req, res) => {
  await Training.create(req.body);
  res.redirect("/admin/trainings");
});

// ✏️ FORM EDITAR
router.get("/edit/:id", isAdmin, async (req, res) => {
  const training = await Training.findById(req.params.id);
  res.render("admin/trainings/edit", { training });
});

// 🔄 ATUALIZAR
router.post("/edit/:id", isAdmin, async (req, res) => {
  await Training.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/trainings");
});

// 🗑️ APAGAR
router.post("/delete/:id", isAdmin, async (req, res) => {
  await Training.findByIdAndDelete(req.params.id);
  res.redirect("/admin/trainings");
});

module.exports = router;