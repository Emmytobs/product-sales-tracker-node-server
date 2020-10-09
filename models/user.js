const mongoose  = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            // write  validation logic
            return value
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            // write  validation logic
            return value
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('products', {
    ref: "Product",
    localField: "_id",
    foreignField: "creator"
})

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.createJWT = async function() {
    // "this" refers to the user object
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
    // Add the new token to the beginning of the tokens array
    this.tokens.unshift({ token });
    // return back the new token
    return token;
}

const User = mongoose.model('User', userSchema)
module.exports = User;