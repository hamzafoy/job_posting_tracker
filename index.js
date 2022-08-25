// :::: Modules Importing
import express from 'express'; //importing Express.js
import ejs from 'ejs'; //importing ejs templating engine
import bodyParser from 'body-parser'; //importing dependency that parses POST data
import mongoose from 'mongoose'; //importing Mongoose ORM to connect to MongoDB database
import path from 'path'; //importing path module
import * as url from 'url'; //importing url module
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); 
import favicon from 'serve-favicon' //importing favicon serving middleware
import dotenv from 'dotenv/config' //importing dotenv package for using environmental variables
const databaseKey = process.env.MONGODB_URI; //importing hidden URI key for MongoDB Atlas


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
import MongoStore from 'connect-mongo';
import cookieSession from 'cookie-session';


// :::: Starting new Express application
const application = express();
application.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico'))); //Drawing favicon from /public/img directory
application.use(express.static('public')); //instructs Express to serve assets from a 'public' directory
application.set('view engine', 'ejs'); //instructs Express to render .ejs files with EJS package
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: true}));
application.use(cookieSession({
    secret: 'hamza is my preferred name',
    resave: false,
    saveUninitialized: false
}));


// :::: Connecting to MongoDB NoSQL database from Node
mongoose.connect(databaseKey, {useNewURLParser: true});
// const connectingDatabase = async() => {
//     try {
//         await mongoose.connect(databaseKey, {useNewURLParser: true});
//         console.log(`This bad boy is plugged into MongoDB!`)
//     } catch (err) {
//         console.log(err.message);
//         process.exit(1);
//     }
// }
//connectingDatabase();


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

application.get('/listing/edit/:id', listingUpdateController);

application.post('/submissions/store', validateJobPost, listingFormStoreController);

application.post('/submissions/store/:id', listingFormStoreController);

application.get('/submissions/delete/:id', listingDeletionController);

application.use((req, res) => res.render('404notfound'));


let port = process.env.PORT;
if(port == null || port == "" ) {
    port = 4000
}

application.listen(port, () => {
    console.log("We are tuned in to Localhost 4000");
})