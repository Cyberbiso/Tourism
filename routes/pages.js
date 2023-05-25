const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();


router.get('/',(req,res) => {
    res.render('index');
});

router.get('/a',authController.isLoggedIn,(req,res) => {
    console.log(req.user); // log the user object
    res.render('homeagent', {
        user: req.user
    });
});

router.get('/h',authController.isLoggedIn,(req,res) => {
    console.log(req.user); // log the user object
    res.render('hometraveler', {
        user: req.user
    });
});

router.get('/register',(req,res) => {
    res.render('register');
});

router.get('/login',(req,res) => {
    res.render('login');
});

router.get('/profilea', authController.isLoggedIn, (req,res) => {
    res.render('profilea', {
        user: req.user
    });
});

router.get('/profilet', authController.isLoggedIn, (req,res) => {
    res.render('profilet', {
        user: req.user
    });
});

router.get('/gallery', authController.isLoggedIn, (req,res) => {
    res.render('gallery', {
        user: req.user
    });
});

router.get('/delete', authController.isLoggedIn,authController.deleteTour, (req,res) => {
    res.render('delete', {
        user: req.user,
        tours: result
    });
});

router.get('/insert', authController.isLoggedIn, (req,res) => {
    res.render('insert', {
        user: req.user
    });
});

router.get('/book', authController.isLoggedIn, (req,res) => {
    res.render('book', {
        user: req.user
    });
});

router.get('/trip', authController.isLoggedIn, (req,res) => {
    res.render('trip', {
        user: req.user
    });
});

router.get('/trip/search', authController.isLoggedIn, authController.searchTours, (req, res) => {
    res.render('trip', {
      user: req.user,
      tours: req.tours,
      searchTerm: req.query.searchTerm
    });
  });
  

router.get('/viewtable', authController.isLoggedIn, authController.viewTable, (req, res) => {
    res.render('viewtable', {
      user: req.user
    });
  });
  
  router.get('/viewtablet', authController.isLoggedIn, authController.viewTablet, (req, res) => {
    res.render('viewtablet', {
      user: req.user
    });
  });


module.exports = router;