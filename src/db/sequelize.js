const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
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
const User = UserModel(sequelize, DataTypes);

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de données "Pokedex" synchronisée');

    for (const pokemon of pokemons) {
      const bulbizarre = await Pokemon.create({
        name: pokemon.name,
        type: pokemon.type,
      });
      console.log(bulbizarre.toJSON());
    }

    const hash = await bcrypt.hash("pikachu", 10);
    const user = await User.create({
      email: "email@gmail.com",
      password: hash,
    });
    console.log("Utilisateur créé", user.toJSON());
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
