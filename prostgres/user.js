module.exports = async (sequelize, DataTypes, Model) => {

  const Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.JSON
    },
    age: {
      type: DataTypes.INTEGER
    },
    additional_info: {
      type: DataTypes.JSON
    }
  });

  return await Users.sync();

}