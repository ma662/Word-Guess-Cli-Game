var Letter = require("./Letter.js");

    // // constructor ex
    // console.log(Letter);

    // var y = new Letter('y');

    // console.log(y);

    // console.log(y.retChar());


var Word = function (correctWord) { 
    this.currentWord = correctWord;
    // array of all letter objects of the current word
    this.wordArr = [];
    // this.correctWord = correctWord;

    // Word.prototype.toString = function() {
    this.retWord = function () { 
        var retString = '';

        for (var i=0; i<this.wordArr.length; i++) {
            // this is fucked
            retString += '  ' + this.wordArr[i].retChar();

            // retString += this.wordArr[i];
        }
        
        return retString;
    }

    this.checkLetter = function (input) { 

        for (var i=0; i<this.wordArr.length; i++) {
            // this.wordArr[i].input = input;
            this.wordArr[i].checker(input);
        }

    };
}

module.exports = Word;