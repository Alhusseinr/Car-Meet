'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('events', 'eventCode', { type: Sequelize.DataTypes.INTEGER });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('events', 'eventCode');
  }
};
