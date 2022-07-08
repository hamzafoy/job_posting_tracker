// :::: Modules Importing & Pulling Required Objects
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// :::: Scaffolding Job Posting schema
const JobPostingSchema = new Schema({
    title: String,
    company: String,
    status: String
});


// :::: Accessing database through model
const JobPost = mongoose.model('JobPost', JobPostingSchema);


export default JobPost;