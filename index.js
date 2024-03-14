const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const { initialiseLocker } = require('./db/index.js');

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;

initialiseLocker().then(()=>{

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})


