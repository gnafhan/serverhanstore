const mongoose = require('mongoose')
let nominalSchema = mongoose.Schema({
    name : {
        type : String,
        require : [true, 'nama pemilik harus diisi']
    },
    nameBank : {
        type : String,
        require : [true, 'nama Bank harus diisi']
    },
    noRekening : {
        type : String,
        require : [true, 'nomor rekening harus diisi']
    },
    
})

module.exports = mongoose.model('Bank', nominalSchema)