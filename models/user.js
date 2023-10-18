const { Schema, model } = require('mongoose');


const userSchema = new Schema({
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
    match: [/.+@.+\..+/],
    },
friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
],
thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'thought',
    },
],
},
// {
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
)
userSchema.set('toJSON', {
    virtuals: true,
    getters: true,
});

userSchema.virtual('friendCount').get(function () {
    // return this.friends.length;
});

const user = model('user', userSchema);

module.exports = user;
