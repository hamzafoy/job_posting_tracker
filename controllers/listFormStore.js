import JobPost from '../models/JobPosting.js'; //importing the Database model for use in POST requests


const listingFormStore = async(req, res) => {
    console.log(req.body);
    await JobPost.create({
        ...req.body,
        userid: req.session.userId
    });
    res.redirect('/');
};


export default listingFormStore;