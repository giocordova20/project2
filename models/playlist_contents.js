module.exports = function (sequelize, DataTypes) {
    const Playlist_content = sequelize.define("playlist_content", {
        song_start_ms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        track: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING
        },
        order_in_playlist: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_href: {
            type: DataTypes.TEXT
        },
    spotify_uri: {
        type: DataTypes.TEXT
    }
    }, 
            {freezeTableName: true}
        

    );

    return Playlist_content;
};
