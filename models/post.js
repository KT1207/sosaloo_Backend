const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        NovelName: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        introduce: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        novelImg: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        UserName: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
  }
}

module.exports = Post;
