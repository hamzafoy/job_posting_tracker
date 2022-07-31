import JobPost from "../models/JobPosting.js";

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


export default listingUpdate;