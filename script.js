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

document.addEventListener("DOMContentLoaded", () => {
    const vnView = document.getElementById("vnView");
    const dialogueText = document.getElementById("day1D");
    const characterImg = document.getElementById("osumiVn");

    const day1dialogue = [
        {
            text: "Oh hello! I wasn't expecting a camera repair shop of all things to open up here, in such a tucked away and hidden spot.",
            img: "images/characters/estella_1.png"
        },
        {
            text: "Still, I suppose hidden places are the most interesting ones.",
            img: "images/characters/estella_2.png"
        },
        {
            text: "Are you the owner here?",
            img: "images/characters/estella_3.png"
        },
        {
            text: "I actually have something I need fixed...",
            img: "images/characters/estella_1.png"
        }
    ];

    let currentIndex = 0;

    vnView.addEventListener("click", () => {
      // next dialogue
        currentIndex++;

        // if there is still dialogue left in the list, keep going
        if (currentIndex < day1dialogue.length) {
            dialogueText.textContent = day1dialogue[currentIndex].text;
            characterImg.src = day1dialogue[currentIndex].img;
        } else {
          // restarts dialogue to loop again, will change later
            currentIndex = 0;
            day1dialogue.textContent = day1dialogue[0].text;
            characterImg.src = day1dialogue[0].img;
        }
    });
});

// opening and closing 3dviewer
function openViewer(which) {
    const viewerGroup = document.getElementById("viewerGroup");
    const estellaCamModel = document.getElementById("estellaCamModel");
    const osumiCamModel = document.getElementById("osumiCamModel");

    viewerGroup.style.display = "block";
    viewerGroup.style.opacity = "1";
    viewerGroup.style.pointerEvents = "auto";
    
    estellaCamModel.style.display = (which === "estella") ? "block" : "none";
    estellaCamModel.style.pointerEvents = (which === "estella") ? "auto" : "none";
    
    osumiCamModel.style.display = (which === "osumi") ? "block" : "none";
    osumiCamModel.style.pointerEvents = (which === "osumi") ? "auto" : "none";
  }

  function closeViewer() {
    const viewerGroup = document.getElementById("viewerGroup");
    const estellaCamModel = document.getElementById("estellaCamModel");
    const osumiCamModel = document.getElementById("osumiCamModel");

    viewerGroup.style.display = "none";
    viewerGroup.style.opacity = "0";
    viewerGroup.style.pointerEvents = "none";
    
    estellaCamModel.style.display = "none";
    osumiCamModel.style.display = "none";
  }

  document.getElementById("estellaCamera")?.addEventListener("click", () => openViewer("estella"));
  document.getElementById("osumiCamera")?.addEventListener("click", () => openViewer("osumi"));

  document.getElementById("exitViewerButton")?.addEventListener("click", closeViewer);