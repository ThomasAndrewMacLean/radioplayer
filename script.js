document.addEventListener('DOMContentLoaded', function() {
    const audioElements = document.querySelectorAll('audio');

    audioElements.forEach(audio => {
        audio.addEventListener('play', function() {
            audioElements.forEach(otherAudio => {
                if (otherAudio !== audio && !otherAudio.paused) {
                    otherAudio.pause();
                }
            });
        });
    });


});