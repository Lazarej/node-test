const { Pokemon } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id", async (req, res) => {
    try {
      const pokemon = await Pokemon.findByPk(req.params.id);
      if (!pokemon) {
        const message =
          "Erreur lors de la recherche du pokemon ! Ce pokemon n'existe pas";
        return res.status(404).json({ message });
      }
      const message = "Le pokemon a été trouvé";
      return res.json({ message, pokemon });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
  });
};
