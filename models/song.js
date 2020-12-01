module.exports = function(sequelize, DataTypes) {
    const Song = sequelize.define("song", {
      song_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      song_artist: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      genre: {
        type: DataTypes.INTEGER
      }
    });
  
    Song.associate = function(models) {
        Song.hasMany(models.Playlist_content, {
          onDelete: "cascade"
        });
    }
  
    return Song;
  };
  