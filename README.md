# letter
A simple, dependency-free javascript typing plugin


## Installation

 Include the letter.js file at the end of your html:

```
    <script src="letter.js"></script>
```

## Usage

All that's really needed is shown below:

###### HTML:
```
<div id="letter"><span id="letterText">Stuff in here will be replaced by letter</span></div>
```

###### JS:
```
var options = {
    strings: ["The first One", "The second One", "Something completely Different"],
}
var letter = new Letter(options)

letter.start();
```

Simply pass your strings into the options, and include #letter. If you would like to use a different element, 
pass this element in the options, as follows:

```
var options = {
    element: document.querySelector('#other-element'),
}
```

# Options

There are several options that can be configured when you intialise letter

Please note that if you want to use the cursor options the `letter.css` stylesheet should be included in your html

| Command | Type | Options| Effect | default |
| ------- | ---- | ------ | ------ | ------- |
| `strings` | array | | The strings that letter will use | ["You forgot the strings"] |
| `typeSpeed` |int| | How long it takes to type a string | 2500 |
| `deleteSpeed` |int| | How long it takes to delete a string | 2500 |
| `stayDuration` |int| | How long a string stays visible | 2500 |
| `smartDelete` |boolean | | If enabled, letter will only remove characters up to the first one that matches the next string | true |
| `repeat` |boolean | | If enabled, will repeat the strings | true |
| `element` |element | | The element that will be used by letter | #letter |
| `cursor` | string | none, default, classic | Select a cursor to simulate actual typing | none |
| `cursorBlink` | boolean | | Select whether or not the cursor should blink | false |
| `color` | string | | Set the color of text | #FFFFFF |
| `cursorColor` | string | | Set the color of the cursor | #FFFFFF |
