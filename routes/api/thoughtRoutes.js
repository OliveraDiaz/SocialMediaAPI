const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController')

//get all thougths and post new thought
router.route('/').get(getAllThoughts).post(createThought);
//get thought by id, update thought by id, and delete thought by id. EREASED TO FIX SERVER ERROR
router.route('/:id').get(getAllThoughts).put(updateThought).delete(deleteThought);
//add reaction and delete reaction
router.route('/:thoughtId/reactions').post(addReaction);
//delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

router.route

module.exports = router;
