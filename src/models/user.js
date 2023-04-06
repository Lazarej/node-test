module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: " cet email est deja pris",
      },
      validate: {
        isEmail: { msg: 'La valeur "email"  doit etre un email' },
        notNull: { args: true, msg: 'La valeur "email" doit etre spécifié' },
      },
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
    }
  }, {
         timestamps: true,
        createdAt: 'created',
        updatedAt: false
  });
};
