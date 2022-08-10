//Destroys the current session and all data tied to said session
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}


//export logout route for usage in root index.js file.
export default logout;