const mongoose = require('mongoose');

var mongoURL="mongodb://localhost:27017/hotelbook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    
mongoose.connect(mongoURL, {useUnifiedTopology : true , useNewUrlParser : true})  

var connection = mongoose.connection

connection.on('error' , ()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose