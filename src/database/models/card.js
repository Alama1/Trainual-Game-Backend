const {Schema, model} = require("mongoose");

const schema = new Schema({
    _id: String,
    title: String,
    description: String,
    questions: {
        all: Array,
        correct: String
    },
    created_by_id: String,
    theme: String,
    created: String
})
const cardModel = model('card', schema)

module.exports = cardModel
