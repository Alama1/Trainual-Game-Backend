const fs = require('fs')
require('dotenv').config()

class Config {
    properties = {
        mongo: {
            authString: 'mongodb+srv://Trainual-Game-Backend:<password>@cluster0.4palghz.mongodb.net/?retryWrites=true&w=majority',
            authPassword: '',
            databaseName: 'test'
        },
        express: {
            port: '3000'
        }
    }
    constructor() {
        if (fs.existsSync('config.json')) {
            console.log('Config found, getting the data.')
            this.properties = require('../config.json')
        } else {
            console.log('Config not found! Using default values.')
        }
        this.properties.mongo.authPassword = process.env.MONGO_PASSWORD
        this.properties.express.port = process.env.EXPRESS_PORT
    }
}

module.exports = Config