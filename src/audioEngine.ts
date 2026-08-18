// Sound Effects and Ambient Audio Engine for SyntaxKnight using Web Audio API
// Programmatic synthesis of pure futuristic, cyber-themed chip-tune sound waves.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private spaceHumOsc: OscillatorNode | null = null;
  private spaceHumGain: GainNode | null = null;
  private spaceHumFilter: BiquadFilterNode | null = null;
  private isHumActive = false;
  private isMuted = false;

  // Initialize or retrieve the AudioContext lazily to comply with browser autoplay policies
  private getContext(): AudioContext {
    if (!this.ctx) {
      // @ts-ignore - Support older browser prefixes if any
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    // Resume context if suspended (common browser policy)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    // Turn off hum immediately if muted
    if (muted && this.isHumActive) {
      this.toggleSpaceHum(false);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * 1. Mechanical Navigation Click
   * A short, high-fidelity click using a triangle oscillator with immediate gain decay.
   */
  public playClickSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn('Failed to play click sound:', e);
    }
  }

  /**
   * Short 8-bit tick sound for interactive button hovers.
   */
  public playHoverSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      console.warn('Failed to play hover sound:', e);
    }
  }

  /**
   * Helper to build a simple spacey feedback delay node simulating retro reverb.
   */
  private createReverbNode(ctx: AudioContext, feedbackGain = 0.35, delayTime = 0.15): { input: AudioNode; output: AudioNode } {
    const delay = ctx.createDelay();
    delay.delayTime.value = delayTime;

    const feedback = ctx.createGain();
    feedback.gain.value = feedbackGain;

    delay.connect(feedback);
    feedback.connect(delay);

    return { input: delay, output: delay };
  }

  /**
   * 2. Success Compile/Level-Up Chime
   * A major chord arpeggio sweeping upward rapidly (440Hz, 554Hz, 659Hz, and 880Hz)
   */
  public playSuccessChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 arpeggio
      const noteDuration = 0.12;
      const noteOverlap = 0.06;

      const reverb = this.createReverbNode(ctx, 0.4, 0.12);
      const reverbDryGain = ctx.createGain();
      const reverbWetGain = ctx.createGain();

      reverbDryGain.gain.value = 0.8;
      reverbWetGain.gain.value = 0.45;

      reverbWetGain.connect(ctx.destination);
      reverbDryGain.connect(ctx.destination);
      reverb.output.connect(reverbWetGain);

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + index * noteOverlap;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.01, start + noteDuration);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + noteDuration);

        osc.connect(gain);
        gain.connect(reverbDryGain);
        gain.connect(reverb.input);

        osc.start(start);
        osc.stop(start + noteDuration + 0.05);
      });
    } catch (e) {
      console.warn('Failed to play success chime:', e);
    }
  }

  /**
   * 3. Cyber-Error Buzzer
   */
  public playErrorBuzzer() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const duration = 0.35;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      const mainGain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(95, now);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(97.5, now);

      vibrato.type = 'sine';
      vibrato.frequency.setValueAtTime(15, now);
      vibratoGain.gain.setValueAtTime(12, now);

      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc1.frequency);
      vibratoGain.connect(osc2.frequency);

      mainGain.gain.setValueAtTime(0.15, now);
      mainGain.gain.linearRampToValueAtTime(0.01, now + duration);

      osc1.connect(mainGain);
      osc2.connect(mainGain);
      mainGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      vibrato.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      vibrato.stop(now + duration);
    } catch (e) {
      console.warn('Failed to play error buzzer:', e);
    }
  }

  /**
   * 4. Ambient Space Hum (Atmospheric Background Noise)
   */
  public toggleSpaceHum(active: boolean) {
    if (active && this.isMuted) return;
    try {
      const ctx = this.getContext();

      if (active) {
        if (this.isHumActive) return;

        this.spaceHumOsc = ctx.createOscillator();
        this.spaceHumFilter = ctx.createBiquadFilter();
        this.spaceHumGain = ctx.createGain();

        this.spaceHumOsc.type = 'square';
        this.spaceHumOsc.frequency.setValueAtTime(55, ctx.currentTime);

        this.spaceHumFilter.type = 'lowpass';
        this.spaceHumFilter.frequency.setValueAtTime(110, ctx.currentTime);
        this.spaceHumFilter.Q.setValueAtTime(2, ctx.currentTime);

        this.spaceHumGain.gain.setValueAtTime(0, ctx.currentTime);
        this.spaceHumGain.gain.linearRampToValueAtTime(0.018, ctx.currentTime + 1.5);

        this.spaceHumOsc.connect(this.spaceHumFilter);
        this.spaceHumFilter.connect(this.spaceHumGain);
        this.spaceHumGain.connect(ctx.destination);

        this.spaceHumOsc.start(ctx.currentTime);
        this.isHumActive = true;
      } else {
        if (!this.isHumActive) return;

        const osc = this.spaceHumOsc;
        const gain = this.spaceHumGain;

        if (gain && ctx) {
          gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
        }

        setTimeout(() => {
          try {
            if (osc) osc.stop();
          } catch {}
        }, 900);

        this.spaceHumOsc = null;
        this.spaceHumGain = null;
        this.spaceHumFilter = null;
        this.isHumActive = false;
      }
    } catch (e) {
      console.warn('Failed to toggle space hum:', e);
    }
  }
}

export const audioEngine = new AudioEngine();
