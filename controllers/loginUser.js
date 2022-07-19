// :::: Importing necessary dependencies
import bcrypt from 'bcrypt';
import User from '../models/User.js';


const loginUser = async(req, res) => {
    const { username, password } = req.body;
    User.findOne({username: username}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    req.session.userId = user._id;
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            })
        } else {
            res.redirect('/auth/login');
        }
    })
};

export default loginUser;