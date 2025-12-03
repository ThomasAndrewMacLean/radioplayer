let audioContext;
let currentVolume = 0.5; // Default volume (50%)

document.addEventListener("DOMContentLoaded", function () {
  const allbuttons = document.querySelectorAll("button");
  allbuttons.forEach((button) => {
    button.addEventListener("click", function () {
      allbuttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
  const buttons = document.querySelectorAll("button[data-src]");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Stop any currently playing audio
      if (audioContext) {
        audioContext.pause();
        audioContext.currentTime = 0; // Reset to start
        audioContext = null;
      }
      const src = this.getAttribute("data-src");
      audioContext = new Audio(src);
      audioContext.volume = currentVolume;
      audioContext.play();
    });
  });

  const stopButton = document.getElementById("stop");
  stopButton.addEventListener("click", function () {
    if (audioContext) {
      audioContext.pause();
      audioContext.currentTime = 0; // Reset to start
      audioContext = null;
    }
  });

  // Volume slider functionality
  const volumeSlider = document.getElementById("volume-slider");
  const volumeDisplay = document.getElementById("volume-display");

  volumeSlider.addEventListener("input", function () {
    currentVolume = this.value / 100;
    volumeDisplay.textContent = this.value + "%";

    // Update volume of currently playing audio
    if (audioContext) {
      audioContext.volume = currentVolume;
    }
  });
});
