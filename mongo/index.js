const mongoose = require('mongoose');
const config = require('config');
const _models = require('require-dir')();
const db = {};

module.exports = async () => {
    try {

        if (db.connected)
            return db

        const mongourl = `mongodb://${config.get("mongodb.host")}:${config.get("mongodb.port")}/${config.get("mongodb.db")}`;
        const connection = await mongoose.connect(mongourl);
        console.log("Connection established");

        const models = {};
        Object.keys(_models).forEach(model => {
            models[model] = _models[model]();
        });

        db['connected'] = true;
        db['models'] = models;
        db['connection'] = connection;

        return db

    } catch (err) {
        console.log("Err", err);
    }
}