import JobPost from '../models/JobPosting.js'; //importing the Database Model for use in POST requests

const homePage = async(req, res) => {
    const jobposts = await JobPost.find({});
    const jobPostCount = jobposts.length;
    let pendingPosts = await JobPost.find({ status: 'pending' });
    pendingPosts = pendingPosts.length;
    let rejectedPosts = await JobPost.find({ status: 'rejected'});
    rejectedPosts = rejectedPosts.length;
    res.render('index', {
        jobposts, jobPostCount, pendingPosts, rejectedPosts
    });
};

export default homePage;