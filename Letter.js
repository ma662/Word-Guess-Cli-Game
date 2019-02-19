function Letter (char) {
    // display character or blank placeholder _ 
    // this.input;

    this.char = char;
    this.guessed = false;

    // show either correct letter or display _
    this.retChar = function () {
        if (this.guessed) {
            return this.char;
        }
        else {
            return '_';
        }
    };

    this.checker = function (input) {
        if (input === this.char) {
            this.guessed = true;
        }

        // this.retChar();s
    };
};

module.exports = Letter;



// var e = new Letter ('e');

// console.log(e);

// Letter {
//     char: 'e',
//     guessed: false,
//     retChar: [Function],
//     checker: [Function] }
// }

// e.input = '7';

// console.log(e);
