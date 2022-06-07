const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: DataTypes.STRING(30), // STRING,TEXT,BOOLEAN, INTEGER, FLOAT, DATETIME
                    allowNull: false, //필수
                    unique: true, //고유한 값
                },
                nickname: {
                    type: DataTypes.STRING(30),
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
            },
            {
                modelName: "User",
                tableName: "users",
                charset: "utf8mb4",
				collate: "utf8mb4_general_ci",
                sequelize,
            },
        )
    }
    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post , { through: "Like", as: "Liked", foreginKey: "LikersId"});
        db.User.belongsToMany(db.User , { through: "Follow", as: "Followers", foreginKey: "FollowingId" });
        db.User.belongsToMany(db.User , { through: "Follow", as: "Followings", foreginKey: "FollowerId" });
    }
}

