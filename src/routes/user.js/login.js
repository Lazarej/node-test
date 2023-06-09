const { User } = require("../../db/sequelize");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordValid) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      //JWT

      const token = jwt.sign({userId: user.id}, privateKey, {expiresIn: '24h'})
      return res.json({
        message: "L' utilisateur a été trouvé avec succés",
        user,
        token
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Erreur lors de la connection ,  réesayer dans quelques instants",
      });
    }
  });
};
