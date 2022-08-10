// :::: Importing necessary dependencies
import bcrypt from 'bcrypt';
import User from '../models/User.js';


//This route handles whether user credentials provided are authentic
const loginUser = async(req, res) => {
    //Splits username & password provided in the body of the request
    const { username, password } = req.body;
    User.findOne({username: username}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    //successful login due to valid username & correct password provided
                    req.session.userId = user._id;
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            })
        } else {
            const error = [
                "Please provide an username and/or password"
            ];
            req.session.validationErrors = error;
            res.redirect('/auth/login');
        }
    })
};


//export loginUser route for usage in root index.js file.
export default loginUser;