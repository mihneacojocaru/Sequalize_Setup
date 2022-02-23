'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //this.hasMany(models.post,{foreignKey:'userId', as: 'newName'});
      this.hasMany(models.post,{foreignKey:'userId', as:'myPosts'});

    }

    toJSON(){
      return {...this.get(), id:undefined};
    }
  }
  User.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg:'User must have a name'},
        notEmpty: {msg:'Name must not be empty'},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg:'User must have a email'},
        notEmpty: {msg:'Email must not be empty'},
        isEmail: true,
      } 
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg:'User must have a role'},
        notEmpty: {msg:'Role must not be empty'},
      }
    },
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  });
  return User;
};