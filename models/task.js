/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('task', {
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
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
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
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		project_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'project',
				key: 'id'
			}
		}
	}, {
		tableName: 'task',
		freezeTableName: true,
		timestamps: false
	});
};
