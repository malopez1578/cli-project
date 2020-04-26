const argv = require('yargs')
  .command('start', 'iniciar servidor con el juego', {
    port: {
      alias: 'p',
      desc: 'definir puerto',
      default: 8080,
    },
  })
  .command('build', 'compilar build del juego')
  .command('new', 'compilar build del juego', {
    template: {
      alias: 't',
      desc: 'template para el juego',
      default: 'typescript',
    },
  })
  .usage('game [comand]')
  .help().argv;

module.exports = {
  argv,
};
