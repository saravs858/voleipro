module.exports = function (req, res, next) {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(403).send("Acesso negado");
  }
  next();
};
