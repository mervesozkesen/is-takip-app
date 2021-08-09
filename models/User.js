//Burada şema oluşturcaz model oluşturmak için
//Ardındanda bu şemayı kullanarak model oluşturcaz

const mongoose =require('mongoose');
const {isEmail}=require('validator'); //validator ile isEmail modülü
const  bcrypt = require('bcrypt');
//Şema oluşturuyorum içerisine şema nesnesi ekledim
const  userSchema =new mongoose.Schema({
  email:{
      type:String,
      required:[true,'Mail adresini girmeniz zorunludur.'], //validation ile hataları düzeltiyoruz. String olması lazım[ilk deger true,ikinci olmayan mesaj]
      unique:true,
      lowercase:true,
      validate:[isEmail,'Lütfen geçerli bir mail adresi giriniz']
  },
   parola:{
       type:String,
       required:[true,'Mail adresini girmeniz zorunludur.'],
       minlength:[6,'Parolanız 6 karakterden uzun olmalıdır.']
   }
}); //Bu şemayı kullanarak model oluşturalım
//UserShemanın içindeki post metodu kaydedikten sonra çalışacak fonksiyonlar
// userSchema.post('save',function (doc,next){
//   console.log('kaydedildikten sonra çalışacak',doc);
//   next(); //işlemi devam ettirmek gerekir
// });


//keydedilmeden önce çalışacak fonksiyon
userSchema.pre('save', async function(next){
  //  console.log('kaydedilmeden çalışacak',this);
  const salt = await bcrypt.genSalt();
  this.parola=await bcrypt.hash(this.parola,salt);
    next();

});

userSchema.statics.login=async function(email,parola){
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(parola,user.parola);
    if (auth) {
      return user;
    }
    throw Error('parola-hatası');
  }
  throw Error('email-hatası');
}




//salt:biriktirmek
//bcrypt:şifreleme

const User = mongoose.model('user',userSchema);

module.exports=User;