// Unminified version
// just incude this file at the bottom of your html and call as per the readme, or use the minified version

var running = false;

var Letter = function (options){

    //declare default values for options
    let defaultOptions = {
        strings: ["You forgot the strings"],
        typeSpeed: 2500,
        deleteSpeed: 2500,
        stayDuration: 2500,
        smartDelete: true,
        repeat: true,
        element: document.querySelector('#letter > #text'),
        cursor:'none',
        cursorBlink: false
    }

    //check and set defaults for options thtat were not defined by the user
    this.options = options || {};

    for(let option in defaultOptions){
        if(defaultOptions.hasOwnProperty(option) && !this.options.hasOwnProperty(option)){
            this.options[option] = defaultOptions[option];
        }
    }

}

Letter.prototype.start = function(){

    this.setCursor();

    let totalTimeout = this.options.deleteSpeed + this.options.typeSpeed + this.options.stayDuration;
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
            if(i != scope.options.strings.length){
                getItem(scope);
            } else if(i == scope.options.strings.length && scope.options.repeat) {
                i = 0;
                getItem(scope);
            }
        }, totalTimeout)
    }

    getItem(scope);
}

Letter.prototype.smartDeleteTyping = function(string){

    //weird compatibility issue with webstorm
    string = String(string);

    let previousString = this.options.element.innerHTML;

    for (let i = 0; i < string.length; i++) {
        if(string.charAt(i) !== previousString.charAt(i)) {
            console.log(string[i]);
            console.log(i);
            this.removeLetters(i, string.substring(i, string.length));
            return;
        }
    }
}

Letter.prototype.startTyping = function(){

    let i = 0;
    let nextString = this.options.strings[i];

    while(running === true && i < this.options.strings.length){

        //don't modify the previous string until the user-specified timeout has been reached
        setTimeout(() => {
            let previousString = this.element.innerHTML

            //if the string is different, start removing characters
            if(nextString !== previousString){
                this.removeLetters(0, nextString);
            }
    
            i++;
    
            //reset to the beginning at the end of each loop if options set
            if(i == this.options.strings.length && this.options.repeat){
                i = 0;
            }
        }, this.options.stayDuration);
    }
}


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
                console.log("running it again", currentLength, index);
                removeLoop(scope);
            } else{
                scope.writeLetters(newString);
            };
        }, timeoutLength);
    };


    removeLoop(scope);
}

Letter.prototype.writeLetters = function(string){

    let charCount = string.length
    let i = 0;
    let timeoutLength = this.options.typeSpeed / charCount;
    let scope = this;

    let writeLoop = function (scope) {
        console.log("writing", string[i]);
        scope.options.element.innerHTML += string[i];
        i++;

        setTimeout(() => {
            if(i != charCount){
                writeLoop(scope);
            }
        }, timeoutLength)
    }

    writeLoop(scope);

}

Letter.prototype.setCursor = function(){
    if(this.options.cursor !== "none") {

        this.options.element.parentElement.style.position = "relative";
        let cursor = document.createElement("span");
        cursor.setAttribute("id", "letterCursor");
        this.options.element.parentNode.appendChild(cursor);

        switch (this.options.cursor) {
            case 'default':
                Object.assign(document.querySelector("#letterCursor").style, {
                    height: 'calc(100% - 10px)',
                    width: '2px',
                    background: 'white',
                    position: 'absolute',
                    'margin-top': '5px',
                    'margin-bottom': '5px',
                    'margin-left': '2px'
                })
        }

        if(this.options.cursorBlink){
            let blink = function(cursor){
                cursor.style.opacity = (cursor.style.opacity === '1' ? '0' : '1');

                setTimeout(() => {
                    blink(cursor);
                }, 400);
            }

            blink(cursor);
        }
    }
}

Letter.prototype.stop = function(){
    this.running = false;
}




