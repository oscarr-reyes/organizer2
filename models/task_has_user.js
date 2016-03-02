/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_has_user', {
    task_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'task',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    tableName: 'task_has_user',
    freezeTableName: true,
    timestamps: false
  });
};
