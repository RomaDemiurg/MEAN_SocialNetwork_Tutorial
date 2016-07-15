var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

// Module Instances
var multipartMiddleware = multipart();
var app = express();

// Controllers
var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');
var wasteController = require('./server/controllers/waste-controller');
var usersController = require('./server/controllers/users-controller');

// Mongo Connection
mongoose.connect('mongodb://localhost:27017/time-waste');

// Middlewares
app.use(bodyParser.json());
app.use(multipartMiddleware);

// Expose below uri path as static
app.use('/app', express.static(__dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));

// Main Angular EntryPoint
app.get('/', function(req, res){
    res.sendfile('index.html');
});

// Authentication API
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

// Profile API
app.post('/api/profile/editPhoto', multipartMiddleware, profileController.updatePhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

// Waste API
app.post('/api/waste/post', wasteController.postWaste);
app.post('/api/waste/get', wasteController.getWastes);

// User API
app.get('/api/users/get', usersController.getUsers);
app.post('/api/users/follow', usersController.followUser);

// Run Express
app.listen('3000', function (){
    console.log("Listening for Local Host 3000");
});
