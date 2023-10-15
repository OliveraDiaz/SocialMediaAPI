
const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    },

email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function (validEmail) {
            return /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/.test(validEmail);
        },
        message: 'Please enter a valid email address',
    },
},

thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },
],
friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
],
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

