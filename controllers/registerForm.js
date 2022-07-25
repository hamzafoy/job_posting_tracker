const registerForm = async(req, res) => {
    res.render('register', {
        errors: req.session.validationErrors,
    });
    req.session.validationErrors = '';
    req.session.save();
};

export default registerForm;