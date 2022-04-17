const { dim, bold, cyan, green, magenta, red, yellow } = require('colorette');
const { EOL } = require('os');
const { format } = require('util');

const levels = {
  debug: { color: cyan, emoji: '🐛' },
  info: { color: green, emoji: '🚀' },
  warn: { color: yellow, emoji: '⚠️' },
  error: { color: red, emoji: '❌' },
  doc: { color: magenta, emoji: '📝' },
};

const entry = (level, scope) => ({
  level: levels[level].emoji,
  scope: scope ? bold(levels[level].color(` [${scope.toUpperCase()}]`)) : '',
  timestamp: dim(
    `[${new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })}]`,
  ),
});

class Logger {
  #log(level, message, scope) {
    const msg = entry(level, scope);

    if (typeof message === 'string') {
      const output = `${msg.timestamp} ${msg.level}${msg.scope} ${message}`;
      process.stdout.write(`${output}${EOL}`);
    } else {
      const output = format.apply(null, [
        `${msg.timestamp} ${msg.level} ${msg.scope}${EOL} %O${EOL}`,
        message,
      ]);
      process.stdout.write(output);
    }
  }

  debug(message, scope) {
    this.#log('debug', message, scope);
  }

  info(message, scope) {
    this.#log('info', message, scope);
  }

  warn(message, scope) {
    this.#log('warn', message, scope);
  }

  error(message, scope) {
    this.#log('error', message, scope);
  }

  doc(message, scope) {
    this.#log('doc', message, scope);
  }
}

const log = new Logger();

module.exports = { log };
