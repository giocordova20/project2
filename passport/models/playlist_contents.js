module.exports = function (sequelize, DataTypes) {
    const Playlist_content = sequelize.define("playlist_content", {
        song_start: {
            type: DataTypes.INT,
            allowNull: false,
        }
    });

    Playlist_content.associate = function (models) {
        Playlist_content.belongsTo(models.Playlist, {
            foreignKey: {
                allowNull: false
            }
        });

        Playlist_content.belongsTo(models.Song, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Playlist_content;
};
