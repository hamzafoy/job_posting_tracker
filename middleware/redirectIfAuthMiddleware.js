const redirectIfAuthenticated = (req, res, next) => {
    if(req.session.userId) {
        return res.redirect('/'); //If the user is logged in, redirect to home page
    }
    next();
}


//exporting middleware
export default redirectIfAuthenticated;