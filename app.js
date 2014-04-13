var MORSE_JSON_URL = "https://doc-0c-6c-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/tbbjaj3fgp2co0t3voces3n61hbv6vtp/1397361600000/13528935449689788747/*/0B9faOy_iuEqCWGF5Y1owNFozem8?h=16653014193614665626&e=downloadhttps://doc-0c-6c-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/tbbjaj3fgp2co0t3voces3n61hbv6vtp/1397361600000/13528935449689788747/*/0B9faOy_iuEqCWGF5Y1owNFozem8?h=16653014193614665626&e=download";

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
    current = current + "-";
  } else if (e.button === 'down') {
    current = current + ".";
  } else if (e.button === 'select') {
    current = "";
    message = message + " ";
  }
  console.log("Current input '" + current + "'");
  var c = lookup_morse_by_char(current);
  if (c !== false) {
    console.log("Resolved morse to char '" + c + "'");
    simply.vibe();
    message = message + c;
    current = "";
  }
  update_display();
});

simply.on('longClick', function(e) {
  console.log(util2.format('long clicked $button!', e));
  if (e.button === 'select') {
    simply.vibe("double");
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
