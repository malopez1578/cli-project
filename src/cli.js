import arg from 'arg';
import inquirer from 'inquirer';
import path from 'path';
import { createProject } from './createGame';
import { helperCli } from './help';
import { webpackInit } from './webpackConfig';

const templateDirect = path.resolve(__dirname, './../templates');
const rootDirectory = path.resolve(__dirname, './../');

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
        '--install': Boolean,
        '-i': '--install',
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
      runInstall: args['--install'] || false,
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

    if (options.start) {
      options.server = true;
    }

    if (options.new) {
      if (!options.git) {
        questions.push({
          type: 'confirm',
          name: 'git',
          message: 'initialze a git repository',
          default: false,
        });
      }
      if (!options.install) {
        questions.push({
          type: 'confirm',
          name: 'install',
          message: 'install dependences',
          default: false,
        });
      }
    }

    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      template: options.template || answers.template || defaultTemplate,
      git: options.git || answers.git || false,
      templateDir: `${templateDirect}/${defaultTemplate.toLowerCase()}`,
      runInstall: options.install || answers.install,
      rootDirectory,
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
