const {Router} = require('express');
const authController=require('../controllers/authController');

const router =Router();

router.get('/signup',authController.signup_get);
router.post('/signup',authController.signup_post);


router.get('/login',authController.login_get);
router.post('/login',authController.login_post);

router.get('/logout',authController.logout_get);

module.exports=router; //dışarı aktarma
//router:yönlendirme
//Routerlar bizi yönlendircek ve yönlendirme sonucundada doğru controller çalışacak ve veritabanı işlemleri halledilecek.