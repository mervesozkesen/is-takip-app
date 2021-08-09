const {Router} = require('express');
const workController = require('../controllers/workController');
const {authKontrol, kullaniciKontrol} = require('../middleware/authMiddleware');


const router = Router();
router.get('/work-add',authKontrol,workController.work_add_get);
router.post('/work-add',kullaniciKontrol,workController.work_add_post);
router.get('/works',authKontrol,workController.works_get);


module.exports = router;