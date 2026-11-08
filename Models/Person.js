const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type :"string",
        required : true,
    },
    age :{
        type :Number,

    },
    work:{
        type:"String",
        enum :['chef','waiter','manager'],
        required: true,
    },
    mobile: {
        type : Number,
        required: true,
    },
    email:{
        type:String,
            required:true,
            unique:true,
        
    },
    addresh:{
        type:
        String,

    },
    salary:{
        type:Number,
        required:true,
    }
});

// create persion model

 const Person = mongoose.model('Person',personSchema);
 module.exports=Person;