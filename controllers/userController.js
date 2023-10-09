const { user, thought } = require('../models');

module.exports = {

async getAllUsers(req, res) {
    try {
        const dbUserData = await user.find({}).populate('thoughts').populate('friends');
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

async getUserById(req, res) {
    try {
        const dbUserData = await user.findOne({ _id: req.params.id }).populate('thoughts').populate('friends');
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},


//create new user

async createUser(req, res) {
    try {
        const dbUserData = await user.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//update user by id

async updateUser(req, res) {
    try {
        const dbUserData = await user.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//delete user by id

async deleteUser(req, res) {
    try {
        const dbUserData = await user.findOneAndDelete({ _id: req.params.id });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//add friend
async addFriend(req, res) {
    try {
        const dbUserData = await user.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//remove friend

async removeFriend(req, res) {
    try {
        const dbUserData = await user.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
};
