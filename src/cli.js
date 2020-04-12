import arg from 'arg';
import inquirer from 'inquirer';

function parseArguments(rawArgs) {
  const args = arg(
    {
      '--new': Boolean,
      '--start': Boolean,
      '--init': Boolean,
      '--install': Boolean,
      '--git': Boolean,
      '-g': '--git',
      '-ins': '--install',
      '-i': '--init',
      '-n': '--new',
      '-s': '--start',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    new: args['--new'] || false,
    start: args['--start'] || false,
    init: args['--init'] || false,
    install: args['--install'] || false,
    git: args['--git'] || false,
    template: args._[0],
  };
}

async function promptMissingOptions(options) {
  const defaultTemplate = 'Typescript';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (options.new) {
    if (!options.template) {
      questions.push({
        type: 'list',
        name: 'template',
        message: 'please choose which game template to use',
        choices: ['Javascript', 'Typescript'],
        default: defaultTemplate,
      });
    }
  }
  if (options.init) {
    if (!options.git) {
      questions.push({
        type: 'confirm',
        name: 'git',
        message: 'initialze a git repository',
        default: false,
      });
      options.template = 'webpackInit';
    }
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git || false,
  };
}

export async function cli(args) {
  let options = parseArguments(args);
  options = await promptMissingOptions(options);
}
