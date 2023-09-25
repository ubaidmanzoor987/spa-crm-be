'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('visits', {
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

        await queryInterface.addConstraint('visits', {
            fields: ['branch_id'],
            type: 'foreign key',
            name: 'fk_visits_branch_id',
            references: {
                table: 'branches',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        await queryInterface.addConstraint('visits', {
            fields: ['secret_id'],
            type: 'foreign key',
            name: 'fk_visits_secret_id',
            references: {
                table: 'secrets',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('visits', 'fk_visits_branch_id');
        await queryInterface.removeConstraint('visits', 'fk_visits_secret_id');
        await queryInterface.dropTable('visits');
    },
};
