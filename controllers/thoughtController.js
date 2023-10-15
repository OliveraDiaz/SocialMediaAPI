const { thought } = require('../models/thoughts');
const {types} = require('mongoose');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await thought.findById(req.params.id);
            if (!thoughts)  {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    

    //handler for the "createThought" API endpoint

    async createThought(req, res) {
        try {
            const thought = await thought.create(req.body);
            const dbUserData = await user.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
                );
                if (!dbUserData) {
                     return res.status(404).json({ message: 'No user found with this id!' });
                    }
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
},

    // Handler for the "delete thought" API endpoint

    async deleteThought(req, res) {
        try{
            const thought = await thought.findOneAndDelete({ _id: req.params.id });
            const dbUserData = await user.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        }
    },

         // Handler for the "update thought by ID" API endpoint
    async updateThought(req, res) {
        try {
                const thought= await thought.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: req.body },
                    { new: true }
                );
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        },



  // Handler for the "create reaction" API endpoint
  async addReaction(req, res) {
    try {
        const thought = await thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
},


    // Handler for the "delete reaction" API endpoint

    async deleteReaction(req, res) {
        try {   
            const thought = await thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};


        module.exports = thoughtController;