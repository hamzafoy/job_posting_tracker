import JobPost from '../models/JobPosting.js'; //importing the Database model for use in POST requests


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


export default listingFormStore;