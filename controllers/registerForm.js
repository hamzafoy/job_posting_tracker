//This route renders the registration form and clears any errors upon reload of page.
const registerForm = async(req, res) => {
    res.render('register', {
        errors: req.session.validationErrors,
    });
    req.session.validationErrors = '';
    req.session.save();
};


//export registerForm route for usage in root index.js file.
export default registerForm;