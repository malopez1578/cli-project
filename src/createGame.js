import chalk from 'chalk';
import fs from 'fs';
import listr from 'listr';
import ncp from 'ncp';
import { projectInstall } from 'pkg-install';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDir, options.targetDirectory, {
    clobber: false,
  });
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  try {
    await access(options.templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }
  const tasks = new listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'initialize Git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'install dependences',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall ? 'Pass --install  to automatically install dependences' : undefined,
    },
  ]);

  await tasks.run();

  console.log('%s project ready ', chalk.green.bold('DONE'));
  return true;
}
