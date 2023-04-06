const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Pokemon } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", async (req, res) => {
    try {
      const pokemon = await Pokemon.findByPk(req.params.id);
      if (!pokemon) {
        return res.status(404).json({ message: "Pokemon introuvable" });
      }
      const pokemonUpdate = await pokemon.update(req.body);
      return res.json({ message: "Ce pokemon a été changer", pokemonUpdate });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({message: error.message, data: error})
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({message: error.message, data: error})
      }
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
  });
};
