import * as core from '@actions/core';
import { ToolRunner, argStringToArray } from "@actions/exec/lib/toolrunner";

//import * as exec from '@actions/exec';

const exec = require('@actions/exec');

async function pipInstall() {
    const userName = core.getInput('user');
    const authUrl = core.getInput('url');
    const projectDomainName = core.getInput('domain');
    const userPassword = core.getInput('password');
    const userDomain = core.getInput('userdomain');
    const projectName = core.getInput('project');
    const clusterName = core.getInput('cluster');


    let args1 = ['install', 'wheel'];
    let pipPath = "pip";
    let openstackPath = "openstack";

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
    
    let args5 = ['coe', 'cluster', 'config', clusterName, '--os-auth-url', authUrl, '--os-identity-api-version', '3', '--os-project-name', projectName, '--os-project-domain-name', projectDomainName, '--os-username', userName, '--os-user-domain-name', userDomain, '--os-password', userPassword];
    const toolRunner5 = new ToolRunner(openstackPath, args5, { failOnStdErr: false, ignoreReturnCode: true, silent: true });
        await toolRunner5.exec();
    core.debug(`openstack coe cluster config`);
    
    let args4 = ['coe', 'cluster', 'list', '--os-auth-url', authUrl, '--os-identity-api-version', '3', '--os-project-name', projectName, '--os-project-domain-name', projectDomainName, '--os-username', userName, '--os-user-domain-name', userDomain, '--os-password', userPassword ];
    const toolRunner4 = new ToolRunner(openstackPath, args4);
    await toolRunner4.exec();
    core.debug(`openstack coe cluster list`);
        

    }


async function ls() {
  await exec.exec('ls');
}

run();
async function run() {
  try {
    const myInput = core.getInput('myInput');
    core.debug(`Hello ${myInput}`);
  } catch (error) {
    core.setFailed(error.message);
    }
    await ls();
    await pipInstall();
    await ls();
}

run();
