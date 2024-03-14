// Middleware for handling jwt
const { Locker, User, Admin } = require('../db/index.js')
const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');
async function jwtMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    // const password = req.headers.password;
    
    //extract the token from the authorisation string using regex
    const bearerToken = req.headers.authorization;
    
    const token = bearerToken.split(" ")[1];//got the token
    

    
    //then just check if that token is present in the db for the same user or not.

    const user = await User.findOne({username:username}); 
    const admin = await Admin.findOne({username:username});
    // ? search even in the Admin
    const realuser = (user && user._id) || (admin && admin._id);
    const userId = realuser._id;//found the user id

    //now check it against the same id in the locker db

    // const locker = await Locker.findOne();
    Locker.findOne({'tokens.userId': userId}).then((lockerItem)=>{
        const lockerToken = lockerItem.tokens.jwtToken;
        //now verify it 
        // const payload = {username, password};

        jwt.verify(token,lockerItem.jwtSecretKey,(err,decoded)=>{
            if (err) {
                return res.status(500).json({message: "Verification failed"})
            }
            else{
                next();

            }
        })

    })
        

    // if (lockerItem === undefined) {
    //     res.status(404).json({message: "token not found"});
    // }
    // else{
    //     next();
    // }

    }

module.exports = jwtMiddleware;