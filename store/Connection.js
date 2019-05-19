const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://puc_hugo:puc_hugo@cluster0-iot04.mongodb.net/pucminas?retryWrites=true'

const openConnection = () => mongoose.connect(connectionString)

module.exports = {
    openConnection,
}