// :::: Modules Importing
import express from 'express'; //importing Express.js
import path from 'path'; //importing path module to retrieve paths across various OS
import { fileURLToPath } from 'url'; //Alternative to CommonJS's __dirname usage
import { dirname } from 'path'; //Alternative to CommonJS's __dirname usage
const __filename = fileURLToPath(import.meta.url); //Alternative to CommonJS's __dirname usage
const __dirname = dirname(__filename); //Alternative to CommonJS's __dirname usageC


// :::: Starting new Express application
const application = express();
application.use(express.static('public')); //instructs Express to serve assets from a 'public' directory


// :::: Creating Routes
application.get('/', (req, res) => { //root route
    res.sendFile(path.resolve(__dirname, 'index.html'));
})

application.get('/about', (req, res) => { //about route
    res.sendFile(path.resolve(__dirname, 'about.html'));
})

application.get('/contact', (req, res) => { //contact route
    res.sendFile(path.resolve(__dirname, 'contact.html'));
})

application.listen(3000, () => {
    console.log("We are tuned in to Localhost 3000");
})