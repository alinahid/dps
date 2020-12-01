const http = require('http');
const ejs =require('ejs');
const express=require('express')
const app =express();
const path =require('path')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const session = require('express-session')
const noticeRouter= require('./src/routes/notice')
var Notice= require('./src/models/notice')
const userRouter = require('./src/routes/user')
const admission = require('./src/routes/addmission_form')
const payment = require('./src/routes/payment')
const User = require('./src/models/user')


const fileUpload = require('express-fileupload');
const Payment = require('./src/models/payment');
 
app.use(bodyParser.urlencoded({
  extended : true
}))
// parse application/json
app.use(bodyParser.json())
app.use(fileUpload());
require('./config/passport')(passport);
app.locals.errors = null

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.get('/',function(req,res){
  Notice.find({},function(err,notices){
    res.render('index',{
      notices:notices
    }
    
    )
    
  })
  
})
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  // cookie: { secure: true }
}))
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
  
      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    },
  
    customValidators: {
      isImage: function (value, filename) {
        var extension = (path.extname(filename)).toLowerCase();
  
        switch (extension) {
          case '.jpg':
            return '.jpg';
          case '.jpeg':
            return '.jpeg';
          case '.png':
            return '.png';
          case '':
            return '.jpg';
          default:
            return false;
        }
      }
  
    }
  }));
  app.use(flash());
  // app.use(function (req, res, next) {
  //   res.locals.messages = require('express-messages')(req, res);
  //   next();
  // })
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  
 

  // app.use('/users',userRouter)
  
  app.get('/playgrounds', function (req, res) {
    res.render('playgrounds')
  })
  app.get('/gallery', function (req, res) {
    res.render('gallery')
  })
  app.get('/sports', function (req, res) {
    res.render('sports')
  })
 
  app.use('/',payment)
 
  app.use('/admin/notice',noticeRouter);
  app.use('/', admission)
  app.use('/auth', require('./src/routes/auth'));
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("server started ")
})
 




mongoose.connect('mongodb+srv://nahid1:Nahid@412@cms.bahfv.mongodb.net/CMS?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex :true
})
