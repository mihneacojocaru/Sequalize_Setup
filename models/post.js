'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //--- To chagne the returned name of the object: 
    //---> this.belongsTo(models.user, {foreignKey:'userId', as:'newName'}); 
    //--- !!! and you must also change this into the appRoute.

     this.belongsTo(models.user, {foreignKey:'userId'});
    }

    toJSON(){
      return {...this.get(), id:undefined,userId:undefined};
    }
  }
  Post.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postedAt:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'post',
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  });
  return Post;
};