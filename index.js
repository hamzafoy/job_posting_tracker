// :::: Modules Importing
import express from 'express'; //importing Express.js
import ejs from 'ejs'; //importing ejs templating engine
import bodyParser from 'body-parser'; //importing dependency that parses POST data
import mongoose from 'mongoose'; //importing Mongoose ORM to connect to MongoDB database



// :::: Importing controllers which control the routing of HTTP requests
import homePageController from './controllers/homePage.js';
import aboutPageController from './controllers/aboutPage.js';
import listingFormController from './controllers/listingForm.js';
import listingFormStoreController from './controllers/listFormStore.js';
import registerFormController from './controllers/registerForm.js';
import registerFormStoreController from './controllers/registerFormStore.js';
import loginController from './controllers/login.js';
import loginUserController from './controllers/loginUser.js';


// :::: Importing Middleware
import validateJobPost from './middleware/validationMiddleware.js';


// :::: Starting new Express application
const application = express();
application.use(express.static('public')); //instructs Express to serve assets from a 'public' directory
application.set('view engine', 'ejs'); //instructs Express to render .ejs files with EJS package
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: true}));


// :::: Connecting to MongoDB NoSQL database from Node
mongoose.connect('mongodb://localhost/hamza_job_hunt', {useNewURLParser: true});


// :::: Local Application Variables
application.locals.isEmpty = false;


// :::: Creating Routes
application.get('/', homePageController);

application.get('/about', aboutPageController);

application.get('/auth/login', loginController);

application.post('/users/login', loginUserController);

application.get('/auth/register', registerFormController);

application.post('/users/register', registerFormStoreController);

application.get('/listing', listingFormController);

application.post('/submissions/store', validateJobPost, listingFormStoreController);

application.listen(3000, () => {
    console.log("We are tuned in to Localhost 3000");
})