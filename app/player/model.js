
const mongoose = require('mongoose')
let playerSchema = mongoose.Schema({
    email : {
        type : String,
        require : [true, 'email harus diisi']
    },
    name : {
        type : String,
        require : [true, 'nama harus diisi'],
        minlength : [3, 'nama minimal 3 karakter'],
        maxlength : [225, 'nama maksimal 225 karakter']
    },
    username : {
        type : String,
        require : [true, 'nama harus diisi'],
        minlength : [3, 'username minimal 3 karakter'],
        maxlength : [225, 'username maksimal 225 karakter']
    },
    password : {
        type : String,
        require : [true, 'password harus diisi'],
        minlength : [3, 'nama minimal 3 karakter'],
        maxlength : [225, 'nama maksimal 225 karakter']
    },
    role : {
        type : String,
        enum : ['admin', 'user'],
        default : 'user',
    },
    status : {
        type : String,
        enum : ['Y', 'N'],
        default : 'Y',
    },
    avatar :{
        type : String,
    },
    filename : {
        type : String,
    },
    phoneNumber : {
        type : String,
        require : [true, 'nomor telepon harus diisi'],
        minlength : [9, 'nomor telepon minimal 3 karakter'],
        maxlength : [13, 'nomor telepon maksimal 13 karakter']
    },

    favorite : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    }
    
}, { timestamps : true})

module.exports = mongoose.model('Player', playerSchema)