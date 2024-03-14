const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://{your username}:{password}@cluster0.kykouaa.mongodb.net/courseApp');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String
});



const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: {type: Boolean,
        default: true
    }

});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedCourses: [CourseSchema]
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

const lockerSchema = new mongoose.Schema({
    jwtSecretKey : {
        type: String,
        
    },
    tokens: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            jwtToken: String
        }],
        default: []
    }
})

const Locker = mongoose.model('Locker',lockerSchema);

// function to initialise the locker with the default secret key

async function initialiseLocker() {
    const count = await Locker.countDocuments();
    if (count === 0) {
        await Locker.create({jwtSecretKey: 'HfK37$G*2L!@8s'});
        console.log("Locker initialised");
    }
}

module.exports = {
    Admin,
    User,
    Course,
    Locker,
    initialiseLocker
}