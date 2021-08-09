const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser =require('cookie-parser');
const {authKontrol,kullaniciKontrol} = require('./middleware/authMiddleware');
const workRoutes = require('./routes/workRoutes');

const app = express(); //Bir application oluşturdum.

//middle ware
app.use(express.static('public')); //klasörleri çalıştırmak için
app.use(express.json());
app.use(cookieParser());


app.set('view engine','ejs');

const dbURI='mongodb+srv://merve:mervemerve@cluster1.meuvo.mongodb.net/isTakipDB?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then((result)=>app.listen(3000,()=>{
console.log('db bağlantısı başarılı,server dinleniyor');

}))
.catch((err)=>console.log(err));


app.get('*',kullaniciKontrol);
app.get('/',authKontrol,(req,res)=>res.render('home'));
//app.get('/works',authKontrol,(req,res)=>res.render('works'));

app.use(authRoutes); //Router larsonucu çalışacak view dosyalarına ihtiyaç var
app.use(workRoutes);

//COOKİE OLUŞTURMA
//app.get('/set-cookie',(req,res)=>{
//   res.setHeader('Set-Cookie','yeni-true');
//   res.send('Cookie oluştu'); 
//});

app.get('/set-cookie',(req,res)=>{
  res.cookie('yeni',false);
  res.cookie('parola','12345',{maxAge:1000*60*60*24,httpOnly:true});
  res.send('Cookie Oluştuu');
});
//Cookie çağırma işlemi-erişme işlmei
app.get('/get-cookie',(req,res)=>{
   const cookies = req.cookies;
   console.log(cookies.yeni);
   res.json(cookies);

  });