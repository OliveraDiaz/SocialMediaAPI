const router = require ('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');
//get all users and post new user
router.route('/').get(getAllUsers).post(createUser);
//get user by id, update user by id, and delete user by id
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);
//add friend and delete friend by id
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
