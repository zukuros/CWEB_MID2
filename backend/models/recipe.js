import { DataTypes } from 'sequelize';

export default (db) => {
    return db.define('Recipe', {
        recipeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        recipeTitle: {
            type: DataTypes.STRING(92),
            allowNull: false,
        },
        prepTimeMins: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cookTimeMins: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        instructions: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        photoURL_Path: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
    }, {
        tableName: 'Recipe',
        timestamps: false, // only include this if you don't want createdAt/updatedAt columns
    });
};