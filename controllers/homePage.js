import JobPost from '../models/JobPosting.js'; //importing the Database Model for use in POST requests

const homePage = async(req, res) => {
    const jobposts = await JobPost.find({});
    res.render('index', {
        jobposts
    });
};

export default homePage;