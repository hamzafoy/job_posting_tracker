//importing the Database model for use in POST requests.
import JobPost from "../models/JobPosting.js";


//Takes the URL path ID and uses it to search the specific job posting to be edited.
const listingUpdate = async(req, res) => {
    const isEmpty = req.app.locals.isEmpty;
    let jobPost = await JobPost.findById(req.params.id);
    console.log(jobPost);
    if(req.session.userId) {
        res.render('editinglisting', {
            isEmpty,
            jobPost
        })
    }
};


//export listingUpdate route for usage in root index.js file.
export default listingUpdate;