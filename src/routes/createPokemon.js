const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
    .then(pokemon => res.json(pokemon))
})
}