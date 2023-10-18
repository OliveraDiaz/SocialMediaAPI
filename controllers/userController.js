const { user } = require('../models');

const userController = {

getAllUsers(req, res) {
    user.find()
    .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
},
//get user by id
getUserById(req, res) {
    user.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate("thoughts")
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
,

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
        const dbUserData = await user.findOneAndDelete({_id: req.params.userId});
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

module.exports = userController;
