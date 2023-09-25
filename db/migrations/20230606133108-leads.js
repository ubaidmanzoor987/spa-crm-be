'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('leads', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            visit_phone_number: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            branch_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'branches',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
            },
            visit_id: {
                type: Sequelize.STRING,
            },
            visit_date: {
                type: Sequelize.STRING,
            },
            visit_time: {
                type: Sequelize.STRING,
            },
            social_platform: {
                type: Sequelize.STRING,
            },
            action_performed: {
                type: Sequelize.STRING,
            },
            secret_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'secrets',
                    key: 'id',
                },
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.addConstraint('leads', {
            fields: ['branch_id'],
            type: 'foreign key',
            name: 'fk_leads_branch_id',
            references: {
                table: 'branches',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        await queryInterface.addConstraint('leads', {
            fields: ['secret_id'],
            type: 'foreign key',
            name: 'fk_leads_secret_id',
            references: {
                table: 'secrets',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('leads', 'fk_leads_branch_id');
        await queryInterface.removeConstraint('leads', 'fk_leads_secret_id');
        await queryInterface.dropTable('leads');
    },
};
