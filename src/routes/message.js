var express=require('express')
 
var auth = require('../../config/auth'); 
var Message = require('../models/message');
const { Router } = require('express');
const fs = require('fs-extra');
 
var router = express.Router();
var isAdmin = auth.isAdmin;

router.get('/',isAdmin,function(req,res){
    res.render('admin_message')
})
router.get('/principal_msg',isAdmin,function(req,res){
    Message.findOne({name:"msg"},function(err,msg){
        if(err){
            res.send('somethimg went wrong')
        }else{
            res.render('show_p_msg',{msg:msg})
        }
    })
    
})
router.get('/add_principal_message',isAdmin,function(req,res){
    res.render('add_principal_message')
})
router.post('/add_principal_message',function(req,res){
    var heading=req.body.heading
    var body =req.body.body
    console.log(body)
    Message.findOne({name:'msg'},function(err,msgg){
        if(err){
            console.log(err)
        }else{
            if(msgg==null){
                var msg = new Message({
                    name:'msg',
                    principal:{
                        heading:heading,
                        body:body
                    }
                     
                })
                msg.save(function(err){
                    if(err){
                        res.send('something went wrong please try again')
                    }else{
                        res.redirect('/admin_message/principal_msg')
                    }
                })
            }else{
               
                Message.findOneAndUpdate({name:'msg'},{
                    principal:{
                        heading:heading,
                        body:body
                    },
                },function(err){
                    if(err){
                        res.send('something went wrong please try again')
                    }else{
                        res.redirect('/admin_message/principal_msg')
                    }
                })
            }
           
        }
    })
})
router.get('/director_msg',isAdmin,function(req,res){
    Message.findOne({name:"msg"},function(err,msg){
        if(err){
            res.send('somethimg went wrong')
        }else{
            res.render('show_d_msg',{msg:msg})
        }
    })
    
})
router.get('/add_director_message',isAdmin,function(req,res){
    res.render('add_director_message')
})
router.post('/add_director_message',function(req,res){
    var heading=req.body.heading
    var body =req.body.body
    console.log(body)
    Message.findOne({name:'msg'},function(err,msgg){
        if(err){
            console.log(err)
        }else{
            if(msgg==null){
                var msg = new Message({
                    name:'msg',
                    director:{
                        heading:heading,
                        body:body
                    }
                     
                })
                msg.save(function(err){
                    if(err){
                        res.send('something went wrong please try again')
                    }else{
                        res.redirect('/admin_message/director_msg')
                    }
                })
            }else{
               
                Message.findOneAndUpdate({name:'msg'},{
                    director:{
                        heading:heading,
                        body:body
                    },
                },function(err){
                    if(err){
                        res.send('something went wrong please try again')
                    }else{
                        res.redirect('/admin_message/director_msg')
                    }
                })
            }
           
        }
    })
})
module.exports = router;