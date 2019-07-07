var express = require("express");
var mongoose = require("mongoose");
var ejwt = require('express-jwt');
var config = require('./config');

//app 
var app = express();
var port = config.PORT;

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);



// mongoose connection
mongoose.connect('mongodb://localhost/todoapp', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we're connected!");
});



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ejwt({secret:config.SECRET_KEY}).unless({path :['/', '/user/login', '/user/register', '/user/users']}));


app.get('/', (req, res) => {
  res.send('Hello welcome to my server');
});

//routes
var userRoute = require("./routes/route")
var todoRoute = require("./routes/troute")

app.use('/user', userRoute);
app.use('/api', todoRoute);

//server
app.listen(port, ()=>{console.log(`Server starts at ${port} ....`)});

