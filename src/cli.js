import arg from 'arg';
import inquirer from 'inquirer';
import { webpackInit } from './webpackConfig';

function parseArguments(rawArgs) {
  try {
    const args = arg(
      {
        '--new': Boolean,
        '--start': Boolean,
        '--server': Boolean,
        '--build': Boolean,
        '-serv': '--server',
        '-b': '--build',
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
      server: args['--server'] || false,
      build: args['--build'] || false,
      template: args._[0],
    };
  } catch (err) {
    if (err.code === 'ARG_UNKNOWN_OPTION') {
      console.log(err.message);
      return null;
    } else {
      return null;
    }
  }
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

  if (options.start) {
    options.server = true;
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template || defaultTemplate,
  };
}

export async function cli(args) {
  let options = parseArguments(args);
  if (options) {
    options = await promptMissingOptions(options);
    await webpackInit(options);
  }
}
