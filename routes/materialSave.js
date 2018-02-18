var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');


const Material = require('../models/material');

var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({
 storage: storage
});
                            


router.post('/',upload.any(), function (req,res){

  var data = req.body;
  var images = req.files[0];
  var newFile = new Material();
  newFile.name = data.name;
  newFile.myimage = images.originalname;
  newFile.info = data.info;
  newFile.price=data.price;
  newFile.department=data.department;

  newFile.save(function(err, doc){
    if (err) {console.log('error while saving in database');}
    /*res.send(req.body);*/

    var filename = newFile._id + images.originalname;
                    console.log(filename);
  
                  
  });


  Material.create(images, function(error, image) {
    if (!error) {
    console.log("image created.");
    }
  });

            
  res.redirect('/');
  
})

module.exports = router;
