var express=require('express')
var mkdirp = require('mkdirp');
 
var auth = require('../../config/auth'); 
const { Router } = require('express');
const fs = require('fs-extra');
var router = express.Router();
var isAdmin = auth.isAdmin;
 
const category = require('../models/gallery_catergory');
const pic =require('../models/gallery_pic')

router.get('/',isAdmin,function(req,res){
    category.find({},function(err,categories){
        if(err){
            console.log(err)
        }else{
            pic.find({},function(err,pics){
                if(err){
                    console.log(err)
                }else{
                    res.render('edit_gallery',{categories,pics})
                }
            })
        }
    })
     
})
router.get('/add_category',isAdmin,function(req,res){
    res.render('add_category')
})
router.post('/add_category',function(req,res){
    if(req.files){
        var file =req.files.thumb
        var name =file.name
        var title = req.body.title
        const add_category= new category({
            title:title,
            picname: name
        })
        add_category.save();
        mkdirp('public/files/gallery/'+title )
        file.mv('public/files/gallery/'+title+'/'+name,function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect('/admingallery')
            }
        })
    }else{
        res.redirect('/admingallery/add_category')
    }
})
router.get('/add_pic',isAdmin,function(req,res){
    category.find({},function(err,user){
        if(err){
            console.log(err)
        }else{
            res.render('add_pic',{categories:user})
        }
    })
})
router.post('/add_pic',function(req,res){
    if(req.files){
        var file=req.files.pic
        var name=file.name
        var category =req.body.category
        var newpic= new pic({
            category:category,
            picname:name
        })
        newpic.save()
        file.mv('public/files/gallery/'+category +'/'+name,function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect("/admingallery")
            }
        })
    }else{
        res.redirect('/admingallery/add_pic')
    }
})
router.get('/deletepic/:id',function(req,res){
    var id = req.params.id
    pic.findById(id,function(err,pic){
        if(err){
            console.log(err)
        }else{
            var name=pic.picname
            var category = pic.category
            fs.remove('public/files/gallery/'+category+'/'+name)
        }
    })
    pic.findByIdAndDelete(id,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/admingallery')
        }
    })
})
router.get('/deletecategory/:id',function(req,res){
    var id =req.params.id
    category.findById(id,function(err,category){
        if(err){
            console.log(err)
        }else{
            var name= category.title
            fs.remove('public/files/gallery/'+name)
            pic.find({category:name},function(err,pics){
                if(err){
                    console.log(err)
                }else{
                    pics.forEach(function(pi){
                        pic.findOneAndDelete({category:pi.category},function(err){
                            if(err){
                                console.log(err)
                            } 
                        })
                    })
                }
            })
        }
    })
    category.findByIdAndDelete(id,function(err){
        if(err){
            console.log(err)
        }else{res.redirect('/admingallery')}
    })

})
module.exports = router;