const jwtoken = require('jsonwebtoken');
const User =require('../models/User');



const authKontrol=(req,res,next)=>{
    const token= req.cookies.jwt;

    if(token) {
        jwtoken.verify(token,'mervetem',(err,result)=>{
            if(err) {
              //  console.log(err.message);
                res.redirect('/login');
                //redirect:yönlendirmek
            }else{
               // console.log(result);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

const kullaniciKontrol=(req,res,next)=>{
       const token = req.cookies.jwt;
       if (token) {
           jwtoken.verify(token,'mervetem',async (err,result)=>{
               if(err) {
                   res.locals.user=null;
                   next();
               }else{
                   let user =await User.findById(result.id);
                   res.locals.user=user;
                   next();
               }
           })
       }
       else {
           res.locals.user=null;
           next();
       }
}
module.exports={authKontrol,kullaniciKontrol}