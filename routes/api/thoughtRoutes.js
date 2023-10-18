const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

//get all thougths and post new thought
router.route('/').get(getAllThoughts).post(createThought);
//get thought by id, update thought by id, and delete thought by id. 
router.route('/:thoughtId').get(getSingleThought).put(updateThoughtById).delete(deleteThoughtById);
//add reaction and delete reaction
router.route('/:thoughtId/reactions').post(addReaction);
//delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;
