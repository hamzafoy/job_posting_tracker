import JobPost from "../models/JobPosting.js";


const listingUpdate = async(req, res) => {
    let jobPost = await JobPost.findById(req.params.id);
};


export default listingUpdate;