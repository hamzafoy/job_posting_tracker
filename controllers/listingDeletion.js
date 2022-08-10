//importing the Database model for use in POST requests
import JobPost from '../models/JobPosting.js';


//This route deletes job posts.
const listingDeletion = async(req, res) => {
    let jobPost = await JobPost.findById(req.params.id);
    jobPost = jobPost._id.toString();
    JobPost.findByIdAndDelete(jobPost, (error, jobpost) => {
    })
    res.redirect('/');
};


//export listingDeletion route for usage in root index.js file.
export default listingDeletion;