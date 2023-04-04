
const { Pokemon } = require('../db/sequelize')


module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        Pokemon.findAll()
            .then(pokemons => {
            res.json(pokemons)
        })
    })
}