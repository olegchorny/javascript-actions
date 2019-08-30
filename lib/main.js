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
        let args4 = ['help'];
        const toolRunner4 = new toolrunner_1.ToolRunner(openstackPath, args4);
        yield toolRunner4.exec();
        core.debug(`openstack install magnum-client`);
    });
}
function pip() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec.exec('pip install wheel');
        yield exec.exec('pip install python-openstackclient');
        yield exec.exec('pip install python-magnumclient');
    });
}
run();
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
    });
}
run();
