const mongoose = require('mongoose')
let nominalSchema = mongoose.Schema({
    coinQuantity : {
        type : Number,
        default : 0
    },
    coinName : {
        type : String,
        require : [true, 'nama koin harus diisi']
    },
    price : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('nominal', nominalSchema)