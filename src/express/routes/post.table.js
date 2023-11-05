class PostTable {
    constructor(app) {
        this.app = app
    }
    method = 'POST'
    path = '/table'

    async handleRequest(req, res) {
        const newTableResponse = await this.app.database.createNewTable(req.body.table)
        if (newTableResponse.message === 'Table with this id already exists!') {
            return res.status(409).json(newTableResponse)
        }
        if (newTableResponse.status === 'Error' && typeof newTableResponse.message === 'object') {
            return res.status(422).json(newTableResponse)
        }
        return res.status(200).json(newTableResponse)
    }
}

module.exports = PostTable