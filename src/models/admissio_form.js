const mongoose =require('mongoose')
 

const admissionSchema ={
    name : {
        type:String,
    },
    email :{
        type:String
    },
    Admission_class: {
        type:String,
    },
    dob : {
        type:String,
    },
    dob_day:{
        type:String
    },
    dob_month:{
        type:String
    },
    dob_year:{
        type:String
    },
    nationality : {
        type:String,
    },
    Religion : {
        type:String,
    },
    Gender : {
        type:String,
    },
    father : {
        name : {
            type:String,

        },
        Occupation: {
            type:String,

        },
        Designation : {
            type:String,

        },
        annualIncome : {
            type:String,

        },
        organisationsNameAndAddress: {
            type:String,
        },
        academicQualification : {
            type:String,
        },
        
       PhoneNo : {
            type:String,
        }
    },
    mother :{

        name : {
            type:String,
        },
        Occupation: {
            type:String,
        },
        Designation : {
            type:String,
        },
        annualIncome : {
            type:String,
        },
        organisationsNameAndAddress: {
            type:String,
        },
        academicQualification : {
            type:String,
        },
        
       PhoneNo : {
            type:String,
        }

    },
    address1:{
        town :{
            type:String,
        },
        state :{
            type:String,
        },
        Country:{
            type:String,
        }
    },
    address2:{
        present:{
            type:String,
            
        },
        permanent:{
            type:String,
           
        }
    },
    sibling :{
        one :{
            name :{
                type:String
            },
            admsnNo:{
                type:String
            },
            class:{
                type:String
            },
            sec:{
                type:String
            }
        },
        two :{
            name :{
                type:String
            },
            admsnNo:{
                type:String
            },
            class:{
                type:String
            },
            sec:{
                type:String
            }
        }
        
        
    },
    Any_other_info:{
        type:String
    },
    studentPic :{
        type:String,

    },
    sign:{
        type:String,
    },
    payment:{
        order_id:{
            type:Number,
        }
    },
     
    prev_school:{
        type:String,
    },
    prev_class:{
        type:String,
    },
    prev_position:{
        type:String,
    },
    prev_medium:{
        type:String,
    },
    skills:{
        type:String,
    },
    skills_certificate:{
        type:String,
    },
    prev_result:{
        type:String,
    },
    submit :{
        type:Boolean,
        default : false
    }
    
   
}
const admissionForm=mongoose.model('admissionForm',admissionSchema)
module.exports =admissionForm