const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.post("/", async (req, res) => {
  // console.log("🚀 ROTA /contacts FOI CHAMADA"); todos que tem esse 💀 sao oq usei pra testar de a rota estava funcionando
  // console.log("📦 BODY:", req.body);💀
  try {
    // console.log("BODY RECEBIDO:", req.body);💀

    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const saved = await Message.create({ name, message });

    // console.log("SALVO NO BANCO:", saved);💀

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("ERRO AO SALVAR:", error);
    res.status(500).json({ error: "Erro ao salvar mensagem" });
  }
});

module.exports = router;
