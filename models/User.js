// :::: Modules Importing & Pulling Required Objects
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// :::: Scaffolding User schema
const UserSchema = new Schema({
    username: String,
    password: String
});


// :::: Accessing database through model
const User = mongoose.model('User', UserSchema);


export default User;