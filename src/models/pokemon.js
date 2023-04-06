const  validType = ['Electrique','Plante', 'Poison','Dragon', 'Feu','Eau','Normal' , 'Fée','Psy']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: ' le nom est deja pris'
            },
            validate: {
                notEmpty: { msg: 'La valeur "name" ne doit pas etre vide'},
                notNull:{args: true, msg:'La valeur "name" doit etre spécifié'}
            }
        },
        type: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                idTypeValid(value) {
                    if (!value) {
                        throw new Error('Un pokemon doit avoir un type')
                    }
                    if (value.length > 3) {
                        throw new Error('Un pokemon ne peut pas avoir plus que 3 types')
                    }
                    value.forEach(type => {
                        if (!validType.includes(type)) {
                            throw new Error(`un ou plusieurs types spécifié ne sont pas autoriser , les types autorisé sont ${validType}`)
                        }
                    });
                    
               }
            }
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    });
}