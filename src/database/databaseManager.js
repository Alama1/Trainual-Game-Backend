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
        this.db = this.client.connection

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
            console.log(e)
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
            return {
                status: "Success!",
                message: cards
            }
        } catch (e) {
            console.error(e)
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
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }
}

module.exports = databaseManager