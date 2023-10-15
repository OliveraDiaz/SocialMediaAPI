const { Schema, model, Types } = require('mongoose');
const reactionSchema = require ('./reactions')


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
   
            get: timestamp => dateFormat(timestamp),

        },
        reactions: [reactionSchema],

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

const thought = model('Thought', thoughtSchema);

module.exports = thought
