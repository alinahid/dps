var fs =require('fs-extra');
const nodemailer = require('nodemailer');
var blobStream = require('blob-stream');
const path =require('path');
const express = require('express')
const admissionForm =require('../models/admissio_form')
const PDFDocument = require('pdfkit');
const router = new express.Router();
var auth = require('../../config/auth'); 
var isUser = auth.isUser;
var studentUser =require('../models/studentUser');
var mkdirp = require('mkdirp')
router.get("/admission",isUser,function(req,res){
   var User =req.user
   let errors=[]
   admissionForm.findOne({email:User.email},function(err,Student){
      if(err){
         console.log(err)
      }else{
         res.render('admission_from',{
            user:User,
            student:Student,
            errors:errors,
            
         })
      }
   })
  
})
router.post('/admission',function(req,res){
   let errors = [];
   user=req.user;
   if(req.files){

      var file =req.files.image
       
      var fileName=file.name
      file.mv(__dirname+'/file/'+fileName)
     }else{
         errors.push('please upload the documents')
     }
      
   const ad_class = req.body.Class;
   const fullname = req.body.fullname
   const dob = req.body.dob;
   const dob_day = req.body.dob_day;
   const dob_Month = req.body.dob_Month;
   const dob_year = req.body.dob_year;
   const  nationality = req.body.nationality;
   const  Religion= req.body.Religion;
   const gender = req.body.gender;
   const fatherName = req.body.fatherName;
   const father_Occupation = req.body.father_Occupation;
   const  father_Designation = req.body.father_Designation;
   const father_Annual_Income = req.body.father_Annual_Income;
   const father_work = req.body.father_work;
   const father_qual = req.body.father_qual;
   const father_contact = req.body.father_contact;
   const motherName = req.body.motherName;
   const mother_Occupation = req.body.mother_Occupation;
   const mother_Designation = req.body.mother_Designation;
   const mother_Annual_Income = req.body.mother_Annual_Income;
   const mother_work = req.body.mother_work;
   const mother_qual = req.body.mother_qual;
   const mother_contact = req.body.mother_contact;
   const home = req.body.home;
   const state = req.body.state;
   const country = req.body.country;
   const present_address = req.body.present_address;
   const permanent_address = req.body.permanent_address;
   const one_name = req.body.one_name;
   const one_admsn = req.body.one_admsn;
   const one_class = req.body.one_class;
   const one_Sec = req.body.one_Sec;
   const two_name = req.body.two_name;
   const two_admsn = req.body.one_admsn;
   const two_class = req.body.two_class;
   const two_Sec = req.body.two_Sec;
   const info = req.body.info;
   const prev_school = req.body.prev_school ;
   const prev_class= req.body.prev_class;
   const prev_position= req.body.prev_position;
   const prev_medium= req.body.prev_medium;
   const skills= req.body.skills;
   const skills_certificate= req.body.skills_certificate;
   const prev_result= req.body.prev_result;
   
   const AdmissionForm = new admissionForm({
      name :fullname,
      email:user.email,
      Admission_class:ad_class ,
      dob :dob,
      dob_day:dob_day,
      dob_month:dob_Month,
      dob_year:dob_year,
      nationality:nationality,
      Religion:Religion,
      Gender: gender,
      father:{
         name:fatherName,
         Occupation:father_Occupation,
         Designation:father_Designation,
         annualIncome:father_Annual_Income,
         organisationsNameAndAddress:father_work ,
         academicQualification : father_qual,
         PhoneNo :father_contact
      },
      mother:{
         name:motherName,
         Occupation:mother_Occupation,
         Designation:mother_Designation,
         annualIncome:mother_Annual_Income,
         organisationsNameAndAddress:mother_work ,
         academicQualification :mother_qual,
         PhoneNo :mother_contact
      },
      address1:{
         town :home,
         state :state,
         country:country
      },
      address2:{
         present: present_address,
         permanent :permanent_address ,

      },
      sibling:{
         one :{
            name:one_name,
            admsnNo:one_admsn ,
            class:one_class,
            sec:one_Sec
         },
         two :{
            name:two_name,
            admsnNo:two_admsn ,
            class:two_class,
            sec:two_Sec
         }
      },
      Any_other_info:info ,
      studentPic :fileName,
      prev_school :prev_school,
      prev_class:  prev_class,
      prev_position:prev_position,
      prev_medium:prev_medium,
      skills:skills,
      skills_certificate:skills_certificate,
      prev_result:prev_result
   })
   if (!ad_class || !fullname || !dob|| !dob_day|| !dob_Month|| !dob_year|| !nationality|| !Religion||
       !gender|| !fatherName|| !father_Occupation|| !father_Designation|| !father_Annual_Income|| !father_work||
        !father_qual|| !father_contact|| !motherName|| !mother_Occupation|| !mother_Designation|| !mother_Annual_Income  || !mother_work 
        || !mother_qual|| !mother_contact|| !home|| !state|| !country|| !present_address || !permanent_address|| !one_name||!one_admsn
        || !one_class|| !one_Sec|| !two_name || !two_admsn|| !two_class|| !two_Sec|| !info|| !prev_school|| !prev_class|| !prev_position
        || !prev_medium|| !skills|| !skills_certificate|| !prev_result ) {
      errors.push({ msg: 'Please enter all fields!!' });
  }
  if (errors.length > 0) {
      var User =req.user
      admissionForm.findOne({email:User.email},function(err,Student){
         if(err){
            console.log(err)
         }else{
            res.render('admission_from',{
               user:User,
               student:Student,
               errors:errors,
               father_Designation,ad_class,fullname ,dob,dob_day,dob_Month,dob_year,father_work,father_Annual_Income,father_qual,
               nationality,Religion,gender,fatherName,father_Occupation,father_Designation,father_contact,motherName,
               mother_Occupation,mother_Designation,mother_qual,mother_work ,mother_contact,state,home,present_address,
               permanent_address,one_class,one_name,one_admsn,one_Sec,two_name,two_admsn,two_class,two_Sec,info,prev_school,
               prev_class,prev_position,prev_medium,skills,skills_certificate,prev_result
            })
         }
      })
}else{
   var User =req.user
   studentUser.findOneAndUpdate({email:User.email},{submit:true},function(err){
      if(err){
         console.log(err)
      }else{
         AdmissionForm.save((err)=>{
            if(err){
               console.log(err)
            }else{
               res.render('/admission')
            }
         });
      }
     
   })
   
   
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: "nahidali412@gmail.com",
          pass: "8824722331",
      },
  });
  const email =user.email
  const mailOptions = {
   from: '"Auth Admin" <nahidali412@gmail.com>', // sender address
   to: email, // list of receivers
   subject: "Account Verification: NodeJS Auth ✔", // Subject line
   html: `<h1> Your form is under review`, // html body
};

transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
       console.log(error);
       req.flash(
           'error_msg',
           'Something went wrong on our end. Please register again.'
       );
       res.redirect('/auth/login');
   }
   else {
       console.log('Mail sent : %s', info.response);
       req.flash(
           'success_msg',
           'Activation link sent to email ID. Please activate to log in.'
       );
       res.send('success');
   }
})
}
  


})
 
router.get('/admissionPdf/:id',function(req,res){
   var id =req.params.id;
   admissionForm.findById(id,(err,user)=>{
      if(err){
         console.log(err)
      }
      else{
         var n=user.name;
         const doc = new PDFDocument;
         doc.pipe(fs.createWriteStream(n+'.pdf'));
          
         // Add an image, constrain it to a given size, and center it vertically and horizontally
         doc.image(__dirname+'/file/dps-admission-form-page-002-m.jpg',0,0, {
             fit:[615,785],
             align: 'center',
             valign: 'center'
          })
          .image(__dirname+'/file/'+user.studentPic,485,125,{fit:[100,100]})
          .fontSize(15)
          .text(user.Admission_class,175,205)
          .text(user.name,175,235)
          .text(user.dob,225,270)
          .text(user.dob_day,80,305)
          .text(user.dob_month,300,305)
          .text(user.dob_year,450,305)
          .text(user.nationality,145,340)
          .text(user.Religion,270,340)
          .text(user.Gender,510,340)
          .text(user.father.name,150,375)
          .text(user.father.Occupation,95,410)
          .text(user.father.Designation,270,410)
          .text(user.father.annualIncome,470,410)
          .text(user.father.organisationsNameAndAddress,170,445)
          .text(user.father.academicQualification,160,510)
          .text(user.father.PhoneNo,140,545)
          .text(user.mother.name,150,580)
          .text(user.mother.Occupation,105,615)
          .text(user.mother.Designation,270,615)
          .text(user.mother.annualIncome,470,615)
          .text(user.mother.organisationsNameAndAddress,170,645)
          .text(user.mother.academicQualification,160,675)
          .text(user.mother.PhoneNo,140,700);

          doc.addPage()
            .image(__dirname+'/file/dps-admission-form-page-001-m.jpg',0,0, {
            fit:[615,800],
            align: 'center',
            valign: 'center'
         })
            .fontSize(15)
            .text(user.address1.town,125,55)
            .text(user.address1.state,315,55)
            .text(user.address1.country,500,55)
            .text(user.address2.present,175,85)
            .text(user.address2.permanent,175,190)
            .text(user.sibling.one.name,50,305)
            .text(user.sibling.one.admsnNo,200,305)
            .text(user.sibling.one.class,320,305)
            .text(user.sibling.one.sec,440,305)
            .text(user.sibling.one.name,50,335)
            .text(user.sibling.one.admsnNo,200,335)
            .text(user.sibling.one.class,320,335)
            .text(user.sibling.one.sec,440,335)
            .text(user.Any_other_info,50,400)
            // .image(__dirname+'/file/'+user.fatherSign,485,125,{fit:[100,100]})
            // .image(__dirname+'/file/'+user.motherSign,485,125,{fit:[100,100]})
            .fontSize(10)
            .text(user.prev_school,200,630)
            .text(user.prev_class,320,645)
            .text(user.prev_position,370,660)
            .text(user.prev_medium,350,675)
            .text(user.skills,400,690);
          
         doc.end();
         res.send('success')
          
      }
   })
   
   
})

router.get('/formlist',function(req,res){
   admissionForm.find({},function(err,users){
      res.render('form_list',{
         Users:users
      })
   })
})
router.get('/form/approve/:id',function(req,res){
   const id = req.params.id;
   admissionForm.findById(id,function(err,user){
      if(err){
         console.log(err)
      }else{
         var email=user.email
         studentUser.findOneAndUpdate({email:email},{approved:true},function(err){
            if(err){
               console.log(err)
            }else{
               const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      user: "nahidali412@gmail.com",
                      pass: "8824722331",
                  },
              });
               
              const mailOptions = {
               from: '"Auth Admin" <nahidali412@gmail.com>', // sender address
               to: user.email, // list of receivers
               subject: "Account Verification: NodeJS Auth ✔", // Subject line
               html: `<h1> approved</h1>`, // html body
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
               if (error) {
                   console.log(error);
                   req.flash(
                       'error_msg',
                       'Something went wrong on our end. Please register again.'
                   );
                   res.redirect('/auth/login');
               }
               else {
                   console.log('Mail sent : %s', info.response);
                   req.flash(
                       'success_msg',
                       'Activation link sent to email ID. Please activate to log in.'
                   );
                   res.send('success');
               }
            })
            }
         })
         
      
      }
   })
})
router.get('/form/delete/:id',function(req,res){
   var id =req.params.id;
   admissionForm.findByIdAndDelete(id,function(err){
      if(err){
         console.log(err)
      }else{
         res.redirect('/formlist')
      }
   })
})
router.get('/form/:id',function(req,res){
   var id=req.params.id;
   admissionForm.findById(id,function(err,user){
      if(err){
         console.log(err)
      }else{
         res.render('form',{student:user})
      }
   })
  
})

module.exports=router;
