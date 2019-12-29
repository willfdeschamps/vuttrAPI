const {getAll} = require('./getAll')
const {remove} = require('./remove')
const {insertHandler} = require('./insert')

module.exports = {
    getAll,
    insert : insertHandler,
    remove
}