const express = require('./express/expressManager.js')
const config = require('./Config.js')
const database = require('./database/databaseManager.js')
class application {
    async register() {
        this.express = new express(this)
        this.config = new config()
        this.database = new database(this)
    }
    async connect() {
        this.express.init()
        this.database.init()
    }
}

module.exports = new application()