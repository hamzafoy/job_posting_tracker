const registerForm = async(req, res) => {
    res.render('register', {
        errors: req.session.validationErrors
    });
};

export default registerForm;