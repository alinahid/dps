var express=require('express')
 
var auth = require('../../config/auth'); 
var Notice = require('../models/notice');
const { Router } = require('express');
const fs = require('fs-extra');
var router = express.Router();
var isAdmin = auth.isAdmin;
 
router.get('/admin/upload',isAdmin, function (req, res) {
  res.render('file_upload')
})
router.post('/admin/upload',function(req,res){
  
  
  if(req.files){

    var file =req.files.sampleFile
    var fileName=file.name
     
    var title=req.body.title
    var notice = new Notice({
      title: fileName,
      name: title,
      
    });
    notice.save();
  }file.mv("public/files/notices/"+ fileName,function(err){
    if(err){
      res.send(err)
    }else{
      res.redirect('/notice/admin/notice')
    }
  })
})

 
router.get('/:name',function(req,res){
    var file='public/files/notices/'+req.params.name;
    res.download(file);
  })
router.get('/',function(req,res){
    Notice.find({},function(err,notices){
      res.render('test',{
        notices:notices,
        title: "Notices | DPS Pakur"
      }
      
      )
      
    })
    
  })
  router.get('/admin/notice',isAdmin,function(req,res){
    Notice.find({},function(err,notices){
      res.render('admin_notice',{
        notices:notices
      }
      
      )
      
    })
    
  })
  router.get('/delete/:id',function(req,res){
    var id =req.params.id
    Notice.findOne({_id:id},function(err,user){
      var file='public/files/notices/'+user.title;
      fs.remove(file);
    })
    Notice.findByIdAndRemove(id, function (err) {
      if(err){
        res.send(err)
      }else{
        res.redirect('/notice/admin/notice')
      }
    });
    
  })
  module.exports = router;