const login = async(req, res) => {
    res.render('login', {
        errors: req.session.validationErrors
    });
    req.session.validationErrors = '';
    req.session.save();
};

export default login;