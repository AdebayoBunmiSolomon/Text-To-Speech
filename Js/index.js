var voiceList = document.querySelector("#voiceList");
var txtInput = document.querySelector("#txtInput");
var buttons = document.querySelectorAll("button");
var btnPause = document.querySelector("#btnPause");
var pausePlayIcon = document.querySelector(".fa-pause");

var checked = true;

txtInput.textContent = "";
var tts = window.speechSynthesis;
var voices = [];

//Check to see if voices is loaded or not
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = getVoices;
}

//Load voices in select element
function getVoices() {
  voices = tts.getVoices();
  voiceList.innerHTML = "";
  voices.forEach((voice) => {
    var listItem = document.createElement("option");
    listItem.textContent = voice.name;
    listItem.setAttribute("data-lang", voice.lang);
    listItem.setAttribute("data-name", voice.name);
    voiceList.appendChild(listItem);
  });
  voiceList.selectedIndex = 0;
}

//Loop through all button in html file to create click event
buttons.forEach((button) => {
  //Speak button...
  if (button.name === "speak") {
    button.addEventListener("click", function () {
      tts.cancel();
      if (txtInput.value === "") {
        alert("Please enter text");
        txtInput.focus();
        return;
      } else {
        var toSpeak = new SpeechSynthesisUtterance(txtInput.value);
        var selectedVoiceName =
          voiceList.selectedOptions[0].getAttribute("data-name");
        voices.forEach((voice) => {
          if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
          }
        });
        tts.speak(toSpeak);
      }
    });

    //Pause button...
  } else if (button.name === "pause") {
    button.addEventListener("click", function () {
      if (checked === true) {
        pausePlayIcon.classList.replace("fa-pause", "fa-play");
        console.log(checked);
        checked = false;
        tts.pause();
      } else if (checked !== true) {
        pausePlayIcon.classList.replace("fa-play", "fa-pause");
        console.log(checked);
        checked = true;
        tts.resume();
      }
    });

    //Cancel button...
  } else if (button.name === "cancel") {
    button.addEventListener("click", function () {
      if (txtInput.value != "") {
        txtInput.value = "";
        tts.cancel();
        console.log("TTS Canceled successfully");
      } else {
        txtInput.value = "";
      }
    });
  }
});
