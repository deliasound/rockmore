var run = function(timingProvider) {
  // Timing Object
  var to = new TIMINGSRC.TimingObject({
    provider: timingProvider,
    range: [0, 52]
  });

  // Sequencer
  var Interval = TIMINGSRC.Interval; // shortcut
  var s = new TIMINGSRC.Sequencer(to);

  // Timed Data
  var data = {
    a: { data: "A", start: 0, end: 1 },
    b: { data: "B", start: 2, end: 3 },
    c: { data: "C", start: 4, end: 5 },
    d: { data: "D", start: 6, end: 7 },
    e: { data: "E", start: 8, end: 9 },
    f: { data: "F", start: 10, end: 11 },
    g: { data: "G", start: 12, end: 13 },
    h: { data: "H", start: 14, end: 15 },
    i: { data: "I", start: 16, end: 17 },
    j: { data: "J", start: 18, end: 19 },
    k: { data: "K", start: 20, end: 21 },
    l: { data: "L", start: 22, end: 23 },
    m: { data: "M", start: 24, end: 25 },
    n: { data: "N", start: 26, end: 27 },
    o: { data: "O", start: 28, end: 29 },
    p: { data: "P", start: 30, end: 31 },
    q: { data: "Q", start: 32, end: 33 },
    r: { data: "R", start: 34, end: 35 },
    s: { data: "S", start: 36, end: 37 },
    t: { data: "T", start: 38, end: 39 },
    u: { data: "U", start: 40, end: 41 },
    v: { data: "V", start: 42, end: 43 },
    w: { data: "W", start: 44, end: 45 },
    x: { data: "X", start: 46, end: 47 },
    y: { data: "Y", start: 48, end: 49 },
    z: { data: "Z", start: 50, end: 51 }
  };

  //create a synth and connect it to the master output (your speakers)
  var synth = new Tone.Synth().toMaster();

  // load timed data into sequencer
  Object.keys(data).forEach(function(key) {
    s.addCue(key, new Interval(data[key].start, data[key].end), data);
  });

  // Set up controls for timing object
  document.getElementById("pause").onclick = function() {
    to.update({ velocity: 0.0 });
  };
  document.getElementById("reset").onclick = function() {
    to.update({ position: 0.0, velocity: 0.0 });
  };
  document.getElementById("play").onclick = function() {
    to.update({ velocity: 1.0 });
  };
  document.getElementById("backwards").onclick = function() {
    to.update({ velocity: -1.0 });
  };

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
  });
};
