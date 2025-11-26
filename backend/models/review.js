import { DataTypes } from 'sequelize';

export default (db) => {
    return db.define('Review', {
        reviewID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        recipeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                //creates a foreign key relationship with Recipe table
                model: 'Recipe', //name of the table being referenced
                key: 'recipeID',
            },
            onDelete: 'CASCADE',
        },
        authorName: {
            type: DataTypes.STRING(22),
            allowNull: true, //optional as per proposal
        },
        reviewTitle: {
            type: DataTypes.STRING(42),
            allowNull: false,
        },
        reviewText: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        reviewRating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            /*ensures the rating is between 1-10 as in erd*/
            validate: {
                min: 1,
                max: 10,
            },
        },
    }, {
        tableName: 'Review',
        timestamps: false,
    });
};
