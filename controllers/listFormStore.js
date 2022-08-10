//importing the Database model for use in POST requests
import JobPost from '../models/JobPosting.js'; 


//This route checks whether a post is being edited via req.params.id
//then pulls data of the job post being edited and updates it based
//on user provided updated data or prefills with the job posts existing
//data. Per the form provided, the user MUST make a choice for the
//dropdown menus of Status & Cover Letter Submitted. Otherwise, if this
//is a new job posting, it will create said job posting using inputted data.
const listingFormStore = async(req, res) => {
    if(req.params.id) {
        const oldJobPost = await JobPost.findById(req.params.id);
        await JobPost.findByIdAndUpdate(req.params.id, {
            title: (req.body.title) ? req.body.title : oldJobPost.title,
            company: (req.body.company) ? req.body.company : oldJobPost.company,
            status: req.body.status,
            coverletter: req.body.coverletter
        });
    } else {
    await JobPost.create({
        ...req.body,
        userid: req.session.userId
    });
    }
    res.redirect('/');
};


//export listingFormStore route for usage in root index.js file.
export default listingFormStore;