#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var spawnSync = require('child_process').spawnSync;
var argv = require('yargs')
    .boolean('v')
    .alias('h', 'help')
    .alias('v', 'verbose')
    .describe('v', 'Verbose mode')
    .help('h')
    .example('$0 webpack', 'run webpack')
    .example('$0 webpack ./entry.js bundle.js', 'run webpack with args')
    .example('$0 -v -- webpack', 'run webpack, in verbose mode')
    .argv;

function fileExists(path) {
  try {
    return fs.statSync(path).isFile;
  }
  catch(error) {
    return false;
  }
}

function findFile(name) {
  var searchPaths = [
    process.cwd(),
    process.env.HOME,
  ];

  for (searchPath of searchPaths) {
    var filePath = path.join(searchPath, `.buno/${name}`);

    if (fileExists(filePath))
      return filePath;
  }
}

function exec(command) {
  return spawnSync(command, { shell: true, stdio: 'inherit' });
}

// Pre
var preCommand = findFile('pre');

if (preCommand) {
  if (argv.verbose)
    console.log(`Running pre command: ${preCommand}`)

  var preProcess = exec(preCommand);

  if (preProcess.status !== 0)
    return;
}

// Main
var mainCommand = argv._.join(' ');

if (argv.verbose)
  console.log(`Running command: ${mainCommand}`)

var mainProcess = exec(mainCommand);

// Error
var errorCommand = findFile('error');

if (mainProcess.status !== 0) {
  if (errorCommand) {
    if (argv.verbose)
      console.log(`Running error command: ${command}`)

    exec(errorCommand);
  }

  process.exit(mainProcess.status);
}

// Post
var postCommand = findFile('post');

if (postCommand) {
  if (argv.verbose)
    console.log(`Running post command: ${postCommand}`)

  exec(postCommand);
}
