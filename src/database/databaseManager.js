const mongoose = require('mongoose')
const {readdirSync} = require("fs");

class databaseManager {
    constructor(app) {
        this.app = app
        this.config = this.app.config.properties
    }

    async init() {
        this.client = await mongoose.connect(this.config.mongo.authString.replace('<password>', this.config.mongo.authPassword))
        let modelNames = readdirSync('./src/database/models').filter(file => file.endsWith('.js'))
        this.models = new Map()
        for (const  file of modelNames) {
            const model = (require(`./models/${file}`))
            this.models.set(file.split('.')[0], model)
        }
    }
}

module.exports = databaseManager