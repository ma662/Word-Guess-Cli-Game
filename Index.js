var Word = require('./Word');
var Letter = require('./Letter');
var inquirer = require("inquirer");

var wordBank = ['guess'];


// console.log(word.length);

var game = {
    
    lives : 'ALSKFJASKFJASKFjas',
    // activeWord,

    init : function () {
        // initialize stuff
    },
    
    newRound : function () {
        this.activeWord = new Word(wordBank[0]);
        
        for (var i=0; i<this.activeWord.currentWord.length; i++) {
            letterObj = new Letter(this.activeWord.currentWord[i]);
            this.activeWord.wordArr.push(letterObj);
        }
        
        console.log(this.activeWord.retWord());
        this.processGuess();
    },
    
    processGuess : function () {
        inquirer
        .prompt([
            {
                name: "guess",
                message: "Guess a letter! ",
                validate: function(value) {
                    if (value.length === 1) {
                        return true;
                    }
                    
                    console.log("\nBad input, try again\n");
                    return false;
                }
            }
        ])
        .then(function(answer) {
            // get input
            console.log(answer);
            // 't'
            game.activeWord.checkLetter(answer.guess);
            console.log(game.activeWord.retWord());
            // console.log(game.activeWord.wordArr);

            game.checkWin();
        });
    },

    checkWin : function () {
        var score = 0;

        // console.log(this.activeWord.currentWord.length);
        for (var i=0; i<this.activeWord.currentWord.length; i++) {
            if (this.activeWord.wordArr[i].guessed === true){
                score++;
            }
        }

        console.log(score);

        if (score === this.activeWord.currentWord.length){
            console.log("You win!\n");
            console.log("Next one: ");
            game.newRound();
        }
        else {
            game.processGuess();
        }

    },
};


game.newRound();