const listingForm = async(req, res) => {
    const isEmpty = req.app.locals.isEmpty;
    res.render('listing', {
        isEmpty
    });
};

export default listingForm;