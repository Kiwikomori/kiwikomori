function osumichange() {
    document.getElementById("osumi").src = "images/characters/osumi_2.png";
}

/* get the back button element */
const backBtn = document.getElementById('back');

/* uncheck all checkboxes when Back button is clicked */
  backBtn.addEventListener('click', function uncheck() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
  });

/* navigation between rooms */
const rooms = ['north', 'east', 'southFront', 'west'];
let currentRoom = '0';
let insideBR = false; // false by default

function go(where) {
  const fade = document.getElementById('fade');

  // fade out
  fade.classList.add('out');

  setTimeout(() => {

    // hide current room and show new room while fading
    document.querySelector('.room.active').classList.remove('active');

    if (where === 'left') {
      currentRoom = (currentRoom - 1 + rooms.length) % rooms.length;
    }
    // else if going right
    else {
      currentRoom = (currentRoom + 1) % rooms.length;
    }

    // give current room active class
    document.getElementById(rooms[currentRoom]).classList.add('active');

    // fade in
    fade.classList.remove('out');
  }, 450); // duration of fade out
}

function visibilityCheck() {
  // get the buttons
  const left = document.getElementById('navLeft');
  const right = document.getElementById('navRight');
  const back = document.getElementById('navBack');

  if (insideBR) {
    left.style.display = 'none';
    right.style.display = 'none';
    back.style.display = 'block';
    southBack.style.display = 'grid';
  }
  else {
    left.style.display = 'block';
    right.style.display = 'block';
    back.style.display = 'none';
  }
}

function enterBackrooms() {
  
  if (rooms[currentRoom] === 'southFront') {
    insideBR = true;

    // start fade in
    fade.classList.add('out');

    setTimeout(() => {
      // make southback active
      document.querySelector('.room.active').classList.remove('active');
      document.getElementById('southBack').classList.add('active');

      // change button visibility
      visibilityCheck();

      // fade in
      fade.classList.remove('out');
  }, 450);
}
}

function exitBackrooms() {
  insideBR = false;

  // start fade in
  fade.classList.add('out');

  setTimeout(() => {
    // make south active again
    document.querySelector('.room.active').classList.remove('active');
    document.getElementById('southFront').classList.add('active');

    // change button visibility
    visibilityCheck();

    // fade in
    fade.classList.remove('out');
    }, 450);
}

function switchPOV() {

  fade.classList.add('out');
  setTimeout(() => {


  document.getElementById("north").style.opacity = "0";
  document.getElementById("north").style.pointerEvents = "none";
  document.getElementById("vnView").style.opacity = "1";
  document.getElementById("vnView").style.pointerEvents = "auto";

  document.getElementById("navLeft").style.display = "none";
  document.getElementById("navRight").style.display = "none";

  fade.classList.remove('out');

  }, 450);
}

