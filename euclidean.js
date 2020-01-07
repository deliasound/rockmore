var run = function(timingProvider) {
    // Timing Object
    var to = new TIMINGSRC.TimingObject({ provider: timingProvider, velocity: 0 });
    var value = document.getElementById('value');

    var synth = new Tone.Synth().toMaster();
    /*to.on("timeupdate", function () {
      console.log(to.query().position.toFixed(2)); 
    });*/



    var beat = 0;
    var theInterval;

    function playBeat() {
        if (switchOn()) {
            if (beat == 0) {
                synth.triggerAttackRelease("C4", "2n");
            } else if (pattern[beat] == 1) {
                synth.triggerAttackRelease("C5", "8n");
            }
            //console.log(beat);
            beat++;
            if (beat == getSteps()) {
                beat = 0;
            }
        }
    }

    function getSteps() {
        return stepsKnob.value;
    }

    function getPulses() {
        return pulsesKnob.value;
    }

    function getBpm() {
        return bpmKnob.value;
    }

    function switchOn() {
        return onOffSwitch.value == 1;
    }

    function resetPattern() {
        if (theInterval) {
            theInterval.cancel();
            theInterval = undefined;
        }
        beat = 0;
        pattern = bjorklund(getSteps(), getPulses());
        console.log(pattern);
        theInterval = TIMINGSRC.setIntervalCallback(to, playBeat, 1 / getSteps());
    }

    var bpmKnob = document.getElementById('bpm');
    bpmKnob.addEventListener('change', function(e) {
        to.update({ position: 0.0, velocity: e.target.value / 60 });
    });

    var onOffSwitch = document.getElementById('onOff');
    onOffSwitch.addEventListener('change', function(e) {
        if (e.target.value == 1) {
            to.update({ position: 0.0, velocity: bpmKnob.value / 60 });
        } else {
            to.update({ velocity: 0.0 });
        }
    });

    var stepsKnob = document.getElementById('steps');
    stepsKnob.addEventListener('change', resetPattern);

    var pulsesKnob = document.getElementById('pulses');
    pulsesKnob.addEventListener('change', resetPattern);

    resetPattern();
};