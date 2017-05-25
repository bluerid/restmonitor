const express = require('express');
var router = express.Router();
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/showcasedb');
var Bear        = require('../models/bear');

module.exports = app => {

  router.use(function(req, res, next){
    console.log('Something is happening.');
    next();
  })

  router.get('/', function(req, res){
    res.json({"message":"Hooray! This is our new api."});
  });

  router.route('/bears')
    .post(function(req, res){
      var bear = new Bear();
      bear.name = req.body.name;

      bear.save(function(err){
        if(err)
          res.send(err);

        res.json({message:"This saves our data.", headers:req.headers, url:req.url});
      });
    })
    .get(function(req, res){
      Bear.find(function(err, bears){
        if(err)
          res.send(err);

        res.json({message: "Retrieved Bears", bears: bears});
      });
    });

  router.route('/bears/:bear_id')
    .get(function(req, res){
      Bear.findById(req.params.bear_id, function(err, bear){
        if(err)
          res.send(err);

        res.json({message:"Retrieved Bear", bear: bear});
      });
    })
    .put(function(req, res){
        Bear.findById(req.params.bear_id, function(err, bear){
          if(err)
            res.send(err);

          bear.name = req.body.name;
          bear.save(function(err){
            if(err)
              res.send(err);

            res.json({ message: 'Bear Updated!' });
          });
        });
      })
    .delete(function(req, res){
        Bear.remove({ _id: req.params.bear_id }, function(err, bear){
          if(err)
            res.send(err)

          res.json({message: "Bear Deleted!"})
        });
    });

    return router;
}
