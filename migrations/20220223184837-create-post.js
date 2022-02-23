'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      body: {
        type: DataTypes.STRING
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('posts');
  }
};