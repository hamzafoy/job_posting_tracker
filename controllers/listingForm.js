//This route renders the form to add a new job posting filled out
//and passes a variable that helps track if the form was left
//empty in which case an error banner is rendered on the .ejs file.
const listingForm = async(req, res) => {
    const isEmpty = req.app.locals.isEmpty;
    if(req.session.userId) {
        res.render('listing', {
            isEmpty
        });
    }
    res.redirect('/auth/login');
};


//export listingForm route for usage in root index.js file.
export default listingForm;