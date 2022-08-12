//This route will render the about.ejs template file.
const aboutPage = async(req, res) => {
    res.render('about');
};


//export aboutPage route for usage in root index.js file.
export default aboutPage;