//importing the Database model for use in POST requests
import User from "../models/User.js";


//This route creates a new user upon successful register parameters provided
//and checks for errors and maps over the messages in a variable.
const registerFormStore = async(req, res) => {
    await User.create(req.body, (error, user) => {
        if(error) {
            const errorMessage = Object.keys(error.errors).map(key => error.errors[key].message);
            //console.log(errorMessage);
            req.session.validationErrors = errorMessage;
            return res.redirect('/auth/register');
        } else {
            return res.redirect('/');
        }
    });
};


//export registerFormStore route for usage in root index.js file.
export default registerFormStore;