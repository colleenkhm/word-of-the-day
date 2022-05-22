const router = require('express').Router();
const {Comment, Entry, User} = require('../../models');

// ALL COMMENTS
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include:
            [{
                model: Entry,
                attributes: ['title', 'content']
            }]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET COMMENTS FOR SINGLE ENTRY (MAYBE IN ENTRY ROUTE?)

module.exports = router;