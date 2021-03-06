const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Entry extends Model {}

Entry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 40]
            }
        },
        creation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'comment',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'entry',
    }
);

module.exports = Entry;