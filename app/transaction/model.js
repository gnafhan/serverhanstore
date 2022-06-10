const mongoose = require('mongoose')
let transactionSchema = mongoose.Schema({
    historyVoucherTopup : {
        gameName: {type: String, required: [true, 'nama game harus diisi']},
        category: {type: String, required: [true, 'kategori harus diisi']},
        thumbnail: {type: String},
        coinName: {type: String, required: [true, 'nama koin harus diisi']},
        coinQuantity: {type: String, required: [true, 'jumlah koin harus diisi']},
        price: {type: Number},
    },

    historyPayment : {
        name: {type: String, required: [true, 'nama  harus diisi']},
        type: {type: String, required: [true, 'tipe pembayaran  harus diisi']},
        nameBank: {type: String, required: [true, 'nama bank  harus diisi']},
        noRekening: {type: String, required: [true, 'nomer rekening  harus diisi']},
    },

    name: {
        type: String,
        required: [true, 'nama harus diisi'],
        maxLength: [225, 'nama tidak boleh lebih dari 225 karakter'],
        minLength: [3, 'nama minimal 3 karakter']
    },

    accountUser: {
        type: String,
        required: [true, 'nama akun harus diisi'],
        maxLength: [225, 'nama tidak boleh lebih dari 225 karakter'],
        minLength: [3, 'nama minimal 3 karakter']
    },

    tax: {
        type: Number,
        default: 0
    },

    value: {
        type: Number,
        default : 0
    },

    status : {
        type : String,
        enum : ['pending', 'success', 'failed'],
        default : 'pending',
    },

    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },

    historyUser: {
        name: {type: String, required: [true, 'nama player harus diisi']},
        phoneNumber: {
            type: Number,
            required: [true, 'nomor telepon harus diisi'],
            maxLength: [13, 'nomor telepon tidak boleh lebih dari 13 karakter'],
            minLength: [10, 'nomor telepon minimal 10 karakter']
        },
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    banks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Bank'
    }]
},{ timestamps : true})

module.exports = mongoose.model('Transaction', transactionSchema)