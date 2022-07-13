const validateJobPost = (req, res, next) => { // Middleware to ensure form isnt empty when user tries to submit
    if (req.body.title === '' || req.body.company === '') {
        req.app.locals.isEmpty = true;
        setTimeout(function(){ req.app.locals.isEmpty = false }, 1000);
        return res.redirect('/listing');
    }
    next();
};

export default validateJobPost;