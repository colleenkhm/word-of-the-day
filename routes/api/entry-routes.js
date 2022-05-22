const router = require('express').Router();
const { User, Entry, Comment} = require('../../models');

// GET ALL ENTRIES
router.get('/', async (req, res) => {
    try {
        const entryData = await Entry.findAll({
            attributes: { exclude: ['updatedAt']},
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [content]
                    // need to associate comment with user in models - by userId? probably need 
                }
            ]
        });
        res.status(200).json(entryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ONE ENTRY
router.get('/', async (req, res) => {
    try {
        const entryData = await Entry.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [content]
                }
                //commentIds: req.body.commentIds (create commentIds in model)
            ]
        });
        res.status(200).json(entryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST ENTRY
router.post('/', (req, res) => {
    Entry.create({
        title: req.body.title,
        creation: req.body.creation,
        user_id: req.body.user_id,
    });
    res.status(200).json(entry);
    // should be a "then" here
    .catch(err) => {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;