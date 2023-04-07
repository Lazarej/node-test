const jwt = require('jsonwebtoken')
const private_key = require('./private_key')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    
    if (!authorizationHeader) {
        return res.status(401).json({message:'vous n \' etes pas identifier pour avoir ces données'})
    }

    const token = authorizationHeader.split(' ')[1]

    const decodeToken = jwt.verify(token, private_key, (error, decodeToken) => {
        if (error) {
            return res.status(401).json({message:'Vous n\'etes pas autoriser  a accéder a ces ressources'})
        }

        const userId = decodeToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json({message:"Vous avez un accès qui ne vous est pas reservé"})
        } else {
            next()
        }
    })
}