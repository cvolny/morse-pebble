var MORSE_JSON_URL = "https://raw.githubusercontent.com/cvolny/morse-pebble/master/morse.json";

var morse_lookup_table = {};
var message = "";
var current = "";

function update_display() {
  simply.subtitle(message);
}

function load_morse_lookup(jsonurl) {
  ajax({ url: jsonurl, type: 'json' }, function(data) {
    morse_lookup_table = data;
    console.log('Morse JSON Loaded!');
  });
}

simply.on('singleClick', function(e) {
 console.log(util2.format('single clicked $button!', e));
  if (e.button === 'up') {
    current = current + ".";
  } else if (e.button === 'down') {
    current = current + "-";
  } else if (e.button === 'select') {
    if (current === "") {
      message = message + " ";
    } else {
      var c = lookup_morse_by_char(current);
      if (c === false) {
        console.log("Failed resolution, deleting buffer");
        simply.vibe("double");
      } else {
        console.log("Resolved morse to char '" + c + "'");
        message = message + c;
      }
      current = "";
    }
    update_display();
  }
  console.log("Current input '" + current + "'");
});

simply.on('longClick', function(e) {
  console.log(util2.format('long clicked $button!', e));
  if (e.button === 'select') {
    simply.vibe();
    // send msg
    message = "";
    
  } else if (e.button === "down") {
    simply.vibe();
    message = message.substring(0, message.length - 1);
  }
  update_display();
});

function lookup_morse_by_char(pat) {
  if (pat in morse_lookup_table) {
    return morse_lookup_table[pat];
  } else {
    return false;
  }
}

simply.text({ title: 'Morse', subtitle: "Loading..." });
load_morse_lookup(MORSE_JSON_URL);
update_display();
