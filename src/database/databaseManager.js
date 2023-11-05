const mongoose = require('mongoose')
const {readdirSync} = require("fs");
const path = require("path");

class databaseManager {
    constructor(app) {
        this.app = app
        this.config = this.app.config.properties
    }

    async init() {
        this.client = await mongoose.connect(this.config.mongo.authString.replace('<password>', this.config.mongo.authPassword), {
            dbName: this.app.config.properties.mongo.databaseName
        })

        let modelNames = readdirSync(path.join(__dirname, 'models')).filter(file => file.endsWith('.js'))
        this.models = new Map()
        for (const  file of modelNames) {
            const model = (require(`./models/${file}`))
            this.models.set(file.split('.')[0], model)
        }
    }

    async createNewCard(card) {
        const cardModel = this.models.get('card')
        try {
            const res = await cardModel.create(card)
            return {
                status: 'Success!',
                message: `Card with id of '${res._id}' was created!`
            }
        } catch (e) {
            if (e.name === 'ValidationError') {
                return {
                    status: 'Error',
                    message: Object.values(e.errors).map(val => val.message)
                }
            }
            if (e.code === 11000) {
                return {
                    status: 'Error',
                    message: 'Card with this id already exists!'
                }
            }
            return {
                status: 'Error',
                message: 'Some unhandled error!'
            }
        }
    }

    async getCardsWithTheme(theme) {
        const cardModel = this.models.get('card')
        try {
            const cards = await cardModel.find({
                theme: theme,
            })
            if (cards.length === 0) {
                return {
                    status: 'Error',
                    message: 'Cards with this theme were not found.'
                }
            }
            const cardWithoutAnswer = cards.map((card) => {
                card.questions.correct = undefined
                return card
            })
            return {
                status: "Success!",
                message: cardWithoutAnswer
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }

    async getCardCorrectAnswer(id) {
        const cardModel = this.models.get('card')
        try {
            const card = await cardModel.findOne({ _id: id })
            if (!card) {
                return {
                    status: 'Error',
                    message: 'Card with this is not found.'
                }
            }
            return {
                status: 'Success!',
                message: {
                    _id: card._id,
                    title: card.title,
                    correctAnswer: card.questions.correct
                }
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }

    async createNewTable(table){
        const tableModel = this.models.get('table')
        try {
            const newTable = await tableModel.create(table)
            return {
                status: 'Success!',
                message: {
                    tableID: newTable._id
                }
            }
        } catch (e) {
            if (e.name === 'ValidationError') {
                return {
                    status: 'Error',
                    message: Object.values(e.errors).map(val => val.message)
                }
            }
            if (e.code === 11000) {
                return {
                    status: 'Error',
                    message: 'Table with this id already exists!'
                }
            }
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }

    async getAllTables() {
        const tableModel = this.models.get('table')
        try {
            const tables = await tableModel.find()
            return {
                status: 'Success!',
                message: tables
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }

    async modifyTable(tableID, modifyList) {
        const tableModel = this.models.get('table')
        try {
            const table = await tableModel.findById(tableID)
            if (!table) {
                return {
                    status: 'Error',
                    message: 'There is no table with this id.'
                }
            }
            Object.keys(modifyList).forEach(function(key) {
                if (key in table) {
                    table[key] = modifyList[key];
                }
            })
            await table.save()
            return {
                status: 'Success!',
                message: 'Table was successfully updated!!'
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }

    async deleteTable(id) {
        const tableModel = this.models.get('table')
        try {
            const table = await tableModel.findOneAndDelete({_id: id})
            if (!table) {
                return {
                    status: 'Error',
                    message: 'There is no table with this id.'
                }
            }
            return {
                status: 'Success!',
                message: table
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }

    async deleteCard(id) {
        const cardModel = this.models.get('card')
        try {
            const card = await cardModel.findOneAndDelete({_id: id})
            if (!card) {
                return {
                    status: 'Error',
                    message: 'There is no card with this id.'
                }
            }
            return {
                status: 'Success!',
                message: card
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }

    async addTableUser(tableID, user) {
        const tableModel = this.models.get('table')
        try {
            const table = await tableModel.findOne({ _id: tableID })
            if (!table) {
                return {
                    status: 'Error',
                    message: 'There is no table with this id.'
                }
            }
            if (table.members.includes(user)) {
                return {
                    status: 'Error',
                    message: 'This table already has such user.'
                }
            }
            table.members.push(user)
            await table.save()
            return {
                status: 'Success!',
                message: 'User was successfully added!'
            }
        } catch (e) {
            console.log(e)
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }
}

module.exports = databaseManager