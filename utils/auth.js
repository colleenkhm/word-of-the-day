const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        // if user is logged in, execute route function
        next();
    }
};

module.exports = withAuth;