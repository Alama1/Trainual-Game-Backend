class DeleteTable {
    constructor(app) {
        this.app = app
    }
    method = 'DELETE'
    path = '/table'

    async handleRequest(req, res) {
        const deleteTableResponse = await this.app.database.deleteTable(req.query.id)
        if (deleteTableResponse.message === 'There is no table with this id.') {
            return res.status(409).json(deleteTableResponse)
        }
        return res.status(200).json(deleteTableResponse)
    }
}

module.exports = DeleteTable