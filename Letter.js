function Letter (char, input) {
    // display character or blank placeholder _ 
    this.input = input;

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

    this.checker = function () {
        if (this.input === this.char) {
            this.guessed = true;
        }

        // this.retChar();s
    };
};

module.exports(Letter);