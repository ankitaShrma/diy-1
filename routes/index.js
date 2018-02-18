var express = require('express');
var passport = require('passport');
var flash = require('connect-flash')
var User = require('../models/user');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}
module.exports = function(passport){

    router.post('/endpoint', function(req, res){
  var obj = {};
  console.log('body: lol ' + JSON.stringify(req.body));
  res.send(req.body);
});
    
    router.get('/lol', function(req, res) {
    res.render('lol');
});

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { user: req.user, message: req.flash('message') });
    });

    router.get('/login', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('login', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash : true  
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true  
    })
           
);

    router.get('/material', function(req, res){
        if(req.isAuthenticated())
           { res.render('material');}
        else{
            console.log('log in to continue');
            res.redirect('login');}
    });

    /* GET Home Page */
    router.get('/profile', isAuthenticated, function(req, res){
        res.render('profile', { user: req.user });
    });

    router.get('/lola', function(req, res){
        res.render('lola');
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}

// router.get('/', function (req, res, next) {
//     res.render('index', { user : req.user });


// });

// router.get('/register', function(req, res) {
//     res.render('register', { info: null });
// });

// router.get('/lol', function(req, res) {
//     res.render('lol');
// });

// router.post('/register', passport.authenticate(), function(req, res) {
   
//     res.redirect('login')
// });

// router.get('/login', function(req, res) {
//     res.render('login', { user : req.user });
// });

// router.post('/login', passport.authenticate(), function(req, res) {
//     console.log('lol');
//     res.redirect('/');
// });

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

// // =====================================
//     // PROFILE SECTION =====================
//     // =====================================
//     // we will want this protected so you have to be logged in to visit
//     // we will use route middleware to verify this (the isLoggedIn function)
//     router.get('/profile', isLoggedIn, function(req, res) {
//         res.render('profile', {
//             user : req.user // get the user out of session and pass to template
//         });
            

// });

// // 



// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on 
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }


// router.get('/ping', function(req, res){
//     res.status(200).send("pong!");
// });

// module.exports = router;
