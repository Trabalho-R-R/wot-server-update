var resources = require('./../../resources/model');
WatchJS=require('./../../utils/watchJS/watch.js');

var actuator, interval;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;
//var localParams = {'simulate': false, 'frequency': 2000};
var localParams = {'simulate': true, 'frequency': 2000};

exports.start = function (params) {
  localParams = params;
  observe(model); //#A

  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    actuator.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function observe(model) {
    WatchJS.watch(model, "value", function(prop, action, newvalue, oldvalue){
        //console.log("value changed! from "+oldvalue+"to "+ newvalue);
        switchOnOff(model.value); //#B*
    });

     // Initial CODE
    /*Object.observe(what, function (changes) {
    console.info('Change detected by plugin for %s...', pluginName);
    switchOnOff(model.value); //#B*
     });
    return true;
    */
};

function switchOnOff(value) {
  if (!localParams.simulate) {
    actuator.write(value === true ? 1 : 0, function () { //#C
      //console.info('Changed value of %s to %s', pluginName, value);
    });
  }
    console.info('Changed value of %s to %s', pluginName, value);
};

function connectHardware() {
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio, 'out'); //#D
  console.info('Hardware %s actuator started!', pluginName);
};

function simulate() {

    //Initial CODE
    /* interval = setInterval(function () {
    // Switch value on a regular basis
    if (model.value) {
      model.value = false;
    } else {
      model.value = true;
    }
  }, localParams.frequency); */
  console.info('Simulated %s actuator started!', pluginName);
};

//#A Observe the model for the LEDs
//#B Listen for model changes, on changes call switchOnOff
//#C Change the LED state by changing the GPIO state
//#D Connect the GPIO in write (output) mode

