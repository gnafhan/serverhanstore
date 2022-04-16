const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
  index: async(req, res)=> {
      try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = {message: alertMessage, status: alertStatus}
      const voucher = await Voucher.find({})
        .populate('category')
        .populate('nominals')
          res.render('admin/voucher/view_voucher',{
              voucher,
              alert
          })
      } catch (err) {
        console.error(err)
          req.flash('alertMessage', `${err.message}`)
          req.flash('alertStatus', 'danger')
          res.redirect('/voucher')
      }
  },
  viewCreate: async(req, res)=> {
      try {
        let category = await Category.find()
        const nominal = await Nominal.find()
          res.render('admin/voucher/create', {category, nominal})
      } catch (err) {
          req.flash('alertMessage', `${err.message}`)
          req.flash('alertStatus', 'danger')
          res.redirect('/voucher')
      }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body

      if(req.file){
        let tmp_path= req.file.path;
        let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)

        src.on('end', async ()=>{
          try {

            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnial: filename
            })

            await voucher.save();

            req.flash('alertMessage', "Berhasil tambah voucher")
            req.flash('alertStatus', "success")
      
            res.redirect('/voucher')
            
          } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
          }
        })
      }else{
        const voucher = new Voucher({
          name,
          category,
          nominals,
        })

        await voucher.save();

        req.flash('alertMessage', "Berhasil tambah voucher")
        req.flash('alertStatus', "success")
  
        res.redirect('/voucher')
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  },
  // viewEdit: async(req, res)=> {
  //     try {
  //         const { id } = req.params

  //         const category = await Category.findOne({_id: id})
          

  //         res.render('admin/category/edit', {
  //             category
  //         })

  //     } catch (err) {
  //          req.flash('alertMessage', `${err.message}`)
  //         req.flash('alertStatus', 'danger')
  //         res.redirect('/category')
  //     }
  // },
  // actionEdit: async(req, res)=> {
  //     try {
  //         const { id } = req.params
  //         const {name} = req.body

          
  //         const category = await Category.findByIdAndUpdate({
  //             _id: id
  //         }, {name})

  //         req.flash('alertMessage', 'Berhasil ubah kategori')
  //         req.flash('alertStatus', 'success')
  //         res.redirect('/category')

  //     } catch (err) {
  //          req.flash('alertMessage', `${err.message}`)
  //         req.flash('alertStatus', 'danger')
  //         res.redirect('/category')
  //     }
  // },
  // actionDelete: async(req, res)=> {
  //     try {
  //         const { id } = req.params

  //         const category = await Category.findByIdAndDelete({
  //             _id: id
  //         })

  //         req.flash('alertMessage', 'Berhasil hapus kategori')
  //         req.flash('alertStatus', 'success')
  //         res.redirect('/category')
  //     } catch (err) {
  //          req.flash('alertMessage', `${err.message}`)
  //         req.flash('alertStatus', 'danger')
  //         res.redirect('/category')
  //     }
  // },
}