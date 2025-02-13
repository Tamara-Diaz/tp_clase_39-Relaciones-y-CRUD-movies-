module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10),
        genre_id: {
            type: dataTypes.BIGINT(10),
            references: {
                model: {
                    tableName: 'genres'
                },
                key: "id"
            }
        } 
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        underscored: true
    }
    const Movie = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, {
            foreingKey: 'genre_id',
            as: "genre"
        })
        

        Movie.belongsToMany(models.Actor, {
            through: "ActorMovie",
            foreingKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false,
            as: 'actors'
        })
    }


    return Movie
    
};