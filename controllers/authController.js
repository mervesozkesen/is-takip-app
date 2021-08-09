//Signup ile kayıt oluyor
//loginde ise veritabanı kontrol ediliyor
//veritabanı bağlantısı async olmak zorunda o yüzden bu fonksiyonları async olarak ayarlamalıyız 
const User =require('../models/User');
const jtw = require('jsonwebtoken');


const hataYakala=(err)=>{
    
    let errors= {email:'',parola:''};
    if(err.code===11000){
        errors.email="Bu mail adresi veritabanında bulunuyor";
        return errors;
    }
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
             errors[properties.path]=properties.message;
        });
    }
    if (err.message === 'email-hatası') {
        errors.email ='Email adresini yanlış girdiniz';
    }
    if (err.message === 'parola-hatası') {
        errors.parola ='Şifrenizi yanlış girdiniz';
    }
    return errors;
}
//token oluşturma
const maxAge = 3*24*60*60*1000;
const  createToken=(id)=>{
  return jtw.sign({id},'mervetem',{
  expiresIn:maxAge
});
}





module.exports.signup_get=(req,res)=>{

    res.render('signup');
}
module.exports.login_get=(req,res)=>{
    res.render('login');
}

module.exports.signup_post =async (req,res)=>{
    const {email,parola}=req.body;
    //console.log(email,parola);
    try{
        const user = await User.create({email,parola});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge});
        res.status(201).json(user);
    } catch (error) {
      //  res.status(400).send('hata oluştuğu için kullanıcı oluşmadı'+error);
     const errors =  hataYakala(error);
     res.status(400).json({errors});
    }
  //  res.send('yeni kullanıcı');
}
module.exports.login_post =async (req,res)=>{
    const {email,parola}=req.body;
        try {
            const user =await User.login(email,parola);
            const token =createToken(user._id);
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge});
            res.status(200).json({user:user._id});
        } catch (error) {
            const errors = hataYakala(error);
            res.status(400).json({errors});
        }



    //console.log(email,parola);
   // res.send('kullanıcı giriş');
}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','çıkış yapıldı',{maxAge:1});
    res.redirect('/');
}

//token içerisinde kullanıcı bilgisini tutuyoruz.