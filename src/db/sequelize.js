const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
let pokemons = require("../../mock/pokemons");

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

sequelize
  .authenticate()
  .then((_) => console.log("connexion"))
  .catch((error) => console.error("no connexion", error));

const Pokemon = PokemonModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    console.log('base de données "Pokedex synchronisée');

    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        type: pokemon.type,
      }).then((bulbizarre) => console.log(bulbizarre.toJSON()));
    });
  });
};

module.exports = {
  initDb,
  Pokemon,
};
