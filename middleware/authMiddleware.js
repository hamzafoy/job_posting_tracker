//importing User data model
import User from "../models/User.js";


//This middleware checks to see if an user is logged in in order to register new applications filled
const authenticateUser = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if(error || !user) {
            return res.redirect('/');
        }
        next();
    })
}


//exporting middleware
export default authenticateUser;