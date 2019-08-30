import * as core from '@actions/core';
import { ToolRunner, argStringToArray } from "@actions/exec/lib/toolrunner";

//import * as exec from '@actions/exec';

const exec = require('@actions/exec');

async function pipInstall() {
    let args1 = ['install', 'wheel'];
    let pipPath = "pip";

    const toolRunner1 = new ToolRunner(pipPath, args1);
    await toolRunner1.exec();
    core.debug(`pip install wheel`);


    let args2 = ['install', 'python-openstackclient'];
    const toolRunner2 = new ToolRunner(pipPath, args2);
    await toolRunner2.exec();
    core.debug(`pip install openstack-client`);

    let args3 = ['install', 'python-magnumclient'];
    const toolRunner3 = new ToolRunner(pipPath, args3);
    await toolRunner3.exec();
    core.debug(`pip install magnum-client`);
    }


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
