import User from "../models/User.js"; //importing the Database model for use in POST requests

const registerFormStore = async(req, res) => {
    await User.create(req.body);
    res.redirect('/');
};

export default registerFormStore;