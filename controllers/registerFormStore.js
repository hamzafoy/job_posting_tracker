import User from "../models/User.js"; //importing the Database model for use in POST requests

const registerFormStore = async(req, res) => {
    await User.create(req.body, (error, user) => {
        if(error) {
            return res.redirect('/auth/register');
        }
    });
    res.redirect('/');
};

export default registerFormStore;