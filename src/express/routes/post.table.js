class PostTable {
    constructor(app) {
        this.app = app
    }
    method = 'POST'
    path = '/table'

    async handleRequest(req, res) {
        const newTableResponse = await this.app.database.createNewTable(req.body.table)
        //TODO status management
        return res.status(200).json(newTableResponse)
    }
}

module.exports = PostTable