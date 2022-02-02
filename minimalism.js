// Author: Mike Quigley
// Synthruary prompt: "minimalism"
// https://synthruary.com/
// 
// Requires Tone.js https://tonejs.github.io/
// 
// To Do:
// 1) comment flow
// 2) fix start/stop to reset sequences
// 3) write a prettier melody

const synth1 = new Tone.Synth().toDestination();
const synth2 = new Tone.Synth().toDestination();

const phrases = {
    phrase1: ['C4', 'E4', 'G4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D4', 'E4', 'G5', 'D5'],
    phrase2: ['C4', 'E4', 'G4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D4', 'E4', 'G5', 'D5'],
    

}
let counter = 0;

const sequence1 = new Tone.Sequence((time, note) => {

    synth1.triggerAttackRelease(note, '8n', time);

}, phrases.phrase1).start(0);

let sequence2 = new Tone.Sequence((time, note) => {

    synth2.triggerAttackRelease(note, '8n', time);

}, phrases.phrase2).start(0);

const changePhrase = () => {

    sequence2.stop();

    phrases.phrase2 = [...phrases.phrase2.slice(-1*(phrases.phrase2.length-1)), phrases.phrase2[0]];
    console.log(phrases.phrase2)

    sequence2 = new Tone.Sequence((time, note) => {

        synth2.triggerAttackRelease(note, '8n', time);
    
    }, phrases.phrase2).start(0);

    clearInterval(phraseInterval);
    time = Math.floor( Math.random() * 10000 + 2000);
    phraseInterval = setInterval(changePhrase, time);
}

let time = Math.floor( Math.random() * 10000 + 2000);
let phraseInterval;

let playing = false;
const play = document.getElementById('play-minimalism');
play.addEventListener('mouseover', () => {
    Tone.start();
});
play.addEventListener('click', () => {
    if (!playing) {
        Tone.Transport.start();
        playing = true;
        phraseInterval = setInterval(changePhrase, time);
        play.innerText = 'stop';
    } else {
        Tone.Transport.stop();
        phrases.phrase2 = [...phrases.phrase1];
        sequence2.stop();
        playing = false;
        clearInterval(phraseInterval);
        play.innerText = 'play';

    }
});