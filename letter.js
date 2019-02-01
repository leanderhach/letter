// Unminified version
// just incude this file at the bottom of your html and call as per the readme, or use the minified version

var running = false;

var Letter = function (options){

    //declare default values for options
    defaultOptions = {
        strings: ["You forgot the strings"],
        typeSpeed: 2500,
        deleteSpeed: 2500,
        stayDuration: 2500,
        smartDelete: true,
        repeat: true,
        element: document.getElementById('letter')
    }

    //check and set defaults for options thtat were not defined by the user
    this.options = options || {};

    for(option in defaultOptions){
        if(defaultOptions.hasOwnProperty(option) && !this.options.hasOwnProperty(option)){
            this.options[option] = defaultOptions[option];
        }
    }

}

Letter.prototype.start = function(){

    running = true;

    if(this.options.smartDelete){
        this.smartDeleteTyping();
    } else{
        this.startTyping();
    }
}

Letter.prototype.smartDeleteTyping = function(){

    if(running == true){
        let previousString = this.options.element.innerHTML;

        for(string in this.options.strings){

            for (let i = 0; i < string.length; i++) {
                if(string.charAt(i) !== previousString.charAt(i)){
                    this.removeLetters(i, string.substring(i, string.length));
                    return;
                }
                
            }
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

Letter.prototype.removeLetters = function(index, string){

    //get the current lentgh of the string displayed to the user
    let currentLength = this.options.element.innerHTML.length;
    let currentString = this.options.element.innerHTML;

    console.log(currentLength, index);

    //calculate the delete speed
    let timeoutLength = this.options.deleteSpeed / (currentLength - index)

    while(index < currentLength){
        console.log("things");
        currentLength--;
    }



}
Letter.prototype.stop = function(){
    this.running = false;
}




