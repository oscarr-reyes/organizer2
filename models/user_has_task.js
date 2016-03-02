/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_has_task', {
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		task_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'task',
				key: 'id'
			}
		}
	}, {
		tableName: 'user_has_task',
		freezeTableName: true,
		timestamps: false
	});
};
