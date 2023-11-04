const {MongoClient, ServerApiVersion} = require("mongodb");

class databaseManager {
    constructor(app) {
        this.app = app
        this.config = this.app.config.properties
        this.client = new MongoClient(this.config.mongo.authString.replace('<password>', this.config.mongo.authPassword), {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })
    }

    async init() {
        try {
            await this.client.connect();
            await this.client.db("test").command({ping: 1});
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            await this.client.close();
        }
    }
}

module.exports = databaseManager