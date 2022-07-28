import JobPost from '../models/JobPosting.js'; //importing the Database model for use in POST requests


const listingDeletion = async(req, res) => {
    let jobPost = await JobPost.findById(req.params.id);
    jobPost = jobPost._id.toString();
    JobPost.findByIdAndDelete(jobPost, (error, jobpost) => {
    })
    res.redirect('/');
};


export default listingDeletion;