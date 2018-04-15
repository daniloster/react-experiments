import Artyom from 'artyom.js';

export const DEFAULT_KEYWORDS = ['temple'];
export const DEFAULT_HELP_KEYWORDS = ['help', 'help me', 'show me options'];
export const THREE_SECONDS = 1000 * 3;

export default class VoiceModule {
  constructor(options = {}) {
    this.module = new Artyom();
    this.contextualCommands = [];
    this.active = null;
    this.mapCommands = new Map();
    this.bootstrap(options);
  }

  bootstrap = (options = {}) => {
    const { keywords = DEFAULT_KEYWORDS, helpKeywords = DEFAULT_HELP_KEYWORDS } = options;
    this.options = {
      ...options,
      keywords,
      helpKeywords,
    };

    this.clear();
    this.contextualCommands = [];
    this.module.emptyCommands();

    this.addContextualCommands(helpKeywords, () => {
      const commands = this.contextualCommands.reduce(
        (list, command) => list.concat(command.indexes),
        [],
      );
      const sentences = commands.map(c => `"${c}"`);
      const lastSentence = sentences.pop();

      this.module.say(
        `Those are the commands available: ${sentences.join(', ')}${
          sentences.length ? ` and ${lastSentence}` : lastSentence
        }`,
      );
    });

    return this;
  };

  init = (options = {}) =>
    new Promise((resolve) => {
      this.module.fatality(); // use this to stop any of

      this.listenContextualCommands();
      this.module.addCommands([
        {
          parents: [],
          indexes: this.options.keywords,
          action: this.clear,
        },
      ]);

      setTimeout(() => {
        // if you use artyom.fatality , wait 250 ms to initialize again.
        this.module
          .initialize({
            lang: 'en-GB', // A lot of languages are supported.
            continuous: true, // Artyom will listen forever
            listen: true, // Start recognizing
            // debug: true, // Show everything in the console
            speed: 1, // talk normally
            ...options,
          })
          .then(resolve);
      }, 250);
    });

  addContextualCommands = (command, listener, { parents = [], smart = false } = {}) => {
    const commands = [].concat(command);
    let lastTime = Date.now();
    this.contextualCommands.push({
      /* eslint-disable */
      action: function(index, wildcard) {
        const isAllowed =
          !commands.includes(this.active) ||
          (Date.now() - THREE_SECONDS > lastTime && commands.includes(this.active));
        // console.log('executing command', commands);
        // console.log('command active', this.active);
        // console.log('command parents', parents);
        // console.log('command allowed', isAllowed);
        if (isAllowed) {
          const commandPath = commands[0].split('/');
          this.active = commandPath[commandPath.length - 1].split('|').pop();
          lastTime = Date.now();
          listener(index, wildcard);
        }
      },
      /* eslint-enable */
      indexes: ['']
        .concat(parents)
        .map(p => commands.map(c => `${p} ${c}`.trim()))
        .reduce((list, key) => list.concat(key), []),
      parents,
      smart,
    });

    return this;
  };

  listenContextualCommands = () => {
    this.clear();
    this.contextualCommands.forEach((command) => {
      // console.log('applying command', command.indexes);
      this.module.addCommands([command]);
    });
  };

  clear = () => {
    // console.log('clearing');
    this.active = null;
  };
}
