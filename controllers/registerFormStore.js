import User from "../models/User.js"; //importing the Database model for use in POST requests

const registerFormStore = async(req, res) => {
    await User.create(req.body, (error, user) => {
        if(error) {
            const errorMessage = Object.keys(error.errors).map(key => error.errors[key].message);
            console.log(errorMessage);
            return res.redirect('/auth/register');
        } else {
            return res.redirect('/');
        }
    });
};

export default registerFormStore;