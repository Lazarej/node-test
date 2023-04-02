const express = require('express')
let pokemons = require('./mock/pokemons')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('dev'))

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