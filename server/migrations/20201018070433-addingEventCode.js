'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('addresses', 'eventCode', { type: Sequelize.DataTypes.INTEGER });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('addresses', 'eventCode');
  }
};
