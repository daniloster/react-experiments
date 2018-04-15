import VoiceModule from './VoiceModule';

export default class Brain {
  constructor() {
    this.setupVoice();
    this.setupGesture();
  }

  setupVoice = (options) => {
    this.voice = new VoiceModule(options);
  };

  setupGesture = (options) => {
    this.gesture = new GestureModule(options);
  };
}
