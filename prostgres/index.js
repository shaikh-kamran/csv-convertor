const { Sequelize, Model, DataTypes } = require("sequelize");
const config = require('config');
const db = {};

module.exports = async () => {

    try {

        if (db.connected) {
            return db
        }
        const sequelize = new Sequelize(config.get("postgres.database"), config.get("postgres.userName"), config.get("postgres.password"), {
            host: config.get("postgres.hostName"),
            dialect: config.get("postgres.dialect"),
            operatorsAliases: false,
            pool: {
                max: 10,
                min: 0,
                acquire: 20000,
                idle: 5000
            }
        });
        db.connected = true;
        db.Sequelize = Sequelize;
        db.sequelize = sequelize;
        db.users = await require("./user")(sequelize, DataTypes, Model);

        return db;

    } catch (error) {
        console.log("error", error);
        return error
    }

}