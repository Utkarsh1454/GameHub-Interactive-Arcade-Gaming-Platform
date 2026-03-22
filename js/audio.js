// js/audio.js
// GameHub Retro Audio Synthesizer Engine
// Uses Web Audio API to generate zero-latency 8-bit style sound effects natively.

class AudioEngine {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = 0.10; // Keep retro sounds pleasantly quiet
    }

    init() {
        // Browsers require user interaction before audio contexts can run
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    _playTone(freq, type, duration, slideFreq = null) {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type; // 'sine', 'square', 'sawtooth', 'triangle'
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        if (slideFreq) {
            osc.frequency.exponentialRampToValueAtTime(slideFreq, this.ctx.currentTime + duration);
        }

        gain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    _playNoise(duration) {
        this.init();
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1; // Generate white noise
        }
        
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        
        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 800;
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(this.masterVolume * 1.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(gain);
        gain.connect(this.ctx.destination);
        
        noise.start();
    }

    // --- Specific Game Sounds ---

    // Spacewave Shooter
    shoot() { this._playTone(880, 'square', 0.1, 440); }
    explosion() { this._playNoise(0.4); }

    // Flappy Bird
    jump() { this._playTone(400, 'sine', 0.15, 600); }
    scoreCoin() { 
        this._playTone(1200, 'sine', 0.1); 
        setTimeout(() => this._playTone(1600, 'sine', 0.15), 100); 
    }

    // Snake
    eat() { this._playTone(600, 'square', 0.1, 800); }
    
    // Tetris
    move() { this._playTone(300, 'triangle', 0.05); }
    rotate() { this._playTone(400, 'triangle', 0.05, 500); }
    drop() { this._playTone(200, 'square', 0.1, 100); }
    lineClear() { 
        this._playTone(800, 'sine', 0.1); 
        setTimeout(() => this._playTone(1200, 'square', 0.2), 100); 
    }

    // Global Event
    gameOver() {
        this._playTone(300, 'sawtooth', 0.3, 200);
        setTimeout(() => this._playTone(250, 'sawtooth', 0.4, 150), 300);
        setTimeout(() => this._playTone(200, 'sawtooth', 0.6, 100), 700);
    }
}

// Instantiate globally so games can just call `gameAudio.jump()`
const gameAudio = new AudioEngine();

// Auto-unlock Web Audio on first user interaction
window.addEventListener('click', () => gameAudio.init(), {once: true});
window.addEventListener('keydown', () => gameAudio.init(), {once: true});
