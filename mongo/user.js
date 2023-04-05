const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = () => {

    const UserSchema = new Schema({
        name: String,
        address: Object,
        additional_info: Object,
        age: Number
    }, { timestamps: true });
    return mongoose.model('User', UserSchema);

}