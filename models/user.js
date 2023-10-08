const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    required: true,
    unique: true,
    trim: true,
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
})

userSchema
.virtual('friendCount')
.get(function() {
    return this.friends.length;
}
);

const User = model('User', userSchema);

module.exports = User;

