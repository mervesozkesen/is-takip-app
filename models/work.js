const mongoose= require('mongoose');

const workSchema = new mongoose.Schema({
  baslik:{
      type:String,
      required:true
  },
  aciklama:{
      type:String
  },
  baslamaZamani:{
      type:Date
  },
  bitisZamani:{
      type:Date
  },
  kullaniciId:{
      type:String
  }

})
module.exports=mongoose.model('Work',workSchema);