const { user, thought } = require('../models');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await thought.find();
            //
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getSingleThought(req, res) {
        try {
            const dbThoughtData = await thought.findOne({_id: req.params.thoughtId});
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    

    //handler for the "createThought" API endpoint

    async createThought(req, res) {
        try {
            const dbThoughtData = await thought.create({ thoughtText: req.body.thoughtText, username: req.body.username });
            const dbUserData = await user.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
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

async deleteThoughtById(req, res) {
    try {
        const thoughtData = await thought.findByIdAndDelete(req.params.id);
        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
},



    // Handler for the "delete thought" API endpoi

         // Handler for the "update thought by ID" API endpoint
    async updateThoughtById(req, res) {
        try {
                const dbThoughtData = await thought.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: req.body },
                    { new: true }
                );
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(dbThoughtData);
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        },



  // Handler for the "create reaction" API endpoint
  async addReaction(req, res) {
    try {
        const dbThoughtData = await thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
},


    // Handler for the "delete reaction" API endpoint

    async deleteReaction(req, res) {
        try {   
            const dbThoughtData = await thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};


        module.exports = thoughtController;