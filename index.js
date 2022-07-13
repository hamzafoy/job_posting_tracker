// :::: Modules Importing
import express from 'express'; //importing Express.js
import { fileURLToPath } from 'url'; //Alternative to CommonJS's __dirname usage
import { dirname } from 'path'; //Alternative to CommonJS's __dirname usage
import ejs from 'ejs'; //importing ejs templating engine
import bodyParser from 'body-parser'; //importing dependency that parses POST data
import mongoose from 'mongoose'; //importing Mongoose ORM to connect to MongoDB database
import JobPost from './models/JobPosting.js'; //importing the Database Model for use in POST requests
const __filename = fileURLToPath(import.meta.url); //Alternative to CommonJS's __dirname usage
const __dirname = dirname(__filename); //Alternative to CommonJS's __dirname usage
import homePageController from './controllers/homePage.js';
import aboutPageController from './controllers/aboutPage.js';
import listingFormController from './controllers/listingForm.js';


// :::: Starting new Express application
const application = express();
application.use(express.static('public')); //instructs Express to serve assets from a 'public' directory
application.set('view engine', 'ejs'); //instructs Express to render .ejs files with EJS package
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: true}));


// :::: Connecting to MongoDB NoSQL database from Node
mongoose.connect('mongodb://localhost/hamza_job_hunt', {useNewURLParser: true});


// :::: Middleware
const validateJobPost = (req, res, next) => {
    if (req.body.title === '' || req.body.company === '') {
        application.locals.isEmpty = true;
        setTimeout(triggerIsEmpty, 1000);
        return res.redirect('/listing');
    }
    next();
};
const triggerIsEmpty = () => {
    application.locals.isEmpty = false
};


// :::: Local Application Variables
application.locals.isEmpty = false;


// :::: Creating Routes
application.get('/', homePageController)

application.get('/about', aboutPageController)

application.get('/listing', listingFormController)

application.post('/submissions/store', validateJobPost, async (req, res) => {
    await JobPost.create(req.body);
    res.redirect('/');
})

application.listen(3000, () => {
    console.log("We are tuned in to Localhost 3000");
})