var config = require("./config");
var _ = require("lodash");
var gen = require('random-seed');
var rand = gen.create();

//yes, you found me, I'm really dumb, you just need to make me SMART
function nextGuess(gameId, roundId, secretLength, participants, myGuessTracker){

    // Suggestions

    // https://en.wikipedia.org/wiki/Mastermind_(board_game)
    // https://puzzling.stackexchange.com/questions/546/clever-ways-to-solve-mastermind
    // https://math.stackexchange.com/questions/1192961/knuths-mastermind-algorithm

    // Some more hints
    // 1. Winning condition is highest points, nothing else.
    // 2. You may want to play with strongest enemies, use participants array to see roundScore/gameScore so-far for each active participant in this round.
    // 3. Do you really want to kill enemies, remember as soon you kill someone, you need to play with another one.
    // 4. In one atttempt you can guess max 5, doesn't matter for 5 different enemies or for a single one.
    // 5. Use myGuessTracker

    // Here you go with a dumb algo

    var myGuess = { Guesses: []};

    // Remove myself, I don't want to guess my secet and eventually suicide. Do I? :)
    // Also remove "dead" enemies
    _.remove(participants, function(item) {
        return item.teamId === config.team || !item.isAlive;
    });

    if(participants.length == 0)
        return myGuess;

    for(i=0; i<5; i++){
        var participant = participants[Math.floor(Math.random()*participants.length)]; //Choose a random participant

        var secretRange = Math.pow(10, secretLength-1);
        var secret = rand.intBetween(secretRange, secretRange*10-1);

        myGuess.Guesses.push({ Team: participant.teamId, Guess: `${secret}` });
    }
    return myGuess;

}

module.exports = { nextGuess : nextGuess }