const router = require('express').Router();
const { User, Comment, Entry } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ONE USER
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{model: Entry}],
            attributes: {
                exclude: ['password']
            }
        });

        if (!userData){
            res.status(404).json({message: 'No user found with this id!'});
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE USER
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            // req.session.loggedIn = true;
            // res.status(200).json(userData);
            res.json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

// USER LOGIN

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!userData) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.passwird);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({
                user: userData,
                message: 'You are now logged in'
            });
            // res.status(200).json({user: userData, message: 'You are now logged in'});
        });
    } catch(err) {
        res.status(500).json(err)
    }
});

// LOGOUT
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;