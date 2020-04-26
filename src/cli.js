import arg from 'arg';
import inquirer from 'inquirer';
import path from 'path';
import { createProject } from './createGame';
import { helperCli } from './help';
import { webpackInit } from './webpackConfig';

const templateDirect = path.resolve(__dirname, './../templates');

function parseArguments(rawArgs) {
  try {
    const args = arg(
      {
        '--new': Boolean,
        '--start': Boolean,
        '--server': Boolean,
        '--build': Boolean,
        '--port': Number,
        '--help': Boolean,
        '-h': '--help',
        '-p': '--port',
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
      port: args['--port'] || 8080,
      help: args['--help'] || false,
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
  if (!options.help) {
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
      templateDir: `${templateDirect}/${answers.template.toLowerCase()}`,
    };
  } else {
    return {
      help: true,
    };
  }
}

export async function cli(args) {
  let options = parseArguments(args);
  if (options) {
    options = await promptMissingOptions(options);
    if (options.help) {
      await helperCli();
    }
    if (options.build || options.start) {
      await webpackInit(options);
    }
    if (options.new) {
      await createProject(options);
    }
  }
}
