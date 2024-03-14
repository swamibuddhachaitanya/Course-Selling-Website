


const express = require('express');
const { Router } = require('express');
const adminMiddleware = require("../middleware/admin");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const router = Router();
const jwt = require('jsonwebtoken');
const { Admin, Course, Locker }=require('../db/index.js')
router.use(express.json());


// Admin Routes

// - POST /admin/signin
//   Description: Logs in an admin account.
//   Input headers: { username: 'admin', password: 'pass' }
//   Output: { token: 'your-token' }
router.post('/signin',adminMiddleware, async(req, res) => {
    // Implement admin signup logic
    
    try {
     
    const username = req.headers.username;
    const password = req.headers.password;

    const admin = await Admin.findOne({username:username});
    const locker = await Locker.findOne();
    const userId = admin._id;

    const payload = {username, password};
    
    const secretKey = locker.jwtSecretKey;
    
    const token = jwt.sign(payload,secretKey);
    locker.tokens.push({userId: userId,
    jwtToken: token});
    locker.save();

    res.status(200).json({token: token});
    } catch (error) {
        res.status(500).json(error);   
    }

});



// - POST /admin/signup
//   Description: Creates a new admin account.
//   Input headers: { username: 'admin', password: 'pass' }
//   Output: { message: 'Admin created successfully' }

router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;
    const newAdmin = new Admin({
        username: username,
        password: password
    });
    newAdmin.save().then(obj=>{
        // console.log("Admin created successfully");
        res.status(200).json({message: "Admin created successfully"});
    })

});


// - POST /admin/courses
//   Description: Creates a new course.
//   Input: Headers: { 'Authorization': 'Bearer <your-token>' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
//   Output: { message: 'Course created successfully', courseId: "new course id" }
router.post('/courses', adminMiddleware,jwtMiddleware, (req, res) => {
    // Implement course creation logic
    const newCourse = new Course({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
    });
    newCourse.save().then(obj=>{
        // console.log("Course created successfully");
        res.status(200).json({message:'Course created successfully', courseId: obj._id});
    })
    // res.json();
});


// - GET /admin/courses
//   Description: Returns all the courses.
//   Input: Headers: { 'Authorization': 'Bearer <your-token>' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
router.get('/courses',jwtMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then((courses)=>{
        res.status(200).json(courses);
    });
    
    
    
});

module.exports = router;