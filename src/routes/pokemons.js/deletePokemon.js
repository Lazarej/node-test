const { Pokemon } = require("../../db/sequelize");
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth,  async (req, res) => {
    try {
      const pokemon = await Pokemon.findByPk(req.params.id);
      if (!pokemon) {
        return res.status(404).json({ message: "Pokemon introuvable" });
      }
      await pokemon.destroy();
      return res.json({ message: "Pokemon supprimé avec succès", pokemon });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
  });
};
