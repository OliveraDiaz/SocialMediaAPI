const { Schema, model } = require('mongoose');
const reactionSchema = require('./reactions');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        createdAt: {
            type: Date,
            default: Date.now(),
                },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const thought = model('thought', thoughtSchema);

module.exports = thought;