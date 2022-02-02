// Author: Mike Quigley
// Synthruary prompt: "minimalism"
// https://synthruary.com/
//
// Requires Tone.js https://tonejs.github.io/

// Pan and volume for each synth
const panVol1 = new Tone.PanVol(-0.25, -12).toDestination();
const panVol2 = new Tone.PanVol(0.25, -12).toDestination();

//  Create synths with custom envelopes, route through panVols
const synth1 = new Tone.Synth({
  envelope: { attack: 0.05, release: 0.2 },
}).connect(panVol1);
const synth2 = new Tone.Synth({
  envelope: { attack: 0.01, release: 0.2 },
}).connect(panVol2);

// Pitch values for sequences
const phrases = {
  phrase1: [
    "C4",
    "E4",
    "G4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D4",
    "E4",
    "G5",
    "D5",
  ],
  phrase2: [
    "C4",
    "E4",
    "G4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D4",
    "E4",
    "G5",
    "D5",
  ],
};

//  Create sequence for synth1
const sequence1 = new Tone.Sequence((time, note) => {
  synth1.triggerAttackRelease(note, "8n", time);
}, phrases.phrase1).start(0);

//  Create sequence for synth2
let sequence2 = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "8n", time);
}, phrases.phrase2).start(0);

// Stop existing sequence2, offset phrase, start new sequence2
const changePhrase = () => {
  sequence2.stop();

  phrases.phrase2 = [
    ...phrases.phrase2.slice(-1 * (phrases.phrase2.length - 1)),
    phrases.phrase2[0],
  ];
  console.log(phrases.phrase2);

  sequence2 = new Tone.Sequence((time, note) => {
    synth2.triggerAttackRelease(note, "8n", time);
  }, phrases.phrase2).start(0);

  //   clears old interval
  clearInterval(phraseInterval);
  //   resets random time for interval between 2-10 secs
  time = Math.floor(Math.random() * 10000 + 2000);
  phraseInterval = setInterval(changePhrase, time);
};

// Sets initial random time for interval
let time = Math.floor(Math.random() * 10000 + 2000);
let phraseInterval;

// Track playing status
let playing = false;

// Monitor play button to start Tone
const play = document.getElementById("play-minimalism");
play.addEventListener("mouseover", () => {
  Tone.start();
});
// Monitor play button to play or stop sequences, reset sequence2, toggle button text
play.addEventListener("click", () => {
  if (!playing) {
    Tone.Transport.start();
    playing = true;
    phraseInterval = setInterval(changePhrase, time);
    play.innerHTML = "⏹️";
  } else {
    Tone.Transport.stop();
    phrases.phrase2 = phrases.phrase1;
    sequence2.stop();
    playing = false;
    clearInterval(phraseInterval);
    play.innerHTML = "▶️";
  }
});
