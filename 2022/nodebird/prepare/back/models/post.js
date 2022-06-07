const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
	static init(sequelize) {
		return super.init(
			{
				content: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
			},
			{
				modelName: "Post",
				tableName: "posts",
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci",
				sequelize,
			}
		);
	}
	static associate(db) {
		db.Post.belongsTo(db.User); //post.addUser
		db.Post.belongsToMany(db.Hashtag , { through: "PostHashtag" }); //post.addHashtags
		db.Post.hasMany(db.Comment); //post.addComments
		db.Post.hasMany(db.Image);  //post.addImages
        db.Post.belongsToMany(db.User , { through: "Like", as: "Likers", foreginKey: "LikedId"}); //post.addLikers post.removeLikers
        db.Post.belongsTo(db.Post, { ad: "Retweet" }) //post.addRetweet
	}
};
