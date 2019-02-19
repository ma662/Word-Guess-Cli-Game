require("./Letter.js");

var Word = function (correctWord, input) { 
    // array of all letter objects of the current word
    this.wordArr = [];
    this.input = input;
    // this.correctWord = correctWord;

    // Word.prototype.toString = function() {
    this.retWord = function () { 
        var retString = '';

        for (var i=0; i<this.wordArr.length; i++) {
            // this is fucked
            this.wordArr[i] = this.wordArr[i].retChar();

            retString += this.wordArr[i];
        }
        
        return retString;
    }

    this.checkLetter = function (input) { 

        for (var i=0; i<this.wordArr.length; i++) {
            this.wordArr[i].input = input;
            this.wordArr[i].checkLetter();
        }

    };
}

var word = 'guess';

for (var i=0; i<word.length; i++) {
    var rawWord = word;

        // rawWord[i]
    
    var newWord = new Word ();
    newWord.wordArr.push(rawWord[i]);
}

console.log(newWord.wordArr);


  
// this.addCastMember = function(gender, name, role) {
//     this.cast.push(new CastMember(gender, name, role));
//   };

module.exports(Word);