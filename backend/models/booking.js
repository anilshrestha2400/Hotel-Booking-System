
const mongoose = require('mongoose');

const bookingSchema=mongoose.Schema({
    room:{
        type: String,
        required: true
    },
    roomid:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    fromdate:{
        type: String,
        required: true
    },
    todate:{
        type: String,
        required: true
    },
    totalamount:{
        type: String,
        required: true
    },
    totaldays:{
        type: String,
        required: true
    },
    transactionId:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true,
        default:'booked'
    }

},{
    timestamps:true,
})

const bookingModel= mongoose.model('bookings',bookingSchema)
module.exports=bookingModel
