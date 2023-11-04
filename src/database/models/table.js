const {Schema, model} = require("mongoose");

const schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, 'Table id is required.']
        },
        created_by: {
            type: String,
            required: [true, 'You need to specify who created this table.']
        },
        members: {
            type: Array
        },
        name: {
            type: String,
            required: [true, 'Table name is required.']
        }
    }
)


const tableModel = model('tables', schema)

module.exports = tableModel
