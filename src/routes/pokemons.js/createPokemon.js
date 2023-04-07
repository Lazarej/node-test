const { Pokemon } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require('../../auth/auth')


module.exports = (app) => {
  app.post("/api/pokemons", auth, async (req, res) => {
    try {
      const pokemon = await Pokemon.create(req.body);
      const message = `Le pokemon ${pokemon.name} a bien été crée`;
      return res.json({message ,pokemon});
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
