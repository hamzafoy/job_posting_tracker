import JobPost from '../models/JobPosting.js'; //importing the Database Model for use in POST requests

const homePage = async(req, res) => {
    if(req.session.userId) {
        const jobposts = await JobPost.find({userid: req.session.userId}).populate('userid');
        const jobPostCount = jobposts.length;
        let pendingPosts = await JobPost.find({ status: 'pending' }).populate('userid');;
        pendingPosts = pendingPosts.length;
        let rejectedPosts = await JobPost.find({ status: 'rejected'}).populate('userid');;
        rejectedPosts = rejectedPosts.length;
        console.log(jobposts);
        console.log(req.session);
        res.render('index', {
            jobposts, jobPostCount, pendingPosts, rejectedPosts
        });  
    } else {
        res.render('index', {
            jobposts: [
                {
                    title: "Junior Developer",
                    company: "Hamzaology",
                    status: "pending",
                    coverletter: true
                },
                {
                    title: "Junior Data Scientist",
                    company: "Humana",
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
            rejectedPosts: 1
        })
    }
    
};

export default homePage;