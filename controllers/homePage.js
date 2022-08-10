//importing the Database Model for use in POST requests
import JobPost from '../models/JobPosting.js';


//This route will draw data associated with the userID and use it to render a table
//on the home page & provides said data to the Plotly.js charts. If no userId is saved
//to the session - meaning no user is logged in - then dummy data is provided.
const homePage = async(req, res) => {
    if(req.session.userId) {
        const jobposts = await JobPost.find({userid: req.session.userId}).populate('userid');
        const jobPostCount = jobposts.length;
        let pendingPosts = await JobPost.find({ userid: req.session.userId, status: 'pending' }).populate('userid');
        pendingPosts = pendingPosts.length;
        let rejectedPosts = await JobPost.find({ userid: req.session.userId, status: 'rejected'}).populate('userid');
        rejectedPosts = rejectedPosts.length;
        let coverLetterAdded = await JobPost.find({ userid: req.session.userId, coverletter: true}).populate('userid');
        coverLetterAdded = coverLetterAdded.length;
        let noCoverLetterAdded = await JobPost.find({ userid: req.session.userId, coverletter: false }).populate('userid');
        noCoverLetterAdded = noCoverLetterAdded.length;

        res.render('index', {
            jobposts, jobPostCount, pendingPosts, rejectedPosts, coverLetterAdded, noCoverLetterAdded
        });  
    } else {
        res.render('index', {
            jobposts: [
                {
                    title: "Dummy Data",
                    company: "To Showcase User Dashboard",
                    status: "pending",
                    coverletter: true
                },
                {
                    title: "Plotly.js used to display data",
                    company: "Regarding pend/reject status & cover letters",
                    status: "rejected",
                    coverletter: false
                },
                {
                    title: "Programmer",
                    company: "Louisville Metro Government",
                    status: "pending",
                    coverletter: true
                }
            ],
            jobPostCount: 3,
            pendingPosts: 2,
            rejectedPosts: 1,
            coverLetterAdded: 1,
            noCoverLetterAdded: 2
        })
    }
};


//export homePage route for usage in root index.js file.
export default homePage;