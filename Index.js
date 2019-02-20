var Word = require('./Word');
var Letter = require('./Letter');
var inquirer = require("inquirer");

var wordBank = ['guess'];



// console.log(word.length);

var game = {

    home : function () {
        inquirer
        .prompt([
            {
                name: "selection",
                message: "Welcome to Word-Guess by Myles Alcala!",
                type: 'list',
                choices : ['Play', 'Quit'],
            }
        ])
        .then(function(answer) {
            console.log(answer);

            switch (answer.selection) {
                case 'Play' :
                game.newRound();
                break;

                case 'Quit' :
                console.log("Good bye!");
                process.exit();
                break;

                default :
                console.log("Default case stuff");
                break;
            }

            console.log(answer.selection);
        });

    },
    
    lives : 10,
    score : 0,


    guess : '',
    history : [],

    init : function () {

        game.lives = 10;
        game.score = 0;
        game.guess = '',
        game.history = [];
    },

    display : function () {
        console.log(this.activeWord.retWord());
        return;
    }, 
    
    newRound : function () {
        this.init();

        var rand = Math.floor(Math.random() * wordBank.length);

        this.activeWord = new Word(wordBank[rand]); // Add Logic to Randomize
        
        for (var i=0; i<this.activeWord.currentWord.length; i++) {
            letterObj = new Letter(this.activeWord.currentWord[i]);
            this.activeWord.wordArr.push(letterObj);
        }
        
        this.display();
        this.processGuess();
        return;
    },
    
    processGuess : function () {
        inquirer
        .prompt([
            {
                name: "guess",
                message: "Guess a letter! ",
                validate: function(value) {
                    if (value.length === 1 && isLetter(value)) {
                        return true;
                    }
                    else {
                        console.log("\nInvalid input, try again\n");
                        return false;
                    }
                }
            }
        ])
        .then(function(answer) {
            game.run(answer);
            return;
        });
    },

    run : function (answer) {
        this.guess = answer.guess;

        // debugging        
        // console.log("this.guess : " + this.guess);
        // console.log("history contains guess :" + (this.history.indexOf(this.guess) > -1 ));

        // if not in history, push guess to history
        if ( !(this.history.indexOf(this.guess) > -1 ) ) {
            this.history.push(this.guess);
            console.log(this.history);

            this.activeWord.checkLetter(this.guess);
            
            this.calcLives(this.guess);
            this.calcScore();
            
            console.log("game.checkWin() is: " + this.checkWin());
            if (this.checkWin()) {
                console.log("You win!");
                console.log("Next one: ");
                this.newRound();
                return;
            }            
        }
        else {
            console.log("\nYou've already guessed that letter");
        }

        this.display();
        this.processGuess();
        return;
    },

    checkWin : function () {

        // win condition
        if (game.score === this.activeWord.currentWord.length) {
            // return game.newRound();
            return true;
        }
        else {
            return false;
        }
    },

    calcLives : function () { 
        // if ()

        // return this.lives--;
    },

    calcScore : function () { 
        var score = 0;

        for (var i=0; i<this.activeWord.currentWord.length; i++) {
            if (this.activeWord.wordArr[i].guessed === true) {
                score++;
            }
        }

        game.score = score;
        console.log("game.score is : " + game.score);
    },
};


function isLetter(str) {
    // return str.length === 1 && str.match(/[a-z]/i);
    return str.match(/[a-z]/i);
}

game.home();