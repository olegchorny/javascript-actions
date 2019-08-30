import * as core from '@actions/core';
//import * as exec from '@actions/exec';

const exec = require('@actions/exec');


async function pip() {
  await exec.exec('pip install wheel');
  await exec.exec('pip install python-openstackclient');
  await exec.exec('pip install python-magnumclient');
}

run();
async function run() {
  try {
    const myInput = core.getInput('myInput');
    core.debug(`Hello ${myInput}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
