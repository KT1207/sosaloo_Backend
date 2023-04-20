const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(70),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(70),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(70),
          allowNull: false,
        },
        WriteBool: {
          type: Sequelize.STRING(70),
          allowNull: false,
        },
        Idx: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "user",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
}

module.exports = User;
