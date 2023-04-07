const express = require("express");
const morgan = require("morgan");
const sequelize = require('./src/db/sequelize')

const app = express();
const port = 3000;

app.use(morgan("dev")).use(express.json());

sequelize.initDb()

require('./src/routes/pokemons.js/findAllPokemons')(app) 
require('./src/routes/pokemons.js/findPokemonByPk')(app)
require('./src/routes/pokemons.js/createPokemon')(app)
require('./src/routes/pokemons.js/updatePokemon')(app)
require('./src/routes/pokemons.js/deletePokemon')(app)
require('./src/routes/user.js/login')(app)



app.get("/", (req, res) => res.send("Hello ddz"));
app.listen(port, () => console.log(`http://localhost:${port}`));

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource  demandée! Vous pouvez  essayer une autre URL'
    res.status(404).json({message})
})