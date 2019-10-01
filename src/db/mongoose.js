const mongoose = require('mongoose')

const connectionURL = process.env.DATABASE_CONNECT_URL;

mongoose.connect(connectionURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})




// const Task = mongoose.model('Task',{
//     description : {
//         type : String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })



