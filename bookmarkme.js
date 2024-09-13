javascript:(function(){
    // Load Tone.js dynamically
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.39/Tone.min.js';
    script.onload = function(){
        // Initialize Tone.js components after loading
        const synth = new Tone.Synth().toDestination();

        // Helper function to play a note
        function playNote(frequency, duration=0.5, volume=0){
            synth.triggerAttackRelease(frequency, duration);
        }

        // Monitor XMLHttpRequest
        (function(open, send) {
            XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
                this.addEventListener('loadstart', function() {
                    // Start of XHR request
                    playNote(440, 0.1); // A4 note for start
                    this._startTime = performance.now();
                }, false);

                this.addEventListener('loadend', function() {
                    // End of XHR request
                    const duration = (performance.now() - this._startTime) / 1000;
                    const frequency = 220 + (duration * 100); // Lower frequency for longer requests
                    playNote(frequency, 0.2);
                }, false);

                this.addEventListener('error', function() {
                    // XHR request failed
                    playNote(110, 0.5); // Low note for error
                }, false);

                open.call(this, method, url, async, user, pass);
            };
        })(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);

        // Monitor call stack size
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = function(callback, delay) {
            const stackSize = new Error().stack.split('\n').length;
            const frequency = 880 - (stackSize * 10); // Lower pitch for bigger stack
            playNote(frequency, 0.05);
            return originalSetTimeout(callback, delay);
        };

        // Mouse hover event
        document.addEventListener('mouseover', function(event) {
            const element = event.target;
            if (element && element.nodeType === 1) {
                playNote(660, 0.1); // Ethereal sound
            }
        }, false);

        // Mouse click event
        document.addEventListener('click', function(event) {
            const element = event.target;
            if (element && element.nodeType === 1) {
                const rect = element.getBoundingClientRect();
                const size = rect.width * rect.height;
                const frequency = 440 + (size / 1000); // Larger elements have higher pitch
                playNote(frequency, 0.2);
            }
        }, false);
    };
    document.head.appendChild(script);
})();
