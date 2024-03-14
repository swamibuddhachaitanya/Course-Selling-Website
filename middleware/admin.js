// Middleware for handling auth
const { Admin } = require('../db/index.js')

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    
        Admin.findOne({username:username , password: password}).then((admin)=>{
         
            
            if (!admin) {
                // const error = new Error("Admin not found");
                // next(error);
                return res.status(404).json({ error: 'not found' });
            } else {
                next();
            }

        })
            


    }

module.exports = adminMiddleware;