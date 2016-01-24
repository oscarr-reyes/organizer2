var hat = require('hat');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		accessToken: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: hat()
		}
	}, {
		tableName: 'user',
		freezeTableName: true,
		timestamps: false,
		instanceMethods: {
			toJSON: function(){
				var values = this.get();

				// remove password for search protection data
				delete values.password;
				return values;
			}
		}
	});
};
