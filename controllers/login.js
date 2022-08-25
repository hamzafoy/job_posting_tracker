//Creating login route, passing an error object that will pass error messages to login.ejs
//to render any error messages.
const login = async(req, res) => {
    res.render('login', {
        errors: req.session.validationErrors
    });
    //req.session.validationErrors = '';
    //req.session.save();
};


//export login route for usage in root index.js file.
export default login;