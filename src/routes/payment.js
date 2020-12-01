 

const Payment =require('../models/payment')
const express=require('express');
const router = new express.Router();


router.get('/payment', function(req,res){
    res.render('payment');
  })

router.post('/payment',function(req,res){
    var name =req.body.name;
    var std =req.body.class;
    var ad_no =req.body.ad_no;
    var order_id =req.body.order_id;
    var email =req.body.email;
    const payment =new Payment({
        name:name,
        class:std,
        ad_no:ad_no,
        email:email,
        order_id:order_id
    })
    payment.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('sucess')
        }
    });
})
  module.exports=router;