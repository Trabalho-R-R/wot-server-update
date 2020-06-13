// Final version
var express = require('express'),
  router = express.Router(),
  resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
  req.result = resources.pi.sensors; //#A
  var message="<h1>Sensors List</h1>";
  for (i in req.result) {
    message+= "<a href='"+req.result[i].url+"'>"+req.result[i].name+"</a>";
    message+= "</br>";
  }
  res.send(message);
  //next(); //#B
});

router.route('/pir').get(function (req, res, next) {
  req.result = resources.pi.sensors.pir;
  next(); //#B
});

router.route('/temperature').get(function (req, res, next) {
  req.result = resources.pi.sensors.temperature;
  next();
});

router.route('/humidity').get(function (req, res, next) {
  req.result = resources.pi.sensors.humidity;
  next();
});

//app.post('/myaction', function(req, res) {
//    res.send('You sent the name "' + req.body.name + '".');
//});


router.route('/newsensor').post(function (req, res, next) {
    //var newsensor=req.r;
    console.log ('newsensor');
    var sensors = resources.pi.sensors;
    sensors['newsensor'] = req.body; //#C
    req.result = sensors;
    //res.send("T: "+ JSON.stringify(req.result));
    next();
}).get(function (req, res, next){
  req.result = resources.pi.sensors.newsensor;
  next();
})

module.exports = router;

//#A Assign the results to a new property of the req object that you pass along from middleware to middleware
//#B Call the next middleware; the framework will ensure the next middleware gets access to req (including the req.result) and res



/*
// Initial version
var express = require('express'),
  router = express.Router(), //#A
  resources = require('./../resources/model');

router.route('/').get(function (req, res, next) { //#B
  res.send(resources.pi.sensors);  //#C
});

router.route('/pir').get(function (req, res, next) { //#D
  res.send(resources.pi.sensors.pir);
});

router.route('/temperature').get(function (req, res, next) { //#E
  res.send(resources.pi.sensors.temperature);
});

router.route('/humidity').get(function (req, res, next) { //#E
  res.send(resources.pi.sensors.humidity);
});

module.exports = router; //#F

//#A We require and instantiate an Express Router to define the path to our resources
//#B Create a new route for a GET request on all sensors and attach a callback function
//#C Reply with the sensor model when this route is selected
//#D This route serves the passive infrared sensor
//#E These routes serve the temperature and humidity sensor
//#F We export router to make it accessible for "requirers" of this file
*/