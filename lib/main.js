"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const toolrunner_1 = require("@actions/exec/lib/toolrunner");
//import * as exec from '@actions/exec';
const exec = require('@actions/exec');
function pipInstall() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const toolRunner1 = new toolrunner_1.ToolRunner(pipPath, args1);
        yield toolRunner1.exec();
        core.debug(`pip install wheel`);
        let args2 = ['install', 'python-openstackclient'];
        const toolRunner2 = new toolrunner_1.ToolRunner(pipPath, args2);
        yield toolRunner2.exec();
        core.debug(`pip install openstack-client`);
        let args3 = ['install', 'python-magnumclient'];
        const toolRunner3 = new toolrunner_1.ToolRunner(pipPath, args3);
        yield toolRunner3.exec();
        core.debug(`pip install magnum-client`);
        let args5 = ['coe', 'cluster', 'config', clusterName, '--os-auth-url', authUrl, '--os-identity-api-version', '3', '--os-project-name', projectName, '--os-project-domain-name', projectDomainName, '--os-username', userName, '--os-user-domain-name', userDomain, '--os-password', userPassword];
        const toolRunner5 = new toolrunner_1.ToolRunner(openstackPath, args5, { failOnStdErr: false, ignoreReturnCode: true, silent: true });
        yield toolRunner5.exec();
        core.debug(`openstack coe cluster config`);
        let args4 = ['coe', 'cluster', 'list', '--os-auth-url', authUrl, '--os-identity-api-version', '3', '--os-project-name', projectName, '--os-project-domain-name', projectDomainName, '--os-username', userName, '--os-user-domain-name', userDomain, '--os-password', userPassword];
        const toolRunner4 = new toolrunner_1.ToolRunner(openstackPath, args4);
        yield toolRunner4.exec();
        core.debug(`openstack coe cluster list`);
    });
}
function ls() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec.exec('ls');
    });
}
function exportKubeconfig() {
    return __awaiter(this, void 0, void 0, function* () {
        core.exportVariable('KUBECONFIG', './config');
    });
}
function cat() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec.exec('cat ./config');
    });
}
function kubectl() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec.exec('kubectl cluster-info');
    });
}
function kubectlInstall() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec.exec('kubectl cluster-info');
        yield exec.exec('sudo apt-get update && sudo apt-get install -y apt-transport-https');
        yield exec.exec('curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -');
        yield exec.exec('echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list');
        yield exec.exec('sudo apt-get update && sudo apt-get install -y kubectl');
    });
}
//run();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const myInput = core.getInput('myInput');
            core.debug(`Hello ${myInput}`);
        }
        catch (error) {
            core.setFailed(error.message);
        }
        yield pipInstall();
        yield exportKubeconfig();
        yield cat();
        yield kubectlInstall();
        yield kubectl();
    });
}
run();
