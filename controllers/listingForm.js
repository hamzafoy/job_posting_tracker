const listingForm = async(req, res) => {
    const isEmpty = req.app.locals.isEmpty;
    if(req.session.userId) {
        res.render('listing', {
            isEmpty
        });
    }
    res.redirect('/auth/login');
};

export default listingForm;