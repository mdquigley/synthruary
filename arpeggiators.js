// Author: Mike Quigley
// Synthruary prompt: "arpeggiators"
// https://synthruary.com/
//
// Requires Tone.js https://tonejs.github.io/

const arpeggiators = () => {
  const pattern = new Tone.Pattern(
    (time, note) => {
      const synth = new Tone.Synth().toDestination();
    },
    ["C2", "D4", "E5", "A6"],
    "upDown"
  );

  // Track playing status
  let playArp = false;

  // Monitor play button to start Tone
  const play = document.getElementById("play-arpeggiators");
  play.addEventListener("mouseover", () => {
    Tone.start();
  });
  // Monitor play button to play or stop sequences, reset sequence2, toggle button text
  play.addEventListener("click", () => {
    if (!playArp) {
      Tone.Transport.start();
      pattern.start(0);
      playArp = true;
      play.innerHTML = "⏹️";
    } else {
      Tone.Transport.stop();
      playArp = false;
      play.innerHTML = "▶️";
    }
  });
};

arpeggiators();
