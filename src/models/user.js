const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const Schema = mongoose.Schema;



const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        //minlength : 7,
        validate(value){
            if(value.length <= 6){
                throw new Error('password length is invalid')
            }
            if(value.includes('password')){
                throw new Error(`your passwod includes 'passwod' word`)
            }
        }
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    avatar:{
        type:Buffer
    }
    
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generatedAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString() },process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;
}
userSchema.methods.toJSON = function (){
    const user = this ;
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar

    return userObj
}

userSchema.statics.findByCredentials = async (email,passwod)=>{
    const user = await User.findOne({email})

    if(!user) throw new Error('Unable to login')
    if(!passwod) throw Error('Unable to login')
    const isMatch = await bcrypt.compare(passwod,user.password)
    if(!isMatch) throw new Error('Unable to login')
    return user;
}

userSchema.pre('save',async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10)
    }
    next()
})
userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
