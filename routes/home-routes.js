const router = require('express').Router();
const { Entry, Comment, User } = require('../models');
// Import middleware
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: [
                'title',
                'creation'
            ],
            include: [
                {
                    model: User,
                    attributes:['username']
                },
                {
                    model: Comment,
                    attributes: ['content', 'user_id']
                }
            ]
        });

        const entry = await entryData.map(post => post.get({plain: true}));
        res.render('homepage', { entry, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('/login', { loggedIn: req.session.loggedIn });
});

router.get('/signup', (req, res) => {
    res.render('signup', { loggedIn: req.session.loggedIn });
});

router.get('/', (req, res) => {
    console.log(req.session);
});

router.get('/create-entry', (req, res) => {
    res.render('createEntry', { loggedIn: req.session.loggedIn });
});

module.exports = router;
