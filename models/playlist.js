module.exports = function(sequelize, DataTypes) {
    const Playlist = sequelize.define("playlist", {
      playlist_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      genre: {
        type: DataTypes.INTEGER
      },
      drink: {
          type: DataTypes.INTEGER
      },
      explicit: {
          type: DataTypes.BOOLEAN
      },
      spotify_playlist_id: {
        type: DataTypes.TEXT,
        allowNull: false
      }}, 
      {freezeTableName: true}
);  
    Playlist.associate = function(models) {
        Playlist.hasMany(models.playlist_content, {
          as: 'Playlist_content',
          foreignKey: 'playlistId',
          onDelete: "cascade"
        });
    }
  
    return Playlist;
  };
