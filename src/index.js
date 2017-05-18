//BASE SETUP///
//===========//
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/showcasedb');
var Bear        = require('./app/models/bear');

//configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function(req, res, next){
  console.log('Something is happening.');
  next();
})

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

router.get('/', function(req, res){
  res.json({"message":"Hooray! This is our new api."});
});

app.use('/api', router);
app.listen(port);
