const { path } = require('path');

//check app for if in heroku deployment. 
exports.herokuCheck = ( app ) => {
    //add static files after heroku build
    if(process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'))
        app.get('*' , ( req , res ) => {
            res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
        })
    }
}

