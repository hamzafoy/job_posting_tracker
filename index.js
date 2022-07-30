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
import listingDeletionController from './controllers/listingDeletion.js';
import listingUpdateController from './controllers/listingUpdate.js';
import registerFormController from './controllers/registerForm.js';
import registerFormStoreController from './controllers/registerFormStore.js';
import loginController from './controllers/login.js';
import loginUserController from './controllers/loginUser.js';
import logoutController from './controllers/logout.js';


// :::: Importing Middleware
import authenticateUser from './middleware/authMiddleware.js';
import redirectIfAuthenticated from './middleware/redirectIfAuthMiddleware.js';
import validateJobPost from './middleware/validationMiddleware.js';
import expressSession from 'express-session';
import JobPost from './models/JobPosting.js';


// :::: Starting new Express application
const application = express();
application.use(express.static('public')); //instructs Express to serve assets from a 'public' directory
application.set('view engine', 'ejs'); //instructs Express to render .ejs files with EJS package
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: true}));
application.use(expressSession({
    secret: 'hamza is my preferred name',
    resave: false,
    saveUninitialized: false
}));


// :::: Connecting to MongoDB NoSQL database from Node
mongoose.connect('mongodb://localhost/hamza_job_hunt', {useNewURLParser: true});


// :::: Local Application Variables
application.locals.isEmpty = false;
global.loggedIn = null; // Setting an application-wide variable accessible by EJS
application.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});


// :::: Creating Routes
application.get('/', homePageController);

application.get('/about', aboutPageController);

application.get('/auth/login', redirectIfAuthenticated, loginController);

application.post('/users/login', redirectIfAuthenticated, loginUserController);

application.get('/auth/logout', logoutController);

application.get('/auth/register', redirectIfAuthenticated, registerFormController);

application.post('/users/register', redirectIfAuthenticated, registerFormStoreController);

application.get('/listing', authenticateUser, listingFormController);

application.post('/submissions/store', validateJobPost, listingFormStoreController);

application.get('/submissions/delete/:id', listingDeletionController);

application.use((req, res) => res.render('404notfound'));

application.listen(3000, () => {
    console.log("We are tuned in to Localhost 3000");
})