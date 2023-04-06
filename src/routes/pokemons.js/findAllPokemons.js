const { Op } = require("sequelize");
const { Pokemon } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", async (req, res) => {
    try {
      if (req.query.name) {
        const name = req.query.name;
        const limit = parseInt(req.query.limit) || null
        const pokemonTargeted = await Pokemon.findAndCountAll({
          where: { name: { [Op.like]: `%${name}%` } },
          order: ["name"],
          limit: limit
        });
        return res.json(pokemonTargeted,);
      }
      const pokemon = await Pokemon.findAll();
      return res.json(pokemon);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
  });
};
