const mongoose = require('mongoose');
const schema = mongoose.Schema;
const appschema = new schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    secret: {
        type: String,
        required: true
    },
    appname: {
        type: String,
        required: true,
        unique: true
    },
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    clientSecret: {
        type: String,
        maxlength: 50,
        required: true
    }
});

module.exports = mongoose.model("app", appschema);
