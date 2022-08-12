// Middleware to ensure form isnt empty when user tries to submit
const validateJobPost = (req, res, next) => { 
    if (req.body.title === '' || req.body.company === '') {
        req.app.locals.isEmpty = true;
        setTimeout(function(){ req.app.locals.isEmpty = false }, 1000);
        return res.redirect('/listing');
    }
    next();
};


//exports middleware
export default validateJobPost;