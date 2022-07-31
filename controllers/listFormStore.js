import JobPost from '../models/JobPosting.js'; //importing the Database model for use in POST requests


const listingFormStore = async(req, res) => {
    console.log(req.params);
    console.log(req.params.id);
    if(req.params.id) {
        let jobPost = await JobPost.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            company: req.body.company,
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