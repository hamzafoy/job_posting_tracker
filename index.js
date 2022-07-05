// :::: Modules Importing
import fs from 'fs';
import http from 'http';


// :::: Files Importing
const homePage = fs.readFileSync('index.html');
const aboutPage = fs.readFileSync('about.html');
const contactPage = fs.readFileSync('contact.html');
const fourOhFour = fs.readFileSync('404.html');


// :::: Creating Server
const server = http.createServer((req, res) => {
    console.log(req.url);
    switch(req.url) {
        case '/':
            res.end(homePage);
            break;
        case '/about':
            res.end(aboutPage);
            break;
        case '/contact':
            res.end(contactPage);
            break;
        default:
            res.writeHead(404);
            res.end(fourOhFour);
    }
});

server.listen(3000);