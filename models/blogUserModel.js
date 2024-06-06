const {createHmac , randomBytes} = require('crypto');
const {Schema , model} = require('mongoose');

const blogUserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    salt:{
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profilePicURL: {
        type: String,
        default: './images/default.png'
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
},
{
    timestamps: true
})

blogUserSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')){
        return;
    }
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
})
//pre is a middleware that is used to hash the password before saving it to the database
//'sha256' is the algorithm used for hashing
//'salt' is the random string(key) that is used to hash the password
//.digest('hex') is used to convert the hashed password into hexadecimal format
//this.salt and this.password are the fields in the schema

blogUserSchema.static("matchPassword", async function(email, password){
    const user = await this.findOne({email});
    if(!user){
        throw new Error('User not found');
    
    }
    const salt = user.salt;
    const hashedPassword = user.password;

    const hashedEnteredPassword = createHmac('sha256', salt).update(password).digest('hex');

    if(hashedEnteredPassword !== hashedPassword){
        throw new Error('Invalid Password');
    }

    return {...user, password: undefined, slat: undefined}
})

const User = model('blogUser', blogUserSchema);
module.exports = User;