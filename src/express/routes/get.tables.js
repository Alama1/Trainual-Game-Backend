class GetTables {
    constructor(app) {
        this.app = app
    }
    method = 'GET'
    path = '/tables'

    async handleRequest(req, res) {
        const getTablesResponse = await this.app.database.getAllTables()
        if (getTablesResponse.status === 'Error') {
            return res.status(500).json(getTablesResponse)
        }
        return res.status(200).json(getTablesResponse)
    }
}

module.exports = GetTables