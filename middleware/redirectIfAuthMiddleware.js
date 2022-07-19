const redirectIfAuthenticated = (req, res, next) => {
    if(req.session.userId) {
        return res.redirect('/'); //If the user is logged in, redirect to home page
    }
    next();
}


export default redirectIfAuthenticated;