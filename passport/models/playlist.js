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
        type: DataTypes.INT
      },
      drink: {
          type: DataTypes.INT
      },
      explicit: {
          type: DataTypes.BOOLEAN
      }
    });
  
    Playlist.associate = function(models) {
        Playlist.hasMany(models.Playlist_content, {
          onDelete: "cascade"
        });
    }
  
    return Playlist;
  };
  