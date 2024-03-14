const express = require('express');
const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const jwtMiddleware = require("../middleware/jwtMiddleware");
const userMiddleware = require("../middleware/user");
const { User, Course, Locker } = require('../db/index.js');
router.use(express.json());


// User Routes

// - POST /users/signin
//   Description: Logs in a user account.
//   Input: { username: 'user', password: 'pass' }
//   Output: { token: 'your-token' }
router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    // const username = req.body.username;
    // const password = req.body.password;
    // const payload = {username,password};
    // const token = jwt.sign(payload,jwtPassword)
    try {
     
        const username = req.headers.username;
        const password = req.headers.password;
    
        const user = await User.findOne({username:username});
        const locker = await Locker.findOne();
        const userId = user._id;
    
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


// - POST /users/signup
//   Description: Creates a new user account.
//   header Input: { username: 'user', password: 'pass' }
//   Output: { message: 'User created successfully' }
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const newUser = new User({
        username: username,
        password: password
    });
    newUser.save().then(()=>{
        // console.log("User created successfully");
        res.status(200).json({message: "User created successfully"});
    })
});


// - GET /users/courses
//   Description: Lists all the courses.
//   Input: Headers: { 'Authorization': 'Bearer <your-token>' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
router.get('/courses', jwtMiddleware,(req, res) => {
    // Implement listing all courses logic
    Course.find({}).then((courses)=>{
        res.status(200).json(courses);
    })
    
});


// - POST /users/courses/:courseId
//   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
//   Input: Headers: { 'Authorization': 'Bearer <your-token>' }
//   Output: { message: 'Course purchased successfully' }
router.post('/courses/:courseId', userMiddleware,jwtMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    Course.findById(courseId).then((course)=>{
        
                //find username
                const username = req.headers.username;
                User.findOne({username: username}).then((user)=>{
                    user.purchasedCourses.push(course);
                        user.save().then(()=>{
                            
                                res.status(200).json({message: 'Course purchased successfully'});
                            

                });
                
        })


    })
    
    


});


// - GET /users/purchasedCourses
//   Description: Lists all the courses purchased by the user.
//   Input: Headers: { 'Authorization': 'Bearer <your-token>' }
//   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
router.get('/purchasedCourses', userMiddleware,jwtMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    User.findOne({username: req.headers.username}).then((user)=>{
        res.status(200).json(user.purchasedCourses);

    })
    
});

module.exports = router