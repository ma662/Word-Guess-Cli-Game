var Word = require('./Word');
var Letter = require('./Letter');
var inquirer = require("inquirer");

var wordBank = ['guess', 'bedazzle', 'wallet'];

var player = {
    name : 'player00',
    bio : 'default description',
    wins : 0,
    losses : 0,

    showInfo : function () { 
        console.log("\n");
        console.log ("Player: " + this.name);
        console.log ("Bio: " + this.bio);
        console.log ("Total Lifetime Wins: " + this.wins);
        console.log("Losses: " + this.losses);
        console.log("\n");
        return;
    },

    options : function() {
        inquirer
        .prompt([
            {
                name: "selection",
                message: "choose an option",
                type: 'list',
                choices : [ '[ change name ]', '[ change bio ]', 'Back' ],
            }
        ])
        .then(function(answer) {
            console.log(answer);

            switch (answer.selection) {
                case '[ change name ]' : 
                    player.changeName();
                break;

                case '[ change bio ]' :
                    player.changeBio();
                break;

                default : 
                    game.home();
                break;
            }
        });
    },

    changeBio : function () {
        inquirer
        .prompt([
            {
                name: "new-bio",
                message: "What do you want your new bio to be?",
                type: 'input',
            }
            
        ])
        .then(function(answer) {
            var newBio = answer['new-bio'];
            player.bio = newBio;

            player.showInfo();
            game.home();
            return;
        });
    },

    changeName : function () { 
        inquirer
        .prompt([
            {
                name: "new-name",
                message: "What do you want your new name to be?",
                type: 'input',
            }
        ])
        .then(function(answer) {
            var newName = answer['new-name'];
            player.name = newName;

            player.showInfo();
            game.home();
        });
    },
};

var game = {

    home : function () {
        inquirer
        .prompt([
            {
                name: "selection",
                message: "Welcome to Word-Guess by Myles Alcala!",
                type: 'list',
                choices : ['New Game', 'Settings', 'Quit'],
            }
        ])
        .then(function(answer) {
            // console.log(answer);

            switch (answer.selection) {
                case 'New Game' :
                    game.newRound();
                break;

                case 'Settings' :
                    player.showInfo();
                    player.options();
                break;

                case 'Quit' :
                console.log("Good bye!");
                process.exit();
                break;

                default :
                console.log("Default case stuff");
                break;
            }

            // console.log(answer.selection);
        });
    },
    
    // vars
    lives : 10,
    score : 0,

    guess : '',
    history : [],

    // funcs
    init : function () {

        this.lives = 10;
        this.score = 0;

        this.guess = '';
        this.history = [];
    },

    display : function () {
        console.log(this.activeWord.retWord() + "\n");
        return;
    }, 
    
    newRound : function () {
        this.init();

        var rand = Math.floor(Math.random() * wordBank.length);

        this.activeWord = new Word(wordBank[rand]);
        
        for (var i=0; i<this.activeWord.currentWord.length; i++) {
            letterObj = new Letter(this.activeWord.currentWord[i]);
            this.activeWord.wordArr.push(letterObj);
        }
        
        this.display();
        this.receiveGuess();
        return;
    },
    
    receiveGuess : function () {
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
            game.processGuess(answer);
            return;
        });
    },

    processGuess : function (answer) {
        this.guess = answer.guess;

        // debugging        
        // console.log("this.guess : " + this.guess);
        // console.log("history contains guess :" + (this.history.indexOf(this.guess) > -1 ));

        // if not in history, push guess to history and do stuff
        if ( !(this.history.indexOf(this.guess) > -1 ) ) {
            this.history.push(this.guess);
            console.log("[ history ]");
            console.log(this.history);

            this.activeWord.checkLetter(this.guess);
            
            this.calcLives();
            console.log(this.lives + " lives remaining.\n");

            if (this.lives < 1) {
                game.gameover();
                return;
            }
            
            // console.log("game.checkWin() is: " + this.checkWin());
            if (this.checkWin()) {
                console.log("You win!");
                console.log("Next one: ");

                player.wins++;
                this.newRound();
                return;
            }            
        }
        else {
            console.log("\nYou've already guessed that letter");
        }

        this.display();
        this.receiveGuess();
        return;
    },

    checkWin : function () {
        this.calcScore();

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
        if ( !(this.activeWord.currentWord.indexOf(this.guess) > -1) ) {
            this.lives--;            
        }
    },

    gameover : function () {
        console.log("GAME OVER \n");
        player.losses++;
        game.home();
        return;
    },

    calcScore : function () { 
        var score = 0;

        for (var i=0; i<this.activeWord.currentWord.length; i++) {
            if (this.activeWord.wordArr[i].guessed === true) {
                score++;
            }
        }

        game.score = score;
        return;
    },
};

function isLetter(str) {
    return str.match(/[a-z]/i);
}

game.home();