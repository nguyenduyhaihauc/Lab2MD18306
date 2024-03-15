const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Distributor = new Scheme({
    name: {type: String}
}, {
    timestamps: true
})

module.exports = mongoose.model('distributor', Distributor)