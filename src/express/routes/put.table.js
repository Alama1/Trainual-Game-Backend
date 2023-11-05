class PutTable {
    constructor(app) {
        this.app = app
    }
    method = 'PUT'
    path = '/table'

    async handleRequest(req, res) {
        const newTable = await this.app.database.modifyTable(req.body.table, req.body.modify)
        if (newTable.message === 'There is no table with this id.') {
            return res.status(409).json(newTable)
        }
        return res.status(200).json(newTable)
    }
}

module.exports = PutTable