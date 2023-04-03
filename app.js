const express = require('express')
let pokemons = require('./mock/pokemons')
const morgan = require('morgan')
const { Sequelize} = require('sequelize')
const { getUniqueId } = require('./tools/getUniqueId')
const app = express()
const port = 3000

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
    }
)

sequelize.authenticate()
    .then(_ => console.log('connexion'))
    .catch(error  => console.error('no connexion' , error))


app.use(morgan('combined'))
    .use(express.json())


app.get('/' , (req,res ) => res.send('Hello ddz'))
app.listen(port, () => console.log(`http://localhost:${port}`))
 

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.json(pokemon)
})

app.get('/api/pokemons', (req, res) => {
    res.json(pokemons)
    
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { id: id, ...req.body,  created: new Date() }
    pokemons.push(pokemonCreated)
    res.json(pokemonCreated)

})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { id: id, ...req.body, created: pokemons[id - 1].created }
    pokemons = pokemons.map((pokemon) => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    res.json(pokemonUpdated)
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    pokemons = pokemons.filter((pokemon) => {
        return pokemon.id !== id
    }) 

    res.json(pokemons)
})