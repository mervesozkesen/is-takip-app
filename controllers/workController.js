const Work = require('../models/Work');


module.exports.work_add_get=(req,res)=>{
res.render('work-add');

}
module.exports.work_add_post = async (req,res)=>{
    const {baslik,aciklama,baslama,bitis}=req.body;
    

    try {
        const work = await Work.create({
           baslik,aciklama,baslamaZamani:new Date(baslama),bitisZamani:new
           Date(bitis),kullaniciId:res.locals.user._id 
        });
        res.status(200).json({work:work._id});
    } catch (error) {
        res.status(400).json({error});
    }
}
module.exports.works_get=(req,res)=>{

    Work.find({'kullaniciId':res.locals.user._id}).then((result)=>{
     res.render('works',{isler:result});

    })
}