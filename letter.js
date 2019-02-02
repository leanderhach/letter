// Unminified version
// just include this file at the bottom of your html and call as per the readme, or use the minified version

let running = false;

let Letter = function (options){

    let defaultOptions = {
        strings: ["You forgot the strings"],
        typeSpeed: 2500,
        deleteSpeed: 2500,
        stayDuration: 2500,
        smartDelete: true,
        repeat: true,
        element: document.querySelector('#letter > #text'),
        cursor:'none',
        cursorBlink: false,
        color: '#FFFFFF',
        cursorColor: '#FFFFFF'
    };

    this.options = options || {};

    for(let option in defaultOptions){
        if(defaultOptions.hasOwnProperty(option) && !this.options.hasOwnProperty(option)){
            this.options[option] = defaultOptions[option];
        }
    }

};


/*
START


must be called by the user to start Letter properly. The reason it doesn't do this automatically is in case a user wants
to start and stop Letter manually via another script
 */
Letter.prototype.start = function(){

    running = true;

    this.options.element.style.color = this.options.color;
    this.setCursor();

    let totalTimeout = this.options.deleteSpeed + this.options.typeSpeed + this.options.stayDuration + 500;
    let i = 0;
    let scope = this;

    let getItem = function(scope){

        if(scope.options.smartDelete){
            scope.smartDeleteTyping(scope.options.strings[i]);
        } else{
            scope.startTyping(scope.options.strings[i]);
        }
        i++;

        setTimeout(() => {
            if(i !== scope.options.strings.length && running){
                getItem(scope);

            } else if(i === scope.options.strings.length && scope.options.repeat && running) {
                i = 0;
                getItem(scope);
            }
        }, totalTimeout)
    };

    getItem(scope);
};

/*
SMART DELETE

The difference from normal delete is that this function wil only delete from the last character that both strings have in common
e.g 'the first phrase' and 'the second phrase' => 'the' will never be deleted
 */
Letter.prototype.smartDeleteTyping = function(string){

    //conversion to string object -- may be a webstorm bug
    string = String(string);

    let previousString = this.options.element.innerHTML;

    for (let i = 0; i < string.length; i++) {
        if(string.charAt(i) !== previousString.charAt(i)) {
            this.removeLetters(i, string.substring(i, string.length));
            return;
        }
    }
};

/*
START TYPING

if smart delete is set to false, call the removeLetters function straight away with a start point of 0
 */
Letter.prototype.startTyping = function(string){
    this.removeLetters(0, string);
};

/*
REMOVE LETTERS

takes the new string, and the index (only relevant if using smart delete), and remove letter individually
the delay between letter removals is a function of the total deleteSpeed divided by how many letter are being removed
Then start the writeLetters function
 */
Letter.prototype.removeLetters = function(index, newString){

    //get the current length of the string displayed to the user
    let currentLength = this.options.element.innerHTML.length;
    let timeoutLength = this.options.deleteSpeed / (currentLength - index);
    let scope = this;

    let removeLoop = function(scope) {
        scope.options.element.innerHTML = scope.options.element.innerHTML.slice(0, -1);
        currentLength--;
        setTimeout(() => {
            if (currentLength > index) {
                removeLoop(scope);
            } else{
                scope.writeLetters(newString);
            }
        }, timeoutLength);
    };


    removeLoop(scope);
};

/*
WRITE LETTERS

Writes each individual character from the new string, with a delay between each determined by the typeSpeed divided
by how many letters have to be typed
 */
Letter.prototype.writeLetters = function(string){

    let charCount = string.length;
    let i = 0;
    let timeoutLength = this.options.typeSpeed / charCount;
    let scope = this;

    let writeLoop = function (scope) {
        scope.options.element.innerHTML += string[i];
        i++;

        setTimeout(() => {
            if(i !== charCount){
                writeLoop(scope);
            }
        }, timeoutLength)
    };

    writeLoop(scope);

};


/*
SET CURSOR

checks if the user set a cursor, then creates a new element and assigns it the relevant properties
 */
Letter.prototype.setCursor = function(){

    if(this.options.cursor !== "none") {

        this.options.element.parentElement.style.position = "relative";
        let cursor = document.createElement("span");
        cursor.setAttribute("id", "letterCursor");
        this.options.element.parentNode.appendChild(cursor);

        switch (this.options.cursor) {

            case 'default':

                document.querySelector("#letterCursor").classList.add("default-cursor");
                Object.assign(document.querySelector("#letterCursor").style, {
                    background: this.options.cursorColor,
                });
                break;

            case 'classic':

                document.querySelector("#letterCursor").classList.add("classic-cursor");
                Object.assign(document.querySelector("#letterCursor").style, {
                    background: this.options.cursorColor,
                    borderColor:this.options.cursorColor
                });
        }

        if(this.options.cursorBlink){
            let blink = function(cursor){
                cursor.style.opacity = (cursor.style.opacity === '1' ? '0' : '1');

                setTimeout(() => {
                    blink(cursor);
                }, 400);
            };

            blink(cursor);
        }
    }
};

Letter.prototype.stop = function(){
    running = false;
};




