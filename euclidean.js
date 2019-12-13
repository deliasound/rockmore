var run = function(timingProvider) {
  // Timing Object
  var to = new TIMINGSRC.TimingObject({provider:timingProvider});
  var value = document.getElementById('value');
  var synth = new Tone.Synth().toMaster();
  /*to.on("timeupdate", function () {
    console.log(to.query().position.toFixed(2)); 
  });*/
  
  var bpm = 120;
  
  var b64th = bpm * 64/60
  var b128th = bpm * 128/60
  var theInterval = TIMINGSRC.setIntervalCallback(to, function () {
    synth.triggerAttackRelease("C4", "8n");
    
  }, 1, {offset:0});
  var theInterval = TIMINGSRC.setIntervalCallback(to, function () {
    synth.triggerAttackRelease("C5", "8n");
    
  }, 1, {offset:0.5});

  // Set up controls for timing object
  document.getElementById("pause").onclick = function() {
    to.update({ velocity: 0.0 });
  };
  document.getElementById("reset").onclick = function() {
    to.update({ position: 0.0, velocity: 0.0 });
  };
  document.getElementById("play").onclick = function() {
    console.log('start');
   
    to.update({ position: 0.0, velocity: 1 });
  };
  document.getElementById("backwards").onclick = function() {
    to.update({ velocity: -1.0 });
  };
/*
  // Report position of timing objects
  var pos = document.getElementById("pos");
  to.on("timeupdate", function() {
    pos.innerHTML = to.query().position.toFixed(2);
  });

  // Visualize timed data
  var html = "";
  Object.keys(data).forEach(function(key) {
    html += "<div id='" + key + "'>" + JSON.stringify(data[key]) + "</div>";
  });
  document.getElementById("data").innerHTML = html;
  s.on("change", function(e) {
    var el = document.getElementById(e.key);
    el.classList.add("active");

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
  });
  s.on("remove", function(e) {
    var el = document.getElementById(e.key);
    el.classList.remove("active");
  });*/
};
