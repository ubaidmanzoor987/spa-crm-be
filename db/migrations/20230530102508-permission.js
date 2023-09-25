'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const productsTable = await queryInterface.describeTable('products');
        if (!productsTable.branch_id) {
            await queryInterface.addColumn('products', 'branch_id', {
                type: Sequelize.INTEGER,
                allowNull: true,
            });
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('products', 'branch_id');
    },
};
