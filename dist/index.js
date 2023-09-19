require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8947:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUserDetails = void 0;
const fetch_1 = __importDefault(__nccwpck_require__(2387));
const getUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, fetch_1.default)(`/2017-06-30/users/` + userId + `?fields=id,username,creationDate,streak,inviteURL,totalXp,courses,trackingProperties`);
});
exports.getUserDetails = getUserDetails;


/***/ }),

/***/ 2387:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const https_1 = __importDefault(__nccwpck_require__(5687));
function fetch(path) {
    return new Promise((response, reject) => {
        https_1.default.get({
            host: 'www.duolingo.com',
            path: path,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'duolingo-readme-stats'
            }
        }, callback => {
            let data = '';
            callback.on('data', chunk => (data += chunk));
            callback.on('end', () => response(JSON.parse(data)));
            callback.on('error', error => reject(error));
        });
    });
}
exports["default"] = fetch;


/***/ }),

/***/ 3109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FILE_NAME = exports.USER_ID = void 0;
const api_1 = __nccwpck_require__(8947);
const fs = __importStar(__nccwpck_require__(7147));
const util_1 = __nccwpck_require__(4024);
const core_1 = __nccwpck_require__(2186);
// Public parameters
exports.USER_ID = (_a = (0, core_1.getInput)('USER_ID')) === null || _a === void 0 ? void 0 : _a.toLowerCase();
exports.FILE_NAME = (_b = (0, core_1.getInput)('FILE_NAME')) === null || _b === void 0 ? void 0 : _b.toLowerCase();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const content = [];
    const userDetails = yield (0, api_1.getUserDetails)(exports.USER_ID);
    content.push((0, util_1.formatOverviewTable)(userDetails.username, userDetails.streak, userDetails.totalXp));
    content.push((0, util_1.formatLanguagesTable)(userDetails.courses));
    const readmeContent = fs.readFileSync('./' + exports.FILE_NAME, 'utf-8');
    const startIndex = readmeContent.indexOf(util_1.START_TOKEN);
    if (startIndex === -1) {
        throw new Error(`Couldn't find the START_TOKEN ${util_1.START_TOKEN} - Exiting!`);
    }
    const endIndex = readmeContent.indexOf(util_1.END_TOKEN);
    if (endIndex === -1) {
        throw new Error(`Couldn't find the END_TOKEN ${util_1.END_TOKEN} - Exiting!`);
    }
    const oldPart = readmeContent.slice(startIndex, endIndex);
    const readmeSafeParts = readmeContent.split(oldPart);
    const newReadme = `${readmeSafeParts[0]}${util_1.START_TOKEN}\n${util_1.INFO_LINE}\n${content.join('\n')}\n${readmeSafeParts[1]}`;
    fs.writeFileSync('./' + exports.FILE_NAME, newReadme);
}))();


/***/ }),

/***/ 4024:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatLanguagesTable = exports.formatOverviewTable = exports.INFO_LINE = exports.END_TOKEN = exports.START_TOKEN = void 0;
const language_flag_colors_1 = __nccwpck_require__(1661);
exports.START_TOKEN = '<!--START_SECTION:duolingoStats-->';
exports.END_TOKEN = '<!--END_SECTION:duolingoStats-->';
exports.INFO_LINE = '<!-- Automatically generated with https://github.com/centrumek/duolingo-readme-stats-->\n';
const formatOverviewTable = (username, streak, totalXp) => {
    var _a, _b, _c;
    const tableHeader = `| Username | Streak | Total XP |`;
    const tableSeparator = '|' + Array.from({ length: 3 }, () => ':---:|').join('');
    const data = [
        (_a = '👤 ' + username) !== null && _a !== void 0 ? _a : 'No Username',
        (_b = '🔥 ' + streak) !== null && _b !== void 0 ? _b : 'No Streak',
        (_c = '⚡ ' + totalXp) !== null && _c !== void 0 ? _c : 'No Xp'
    ];
    const row = `| ${data.join(' | ')} |`;
    return `${tableHeader}\n${tableSeparator}\n${row}\n`;
};
exports.formatOverviewTable = formatOverviewTable;
const formatLanguagesTable = (courses) => {
    const tableHeader = `| Language | Level | XP |`;
    const tableSeparator = '|' + Array.from({ length: 3 }, () => ':---:|').join('');
    const rows = courses.map(course => {
        const data = [
            getFlagEmoji(course.title) + ' ' + course.title,
            '👑 ' + course.crowns,
            '⚡ ' + course.xp
        ];
        return `| ${data.join(' | ')} |`;
    }).join('\n');
    return `${tableHeader}\n${tableSeparator}\n${rows}\n`;
};
exports.formatLanguagesTable = formatLanguagesTable;
const getFlagEmoji = (langCode) => {
    var _a;
    return (_a = (0, language_flag_colors_1.getEmoji)(langCode)) !== null && _a !== void 0 ? _a : "";
};


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const oidc_utils_1 = __nccwpck_require__(8041);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
    }
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueFileCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
    }
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, utils_1.toCommandValue(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
    }
    command_1.issueCommand('save-state', { name }, utils_1.toCommandValue(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(1327);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(1327);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(2981);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const uuid_1 = __nccwpck_require__(5840);
const utils_1 = __nccwpck_require__(5278);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 8041:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(6255);
const auth_1 = __nccwpck_require__(5526);
const core_1 = __nccwpck_require__(2186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 2981:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(1017));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 1327:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(2037);
const fs_1 = __nccwpck_require__(7147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 5526:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 6255:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(3685));
const https = __importStar(__nccwpck_require__(5687));
const pm = __importStar(__nccwpck_require__(9835));
const tunnel = __importStar(__nccwpck_require__(4294));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
    readBodyBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const chunks = [];
                this.message.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                this.message.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9835:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        try {
            return new URL(proxyVar);
        }
        catch (_a) {
            if (!proxyVar.startsWith('http://') && !proxyVar.startsWith('https://'))
                return new URL(`http://${proxyVar}`);
        }
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const reqHost = reqUrl.hostname;
    if (isLoopbackAddress(reqHost)) {
        return true;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperNoProxyItem === '*' ||
            upperReqHosts.some(x => x === upperNoProxyItem ||
                x.endsWith(`.${upperNoProxyItem}`) ||
                (upperNoProxyItem.startsWith('.') &&
                    x.endsWith(`${upperNoProxyItem}`)))) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
function isLoopbackAddress(host) {
    const hostLower = host.toLowerCase();
    return (hostLower === 'localhost' ||
        hostLower.startsWith('127.') ||
        hostLower.startsWith('[::1]') ||
        hostLower.startsWith('[0:0:0:0:0:0:0:1]'));
}
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 4294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(4219);


/***/ }),

/***/ 4219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 5840:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function () {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function () {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function () {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function () {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function () {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _version.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function () {
    return _parse.default;
  }
}));

var _v = _interopRequireDefault(__nccwpck_require__(8628));

var _v2 = _interopRequireDefault(__nccwpck_require__(6409));

var _v3 = _interopRequireDefault(__nccwpck_require__(5122));

var _v4 = _interopRequireDefault(__nccwpck_require__(9120));

var _nil = _interopRequireDefault(__nccwpck_require__(5332));

var _version = _interopRequireDefault(__nccwpck_require__(1595));

var _validate = _interopRequireDefault(__nccwpck_require__(6900));

var _stringify = _interopRequireDefault(__nccwpck_require__(8950));

var _parse = _interopRequireDefault(__nccwpck_require__(2746));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 4569:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('md5').update(bytes).digest();
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 5332:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 2746:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(6900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 814:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 807:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    _crypto.default.randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 5274:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('sha1').update(bytes).digest();
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 8950:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(6900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 8628:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(807));

var _stringify = _interopRequireDefault(__nccwpck_require__(8950));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 6409:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(5998));

var _md = _interopRequireDefault(__nccwpck_require__(4569));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 5998:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__nccwpck_require__(8950));

var _parse = _interopRequireDefault(__nccwpck_require__(2746));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 5122:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(807));

var _stringify = _interopRequireDefault(__nccwpck_require__(8950));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 9120:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(5998));

var _sha = _interopRequireDefault(__nccwpck_require__(5274));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 6900:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__nccwpck_require__(814));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 1595:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(6900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 1823:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const languages_js_1 = __importDefault(__nccwpck_require__(9066));
/**
 * Finds a language given its locale, ISO code or name
 * @param lang The language to find
 * @returns The corresponding language, or undefined if none is found
 * @private
 */
function findLanguage(lang) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return ((_j = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = languages_js_1.default.find(l => l.ids.locale.toLowerCase() === lang.toLowerCase())) !== null && _a !== void 0 ? _a : languages_js_1.default.find(l => l.ids.ISO_639_1 === lang.toLowerCase())) !== null && _b !== void 0 ? _b : languages_js_1.default.find(l => l.ids.ISO_639_2 === lang.toLowerCase())) !== null && _c !== void 0 ? _c : languages_js_1.default.find(l => l.ids.ISO_639_3 === lang.toLowerCase())) !== null && _d !== void 0 ? _d : languages_js_1.default.find(l => l.ids.osxLocale.toLowerCase() === lang.toLowerCase())) !== null && _e !== void 0 ? _e : languages_js_1.default.find(l => l.ids.osxCode.toLowerCase() === lang.toLowerCase())) !== null && _f !== void 0 ? _f : languages_js_1.default.find(l => l.ids.androidCode.toLowerCase() === lang.toLowerCase())) !== null && _g !== void 0 ? _g : languages_js_1.default.find(l => l.ids.locale.toLowerCase().includes(lang.toLowerCase()))) !== null && _h !== void 0 ? _h : languages_js_1.default.find(l => l.name.toLowerCase() === lang.toLowerCase())) !== null && _j !== void 0 ? _j : languages_js_1.default.find(l => l.name.toLowerCase().includes(lang.toLowerCase())));
}
exports["default"] = findLanguage;
//# sourceMappingURL=findLanguage.js.map

/***/ }),

/***/ 495:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBase10FlagColors = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the base-10 colors in a language's flag
 * @param lang The locale, ISO code or name of the language to find the colors of
 * @returns An array with all the base-10 colors in the language's flag, or `undefined` if it is not found
 */
function getBase10FlagColors(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.flagColors.map(c => c.base10);
}
exports.getBase10FlagColors = getBase10FlagColors;
//# sourceMappingURL=getBase10FlagColors.js.map

/***/ }),

/***/ 847:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCMYKFlagColors = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the CMYK colors in a language's flag
 * @param lang The locale, ISO code or name of the language to find the colors of
 * @returns An array with all the CMYK colors in the language's flag, or `undefined` if it is not found
 */
function getCMYKFlagColors(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.flagColors.map(c => c.cmyk);
}
exports.getCMYKFlagColors = getCMYKFlagColors;
//# sourceMappingURL=getCMYKFlagColors.js.map

/***/ }),

/***/ 3822:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFlagColors = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets all the colors in a language's flag
 * @param lang The locale, ISO code or name of the language to find the colors of
 * @returns An array with objects of all the colors in the language's flag, or `undefined` if it is not found
 */
function getFlagColors(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.flagColors;
}
exports.getFlagColors = getFlagColors;
//# sourceMappingURL=getFlagColors.js.map

/***/ }),

/***/ 6974:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getHexFlagColors = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the HEX colors in a language's flag
 * @param lang The locale, ISO code or name of the language to find the colors of
 * @returns An array with all the HEX colors in the language's flag, or `undefined` if it is not found
 */
function getHexFlagColors(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.flagColors.map(c => c.hex);
}
exports.getHexFlagColors = getHexFlagColors;
//# sourceMappingURL=getHexFlagColors.js.map

/***/ }),

/***/ 9213:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRGBFlagColors = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the RGB colors in a language's flag
 * @param lang The locale, ISO code or name of the language to find the colors of
 * @returns An array with all the RGB colors in the language's flag, or `undefined` if it is not found
 */
function getRGBFlagColors(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.flagColors.map(c => c.rgb);
}
exports.getRGBFlagColors = getRGBFlagColors;
//# sourceMappingURL=getRGBFlagColors.js.map

/***/ }),

/***/ 1603:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEmoji = void 0;
const languages_js_1 = __importDefault(__nccwpck_require__(9066));
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets a country's flag unicode emoji
 * @param country The country, country code, language locale, ISO code or name to get the flag emoji of
 * @returns A flag unicode emoji, `undefined` if no language is found or `null` if the language doesn't have an emoji
 */
function getEmoji(country) {
    var _a, _b, _c;
    const language = (_b = (_a = languages_js_1.default.find(l => l.country.toLowerCase() === country.toLowerCase())) !== null && _a !== void 0 ? _a : languages_js_1.default.find(l => l.countryCode.toLowerCase() === country.toLowerCase())) !== null && _b !== void 0 ? _b : (0, findLanguage_js_1.default)(country);
    // eslint-disable-next-line unicorn/no-null
    return language ? (_c = language.flag.emoji) !== null && _c !== void 0 ? _c : null : undefined;
}
exports.getEmoji = getEmoji;
//# sourceMappingURL=getEmoji.js.map

/***/ }),

/***/ 8452:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFlag = void 0;
const languages_js_1 = __importDefault(__nccwpck_require__(9066));
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the flag of a language
 * @param country The country, country code, language locale, ISO code or name to find the flag of
 * @returns The flag object of the language, or `undefined` if it is not found
 */
function getFlag(country) {
    var _a, _b;
    const language = (_b = (_a = languages_js_1.default.find(l => l.country.toLowerCase() === country.toLowerCase())) !== null && _a !== void 0 ? _a : languages_js_1.default.find(l => l.countryCode.toLowerCase() === country.toLowerCase())) !== null && _b !== void 0 ? _b : (0, findLanguage_js_1.default)(country);
    return language === null || language === void 0 ? void 0 : language.flag;
}
exports.getFlag = getFlag;
//# sourceMappingURL=getFlag.js.map

/***/ }),

/***/ 6020:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getImage = void 0;
const languages_js_1 = __importDefault(__nccwpck_require__(9066));
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets a country's flag image URL
 * @param country The country, country code, language locale, ISO code or name to get the flag image URL of
 * @returns The flag image URL of the language, or `undefined` if it is not found
 */
function getImage(country) {
    var _a, _b;
    const language = (_b = (_a = languages_js_1.default.find(l => l.country.toLowerCase() === country.toLowerCase())) !== null && _a !== void 0 ? _a : languages_js_1.default.find(l => l.countryCode.toLowerCase() === country.toLowerCase())) !== null && _b !== void 0 ? _b : (0, findLanguage_js_1.default)(country);
    return language === null || language === void 0 ? void 0 : language.flag.image;
}
exports.getImage = getImage;
//# sourceMappingURL=getImage.js.map

/***/ }),

/***/ 8098:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPrimaryBase10 = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the base-10 color of a language
 * @param lang The locale, ISO code or name of the language to find the color of
 * @returns The base-10 color of the language, or `undefined` if it is not found
 */
function getPrimaryBase10(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.primaryColor.base10;
}
exports.getPrimaryBase10 = getPrimaryBase10;
//# sourceMappingURL=getPrimaryBase10.js.map

/***/ }),

/***/ 2985:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPrimaryCMYK = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the CMYK color of a language
 * @param lang The locale, ISO code or name of the language to find the color of
 * @returns The CMYK array of colors of the language, or `undefined` if it is not found
 */
function getPrimaryCMYK(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.primaryColor.cmyk;
}
exports.getPrimaryCMYK = getPrimaryCMYK;
//# sourceMappingURL=getPrimaryCMYK.js.map

/***/ }),

/***/ 6901:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPrimaryColor = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the primary color of a language
 * @param lang The locale, ISO code or name of the language to find the color of
 * @returns An object with the HEX, RGB, CMYK and base-10 color values of the language, or `undefined` if it is not found
 */
function getPrimaryColor(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.primaryColor;
}
exports.getPrimaryColor = getPrimaryColor;
//# sourceMappingURL=getPrimaryColor.js.map

/***/ }),

/***/ 9168:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPrimaryHex = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the HEX color of a language
 * @param lang The locale, ISO code or name of the language to find the color of
 * @returns The HEX color of the language, or `undefined` if it is not found
 */
function getPrimaryHex(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.primaryColor.hex;
}
exports.getPrimaryHex = getPrimaryHex;
//# sourceMappingURL=getPrimaryHex.js.map

/***/ }),

/***/ 4908:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPrimaryRGB = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the RGB color of a language
 * @param lang The locale, ISO code or name of the language to find the color of
 * @returns The RGB array of colors of the language, or `undefined` if it is not found
 */
function getPrimaryRGB(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.flag.primaryColor.rgb;
}
exports.getPrimaryRGB = getPrimaryRGB;
//# sourceMappingURL=getPrimaryRGB.js.map

/***/ }),

/***/ 7074:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCountry = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the name of a language's country
 * @param lang The locale, ISO code or name of the language to find the country name of
 * @returns The name of the language's country, or `undefined` if it is not found
 */
function getCountry(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.country;
}
exports.getCountry = getCountry;
//# sourceMappingURL=getCountry.js.map

/***/ }),

/***/ 9615:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCountryCode = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the code of a language's country
 * @param lang The locale, ISO code or name of the language to find the country code of
 * @returns The code of the language's country, or `undefined` if it is not found
 */
function getCountryCode(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.countryCode;
}
exports.getCountryCode = getCountryCode;
//# sourceMappingURL=getCountryCode.js.map

/***/ }),

/***/ 1095:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCountryLanguages = void 0;
const languages_js_1 = __importDefault(__nccwpck_require__(9066));
/**
 * Gets an array with all the languages belonging to a given country
 * @param country The country name or code to find
 * @returns An array with all the languages belonging to that country or null if none are found
 */
function getCountryLanguages(country) {
    const countryLangs = languages_js_1.default.filter(l => l.country.toLowerCase() === country.toLowerCase() || l.countryCode.toLowerCase() === country.toLowerCase());
    return countryLangs.length > 0 ? countryLangs : undefined;
}
exports.getCountryLanguages = getCountryLanguages;
//# sourceMappingURL=getCountryLanguages.js.map

/***/ }),

/***/ 5647:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDirection = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the direction of a language's text
 * @param lang The locale, ISO code or name of the language to find the direction of
 * @returns The direction of the language's text, or `undefined` if it is not found
 */
function getDirection(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.direction;
}
exports.getDirection = getDirection;
//# sourceMappingURL=getDirection.js.map

/***/ }),

/***/ 7500:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLanguage = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
function getLanguage(lang) {
    return Array.isArray(lang) ? lang.map(l => (0, findLanguage_js_1.default)(l)) : (0, findLanguage_js_1.default)(lang);
}
exports.getLanguage = getLanguage;
//# sourceMappingURL=getLanguage.js.map

/***/ }),

/***/ 1171:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getName = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the name of a language
 * @param lang The locale, ISO code or name of the language to find the name of
 * @returns The name of the language, or `undefined` if it is not found
 */
function getName(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.name;
}
exports.getName = getName;
//# sourceMappingURL=getName.js.map

/***/ }),

/***/ 2316:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNativeName = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the native name of a language
 * @param lang The locale, ISO code or name of the language to find the native name of
 * @returns The native name of the language, or `undefined` if it is not found
 */
function getNativeName(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.nativeName;
}
exports.getNativeName = getNativeName;
//# sourceMappingURL=getNativeName.js.map

/***/ }),

/***/ 5618:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRegion = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the name of a language's region, if any
 * @param lang The locale, ISO code or name of the language to find the region name of
 * @returns The language's region name, `undefined` if no language is found
 * or `null` if the language doesn't have a region
 */
function getRegion(lang) {
    var _a;
    const language = (0, findLanguage_js_1.default)(lang);
    // eslint-disable-next-line unicorn/no-null
    return language ? (_a = language.region) !== null && _a !== void 0 ? _a : null : undefined;
}
exports.getRegion = getRegion;
//# sourceMappingURL=getRegion.js.map

/***/ }),

/***/ 2734:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRegionCode = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the code of a language's region, if any
 * @param lang The locale, ISO code or name of the language to find the region code of
 * @returns The language's region code, `undefined` if no language is found
 * or `null` if the language doesn't have a region
 */
function getRegionCode(lang) {
    var _a;
    const language = (0, findLanguage_js_1.default)(lang);
    // eslint-disable-next-line unicorn/no-null
    return language ? (_a = language.regionCode) !== null && _a !== void 0 ? _a : null : undefined;
}
exports.getRegionCode = getRegionCode;
//# sourceMappingURL=getRegionCode.js.map

/***/ }),

/***/ 4574:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRegionLanguages = void 0;
const languages_js_1 = __importDefault(__nccwpck_require__(9066));
/**
 * Gets an array with all the languages belonging to a given region
 * @param region The region name or code to find
 * @returns An array with all the languages belonging to that region or undefined if none are found
 */
function getRegionLanguages(region) {
    const regionLangs = languages_js_1.default.filter(l => { var _a, _b; return ((_a = l.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === region.toLowerCase() || ((_b = l.regionCode) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === region.toLowerCase(); });
    return regionLangs.length > 0 ? regionLangs : undefined;
}
exports.getRegionLanguages = getRegionLanguages;
//# sourceMappingURL=getRegionLanguages.js.map

/***/ }),

/***/ 9279:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAndroidCode = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the Android locale identifier used to name "values-" directories in Android-based OSs
 * @param lang The locale, ISO code or name of the language to find the Android code of
 * @returns The Android code of the language, or `undefined` if it is not found
 */
function getAndroidCode(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.ids.androidCode;
}
exports.getAndroidCode = getAndroidCode;
//# sourceMappingURL=getAndroidCode.js.map

/***/ }),

/***/ 7562:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGlottolog = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
function getGlottolog(lang, url = false) {
    var _a;
    const language = (0, findLanguage_js_1.default)(lang);
    return language
        ? url && language.ids.glottolog
            ? `https://glottolog.org/resource/languoid/id/${language.ids.glottolog}`
            : // eslint-disable-next-line unicorn/no-null
                (_a = language.ids.glottolog) !== null && _a !== void 0 ? _a : null
        : undefined;
}
exports.getGlottolog = getGlottolog;
//# sourceMappingURL=getGlottolog.js.map

/***/ }),

/***/ 930:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getISO_639_1 = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code of a language
 * @param lang The locale, ISO code or name of the language to find the ISO 639-1 of
 * @returns The ISO 639-1 code of the language, `undefined` if it is not found or `null` if the language doesn't have the code
 */
// eslint-disable-next-line camelcase
function getISO_639_1(lang) {
    var _a;
    const language = (0, findLanguage_js_1.default)(lang);
    // eslint-disable-next-line unicorn/no-null
    return language ? (_a = language.ids.ISO_639_1) !== null && _a !== void 0 ? _a : null : undefined;
}
exports.getISO_639_1 = getISO_639_1;
//# sourceMappingURL=getISO_639_1.js.map

/***/ }),

/***/ 179:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getISO_639_2 = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the [ISO 639-2](https://en.wikipedia.org/wiki/ISO_639-2) code of a language
 * @param lang The locale, ISO code or name of the language to find the ISO 639-2 of
 * @returns The ISO 639-2 code of the language, `undefined` if it is not found or `null` if the language doesn't have the code
 */
// eslint-disable-next-line camelcase
function getISO_639_2(lang) {
    var _a;
    const language = (0, findLanguage_js_1.default)(lang);
    // eslint-disable-next-line unicorn/no-null
    return language ? (_a = language.ids.ISO_639_2) !== null && _a !== void 0 ? _a : null : undefined;
}
exports.getISO_639_2 = getISO_639_2;
//# sourceMappingURL=getISO_639_2.js.map

/***/ }),

/***/ 6351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getISO_639_3 = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the [ISO 639-3](https://en.wikipedia.org/wiki/ISO_639-3) code of a language
 * @param lang The locale, ISO code or name of the language to find the ISO 639-3 of
 * @returns The ISO 639-3 code of the language, `undefined` if it is not found or `null` if the language doesn't have the code
 */
// eslint-disable-next-line camelcase
function getISO_639_3(lang) {
    var _a;
    const language = (0, findLanguage_js_1.default)(lang);
    // eslint-disable-next-line unicorn/no-null
    return language ? (_a = language.ids.ISO_639_3) !== null && _a !== void 0 ? _a : null : undefined;
}
exports.getISO_639_3 = getISO_639_3;
//# sourceMappingURL=getISO_639_3.js.map

/***/ }),

/***/ 2375:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIds = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the ids of a language
 * @param lang The locale, ISO code or name of the language to find the ids of
 * @returns The ids of the language, or `undefined` if it is not found
 */
function getIds(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.ids;
}
exports.getIds = getIds;
//# sourceMappingURL=getIds.js.map

/***/ }),

/***/ 2322:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLocale = void 0;
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the locale of a language
 * @param lang The locale, ISO code or name of the language to find the locale of
 * @returns The locale of the language, or `undefined` if it is not found
 */
function getLocale(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.ids.locale;
}
exports.getLocale = getLocale;
//# sourceMappingURL=getLocale.js.map

/***/ }),

/***/ 9343:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOSXCode = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the OS X locale identifier used to name ".lproj" directories
 * @param lang The locale, ISO code or name of the language to find the OS X code of
 * @returns The OS X code of the language, or `undefined` if it is not found
 */
function getOSXCode(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.ids.osxCode;
}
exports.getOSXCode = getOSXCode;
//# sourceMappingURL=getOSXCode.js.map

/***/ }),

/***/ 5685:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOSXLocale = void 0;
/* eslint-disable unicorn/filename-case */
const findLanguage_js_1 = __importDefault(__nccwpck_require__(1823));
/**
 * Gets the OS X locale used to name translated resources (i.e. uk, zh-Hans, zh_HK)
 * @param lang The locale, ISO code or name of the language to find the OS X locale of
 * @returns The OS X locale of the language, or `undefined` if it is not found
 */
function getOSXLocale(lang) {
    const language = (0, findLanguage_js_1.default)(lang);
    return language === null || language === void 0 ? void 0 : language.ids.osxLocale;
}
exports.getOSXLocale = getOSXLocale;
//# sourceMappingURL=getOSXLocale.js.map

/***/ }),

/***/ 1661:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__nccwpck_require__(495), exports);
__exportStar(__nccwpck_require__(847), exports);
__exportStar(__nccwpck_require__(3822), exports);
__exportStar(__nccwpck_require__(6974), exports);
__exportStar(__nccwpck_require__(9213), exports);
__exportStar(__nccwpck_require__(1603), exports);
__exportStar(__nccwpck_require__(8452), exports);
__exportStar(__nccwpck_require__(6020), exports);
__exportStar(__nccwpck_require__(8098), exports);
__exportStar(__nccwpck_require__(2985), exports);
__exportStar(__nccwpck_require__(6901), exports);
__exportStar(__nccwpck_require__(9168), exports);
__exportStar(__nccwpck_require__(4908), exports);
__exportStar(__nccwpck_require__(7074), exports);
__exportStar(__nccwpck_require__(9615), exports);
__exportStar(__nccwpck_require__(1095), exports);
__exportStar(__nccwpck_require__(5647), exports);
__exportStar(__nccwpck_require__(7500), exports);
__exportStar(__nccwpck_require__(1171), exports);
__exportStar(__nccwpck_require__(2316), exports);
__exportStar(__nccwpck_require__(5618), exports);
__exportStar(__nccwpck_require__(2734), exports);
__exportStar(__nccwpck_require__(4574), exports);
__exportStar(__nccwpck_require__(9279), exports);
__exportStar(__nccwpck_require__(7562), exports);
__exportStar(__nccwpck_require__(2375), exports);
__exportStar(__nccwpck_require__(930), exports);
__exportStar(__nccwpck_require__(179), exports);
__exportStar(__nccwpck_require__(6351), exports);
__exportStar(__nccwpck_require__(2322), exports);
__exportStar(__nccwpck_require__(9343), exports);
__exportStar(__nccwpck_require__(5685), exports);
const languages_js_1 = __importDefault(__nccwpck_require__(9066));
// eslint-disable-next-line unicorn/prefer-export-from
exports["default"] = languages_js_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9066:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const languages = [
    {
        name: "Acholi",
        nativeName: "Lwo",
        ids: {
            locale: "ach-UG",
            ISO_639_2: "ach",
            ISO_639_3: "ach",
            androidCode: "ach-rUG",
            osxCode: "ach.lproj",
            osxLocale: "ach",
            glottolog: "acol1236",
        },
        direction: "ltr",
        country: "Uganda",
        countryCode: "ug",
        flag: {
            image: "https://crowdin.com/images/flags/ach.png",
            emoji: "🇺🇬",
            primaryColor: { hex: "#D90000", rgb: [217, 0, 0], cmyk: [0, 100, 100, 15], base10: 14221312 },
            flagColors: [
                { hex: "#FCDC04", rgb: [252, 220, 4], cmyk: [0, 5, 100, 0], base10: 16571396 },
                { hex: "#D90000", rgb: [217, 0, 0], cmyk: [0, 90, 76, 0], base10: 14221312 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#9CA69C", rgb: [156, 166, 156], cmyk: [50, 34, 27, 11], base10: 10266268 },
            ],
        },
    },
    {
        name: "Afar",
        nativeName: "Qafaraf",
        ids: {
            locale: "aa-ER",
            ISO_639_1: "aa",
            ISO_639_2: "aar",
            ISO_639_3: "aar",
            androidCode: "aa-rER",
            osxCode: "aa.lproj",
            osxLocale: "aa",
            glottolog: "afar1241",
        },
        direction: "ltr",
        country: "Eritrea",
        countryCode: "er",
        flag: {
            image: "https://crowdin.com/images/flags/aa.png",
            emoji: "🇪🇷",
            primaryColor: { hex: "#3C8BDC", rgb: [60, 139, 220], cmyk: [73, 37, 0, 14], base10: 3967964 },
            flagColors: [
                { hex: "#43B02A", rgb: [67, 176, 42], cmyk: [68, 0, 100, 0], base10: 4436010 },
                { hex: "#E4002B", rgb: [228, 0, 43], cmyk: [0, 100, 89, 0], base10: 14942251 },
                { hex: "#418FDE", rgb: [65, 143, 222], cmyk: [69, 34, 0, 0], base10: 4296670 },
                { hex: "#FFC72C", rgb: [255, 199, 44], cmyk: [0, 16, 89, 0], base10: 16762668 },
            ],
        },
    },
    {
        name: "Afrikaans",
        nativeName: "Afrikaans",
        ids: {
            locale: "af-ZA",
            ISO_639_1: "af",
            ISO_639_2: "afr",
            ISO_639_3: "afr",
            androidCode: "af-rZA",
            osxCode: "af.lproj",
            osxLocale: "af",
            glottolog: "afri1274",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/af.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Akan",
        nativeName: "Ákán",
        ids: {
            locale: "ak-GH",
            ISO_639_1: "ak",
            ISO_639_2: "aka",
            ISO_639_3: "aka",
            androidCode: "ak-rGH",
            osxCode: "ak.lproj",
            osxLocale: "ak",
            glottolog: "akan1250",
        },
        direction: "ltr",
        country: "Ghana",
        countryCode: "gh",
        flag: {
            image: "https://crowdin.com/images/flags/ak.png",
            emoji: "🇬🇭",
            primaryColor: { hex: "#CF0921", rgb: [207, 9, 33], cmyk: [0, 96, 84, 19], base10: 13568289 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Akan, Twi",
        nativeName: "Twi",
        ids: {
            locale: "tw-TW",
            ISO_639_1: "tw",
            ISO_639_2: "twi",
            ISO_639_3: "twi",
            androidCode: "tw-rTW",
            osxCode: "tw.lproj",
            osxLocale: "tw",
            glottolog: "akua1239",
        },
        direction: "ltr",
        country: "Ghana",
        countryCode: "gh",
        flag: {
            image: "https://crowdin.com/images/flags/tw.png",
            emoji: "🇬🇭",
            primaryColor: { hex: "#CF0921", rgb: [207, 9, 33], cmyk: [0, 96, 84, 19], base10: 13568289 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Albanian",
        nativeName: "Shqip",
        ids: {
            locale: "sq-AL",
            ISO_639_1: "sq",
            ISO_639_2: "sqi",
            ISO_639_3: "sqi",
            androidCode: "sq-rAL",
            osxCode: "sq.lproj",
            osxLocale: "sq",
            glottolog: "alba1267",
        },
        direction: "ltr",
        country: "Albania",
        countryCode: "al",
        flag: {
            image: "https://crowdin.com/images/flags/sq.png",
            emoji: "🇦🇱",
            primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Amharic",
        nativeName: "አማርኛ",
        ids: {
            locale: "am-ET",
            ISO_639_1: "am",
            ISO_639_2: "amh",
            ISO_639_3: "amh",
            androidCode: "am-rET",
            osxCode: "am.lproj",
            osxLocale: "am",
            glottolog: "amha1245",
        },
        direction: "ltr",
        country: "Ethiopia",
        countryCode: "et",
        flag: {
            image: "https://crowdin.com/images/flags/am.png",
            emoji: "🇪🇹",
            primaryColor: { hex: "#078930", rgb: [7, 137, 48], cmyk: [95, 0, 65, 46], base10: 493872 },
            flagColors: [
                { hex: "#009A44", rgb: [0, 154, 68], cmyk: [92, 0, 97, 0], base10: 39492 },
                { hex: "#FEDD00", rgb: [254, 221, 0], cmyk: [0, 1, 100, 0], base10: 16702720 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#0645B1", rgb: [6, 69, 177], cmyk: [99, 76, 0, 0], base10: 411057 },
            ],
        },
    },
    {
        name: "Arabic",
        nativeName: "العربية",
        ids: {
            locale: "ar",
            ISO_639_1: "ar",
            ISO_639_2: "ara",
            ISO_639_3: "ara",
            androidCode: "ar-rSA",
            osxCode: "ar.lproj",
            osxLocale: "ar",
            glottolog: "arab1395",
        },
        direction: "rtl",
        country: "Jordan",
        countryCode: "jo",
        flag: {
            image: "https://crowdin.com/images/flags/ar.png",
            emoji: "🇯🇴",
            primaryColor: { hex: "#007A3D", rgb: [0, 122, 61], cmyk: [100, 0, 50, 52], base10: 31293 },
            flagColors: [
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 95, 100, 0], base10: 13504806 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007A3D", rgb: [0, 122, 61], cmyk: [93, 0, 100, 0], base10: 31293 },
            ],
        },
    },
    {
        name: "Arabic, Bahrain",
        nativeName: "اللهجة البحرينية",
        ids: {
            locale: "ar-BH",
            ISO_639_1: "ar",
            ISO_639_2: "ara",
            ISO_639_3: "afb",
            androidCode: "ar-rBH",
            osxCode: "ar-BH.lproj",
            osxLocale: "ar_BH",
            glottolog: "gulf1241",
        },
        direction: "rtl",
        country: "Bahrain",
        countryCode: "bh",
        flag: {
            image: "https://crowdin.com/images/flags/ar-BH.png",
            emoji: "🇧🇭",
            primaryColor: { hex: "#F21731", rgb: [242, 23, 49], cmyk: [0, 91, 80, 5], base10: 15865649 },
            flagColors: [
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 95, 100, 0], base10: 13504806 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Arabic, Egypt",
        nativeName: "اللهجة المصرية",
        ids: {
            locale: "ar-EG",
            ISO_639_1: "ar",
            ISO_639_2: "ara",
            ISO_639_3: "arz",
            androidCode: "ar-rEG",
            osxCode: "ar-EG.lproj",
            osxLocale: "ar_EG",
            glottolog: "egyp1253",
        },
        direction: "rtl",
        country: "Egypt",
        countryCode: "eg",
        flag: {
            image: "https://crowdin.com/images/flags/ar-EG.png",
            emoji: "🇪🇬",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#C09300", rgb: [192, 147, 0], cmyk: [0, 10, 98, 0], base10: 12620544 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Arabic, Saudi Arabia",
        nativeName: "اللهجة السعودية",
        ids: {
            locale: "ar-SA",
            ISO_639_1: "ar",
            ISO_639_2: "ara",
            ISO_639_3: "ars",
            androidCode: "ar-rSA",
            osxCode: "ar-SA.lproj",
            osxLocale: "ar_SA",
            glottolog: "najd1235",
        },
        direction: "rtl",
        country: "Saudi Arabia",
        countryCode: "sa",
        flag: {
            image: "https://crowdin.com/images/flags/ar-SA.png",
            emoji: "🇸🇦",
            primaryColor: { hex: "#006C35", rgb: [0, 108, 53], cmyk: [100, 0, 51, 58], base10: 27701 },
            flagColors: [
                { hex: "#165d31", rgb: [22, 93, 49], cmyk: [93, 0, 100, 0], base10: 1465649 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Arabic, Yemen",
        nativeName: "اللهجة اليمنية",
        ids: {
            locale: "ar-YE",
            ISO_639_1: "ar",
            ISO_639_2: "ara",
            ISO_639_3: "acq",
            androidCode: "ar-rYE",
            osxCode: "ar-YE.lproj",
            osxLocale: "ar_YE",
            glottolog: "taiz1242",
        },
        direction: "rtl",
        country: "Yemen",
        countryCode: "ye",
        flag: {
            image: "https://crowdin.com/images/flags/ar-YE.png",
            emoji: "🇾🇪",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 90, 76, 0], base10: 13504806 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Aragonese",
        nativeName: "Aragonés",
        ids: {
            locale: "an-ES",
            ISO_639_1: "an",
            ISO_639_2: "arg",
            ISO_639_3: "arg",
            androidCode: "an-rES",
            osxCode: "an.lproj",
            osxLocale: "an",
            glottolog: "arag1245",
        },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/an.png",
            primaryColor: { hex: "#FFDA0C", rgb: [255, 218, 12], cmyk: [0, 15, 95, 0], base10: 16767500 },
            flagColors: [
                { hex: "#FCDD09", rgb: [252, 221, 9], cmyk: [0, 12, 96, 1], base10: 16571657 },
                { hex: "#DA121A", rgb: [218, 18, 26], cmyk: [0, 92, 88, 15], base10: 14291482 },
                { hex: "#0F47AF", rgb: [15, 71, 175], cmyk: [91, 59, 0, 31], base10: 1001391 },
                { hex: "#CAB313", rgb: [202, 179, 19], cmyk: [0, 11, 91, 21], base10: 13284115 },
                { hex: "#E7E7E7", rgb: [231, 231, 231], cmyk: [0, 0, 0, 9], base10: 15198183 },
                { hex: "#008F4C", rgb: [0, 143, 76], cmyk: [100, 0, 47, 44], base10: 36684 },
            ],
        },
        region: "Aragon",
        regionCode: "ar",
    },
    {
        name: "Armenian",
        nativeName: "հայերեն",
        ids: {
            locale: "hy-AM",
            ISO_639_1: "hy",
            ISO_639_2: "hye",
            ISO_639_3: "hye",
            androidCode: "hy-rAM",
            osxCode: "hy.lproj",
            osxLocale: "hy",
            glottolog: "arme1241",
        },
        direction: "ltr",
        country: "Armenia",
        countryCode: "am",
        flag: {
            image: "https://crowdin.com/images/flags/hy-AM.png",
            emoji: "🇦🇲",
            primaryColor: { hex: "#D90012", rgb: [217, 0, 18], cmyk: [0, 100, 92, 15], base10: 14221330 },
            flagColors: [
                { hex: "#D90012", rgb: [217, 0, 18], cmyk: [0, 95, 100, 0], base10: 14221330 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FF9E1B", rgb: [255, 158, 27], cmyk: [0, 40, 97, 0], base10: 16752155 },
            ],
        },
    },
    {
        name: "Arpitan",
        nativeName: "Arpetan",
        ids: { locale: "frp-IT", ISO_639_3: "frp", androidCode: "frp-rIT", osxCode: "frp.lproj", osxLocale: "frp", glottolog: "fran1269" },
        direction: "ltr",
        country: "Italy",
        countryCode: "it",
        flag: {
            image: "https://crowdin.com/images/flags/frp.png",
            primaryColor: { hex: "#EB1C24", rgb: [235, 28, 36], cmyk: [0, 88, 85, 8], base10: 15408164 },
            flagColors: [
                { hex: "#EB1C24", rgb: [235, 28, 36], cmyk: [0, 88, 85, 8], base10: 15408164 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#F9CF02", rgb: [249, 207, 2], cmyk: [0, 17, 99, 2], base10: 16371458 },
            ],
        },
        region: "Arpitania",
        regionCode: "frp",
    },
    {
        name: "Assamese",
        nativeName: "অসমীয়া",
        ids: {
            locale: "as-IN",
            ISO_639_1: "as",
            ISO_639_2: "asm",
            ISO_639_3: "asm",
            androidCode: "as-rIN",
            osxCode: "as.lproj",
            osxLocale: "as",
            glottolog: "assa1263",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/as.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
        region: "Assam",
        regionCode: "as",
    },
    {
        name: "Asturian",
        nativeName: "Asturianu",
        ids: {
            locale: "ast-ES",
            ISO_639_2: "ast",
            ISO_639_3: "ast",
            androidCode: "ast-rES",
            osxCode: "ast.lproj",
            osxLocale: "ast",
            glottolog: "astu1245",
        },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/ast.png",
            primaryColor: { hex: "#0066FF", rgb: [0, 102, 255], cmyk: [100, 60, 0, 0], base10: 26367 },
            flagColors: [
                { hex: "#0066FF", rgb: [0, 102, 255], cmyk: [100, 60, 0, 0], base10: 26367 },
                { hex: "#F7D417", rgb: [247, 212, 23], cmyk: [0, 14, 91, 3], base10: 16241687 },
            ],
        },
        region: "Asturias",
        regionCode: "as",
    },
    {
        name: "Atayal",
        nativeName: "Tayal",
        ids: { locale: "tay-TW", ISO_639_3: "tay", androidCode: "tay-rTW", osxCode: "tay.lproj", osxLocale: "tay", glottolog: "atay1247" },
        direction: "ltr",
        country: "Taiwan",
        countryCode: "tw",
        flag: {
            image: "https://crowdin.com/images/flags/tay.png",
            emoji: "🇹🇼",
            primaryColor: { hex: "#FE0000", rgb: [254, 0, 0], cmyk: [0, 100, 100, 0], base10: 16646144 },
            flagColors: [
                { hex: "#FE0000", rgb: [254, 0, 0], cmyk: [0, 100, 100, 0], base10: 16646144 },
                { hex: "#000095", rgb: [0, 0, 149], cmyk: [100, 100, 0, 42], base10: 149 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Avaric",
        nativeName: "MагIарул MацI",
        ids: {
            locale: "av-DA",
            ISO_639_1: "av",
            ISO_639_2: "ava",
            ISO_639_3: "ava",
            androidCode: "av-rDA",
            osxCode: "av.lproj",
            osxLocale: "av",
            glottolog: "avar1256",
        },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/av.png",
            primaryColor: { hex: "#0039A6", rgb: [0, 57, 166], cmyk: [100, 66, 0, 35], base10: 14758 },
            flagColors: [
                { hex: "#00923F", rgb: [0, 146, 63], cmyk: [100, 0, 57, 43], base10: 37439 },
                { hex: "#0039A6", rgb: [0, 57, 166], cmyk: [100, 66, 0, 35], base10: 14758 },
                { hex: "#D81E05", rgb: [216, 30, 5], cmyk: [0, 86, 98, 15], base10: 14163461 },
            ],
        },
        region: "Dagestan",
        regionCode: "da",
    },
    {
        name: "Avestan",
        nativeName: "𐬎𐬞𐬀𐬯𐬙𐬀𐬎𐬎𐬀𐬐𐬀𐬉𐬥𐬀",
        ids: {
            locale: "ae-IR",
            ISO_639_1: "ae",
            ISO_639_2: "ave",
            ISO_639_3: "ave",
            androidCode: "ae-rIR",
            osxCode: "ae.lproj",
            osxLocale: "ae",
            glottolog: "aves1237",
        },
        direction: "ltr",
        country: "Iran",
        countryCode: "ir",
        flag: {
            image: "https://crowdin.com/images/flags/ae.png",
            emoji: "🇮🇷",
            primaryColor: { hex: "#da0000", rgb: [218, 0, 0], cmyk: [0, 100, 100, 15], base10: 14286848 },
            flagColors: [
                { hex: "#239F40", rgb: [35, 159, 64], cmyk: [100, 0, 67, 23], base10: 2334528 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#DA0000", rgb: [218, 0, 0], cmyk: [0, 100, 80, 5], base10: 14286848 },
            ],
        },
        region: "Avesta",
        regionCode: "ae",
    },
    {
        name: "Aymara",
        nativeName: "Aymar aru",
        ids: {
            locale: "ay-BO",
            ISO_639_1: "ay",
            ISO_639_2: "aym",
            ISO_639_3: "aym",
            androidCode: "ay-rBO",
            osxCode: "ay.lproj",
            osxLocale: "ay",
            glottolog: "nucl1667",
        },
        direction: "ltr",
        country: "Bolivia",
        countryCode: "bo",
        flag: {
            image: "https://crowdin.com/images/flags/ay.png",
            primaryColor: { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#078930", rgb: [7, 137, 48], cmyk: [95, 0, 65, 46], base10: 493872 },
                { hex: "#0F47AF", rgb: [15, 71, 175], cmyk: [91, 59, 0, 31], base10: 1001391 },
                { hex: "#742C64", rgb: [116, 44, 100], cmyk: [0, 62, 14, 55], base10: 7613540 },
                { hex: "#DA121A", rgb: [218, 18, 26], cmyk: [0, 92, 88, 15], base10: 14291482 },
                { hex: "#EB7711", rgb: [235, 119, 17], cmyk: [0, 49, 93, 8], base10: 15431441 },
                { hex: "#FCDD09", rgb: [252, 221, 9], cmyk: [0, 12, 96, 1], base10: 16571657 },
            ],
        },
        region: "Andes Mountains",
        regionCode: "ay",
    },
    {
        name: "Azerbaijani",
        nativeName: "Azərbaycan",
        ids: {
            locale: "az-AZ",
            ISO_639_1: "az",
            ISO_639_2: "aze",
            ISO_639_3: "aze",
            androidCode: "az-rAZ",
            osxCode: "az.lproj",
            osxLocale: "az",
            glottolog: "mode1262",
        },
        direction: "ltr",
        country: "Azerbaijan",
        countryCode: "az",
        flag: {
            image: "https://crowdin.com/images/flags/az.png",
            emoji: "🇦🇿",
            primaryColor: { hex: "#0092BC", rgb: [0, 146, 188], cmyk: [100, 22, 0, 26], base10: 37564 },
            flagColors: [
                { hex: "#0092BC", rgb: [0, 146, 188], cmyk: [100, 0, 11, 6], base10: 37564 },
                { hex: "#E4002B", rgb: [228, 0, 43], cmyk: [0, 100, 89, 0], base10: 14942251 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00AF66", rgb: [0, 175, 102], cmyk: [92, 0, 85, 0], base10: 44902 },
            ],
        },
    },
    {
        name: "Balinese",
        nativeName: "ᬪᬵᬱᬩᬮᬶ",
        ids: {
            locale: "ban-ID",
            ISO_639_2: "ban",
            ISO_639_3: "ban",
            androidCode: "ban-rID",
            osxCode: "ban.lproj",
            osxLocale: "ban",
            glottolog: "bali1278",
        },
        direction: "ltr",
        country: "Indonesia",
        countryCode: "id",
        flag: {
            image: "https://crowdin.com/images/flags/ban.png",
            emoji: "🇮🇩",
            primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Bali",
        regionCode: "ban",
    },
    {
        name: "Balochi",
        nativeName: "Balòci",
        ids: {
            locale: "bal-BA",
            ISO_639_2: "bal",
            ISO_639_3: "bal",
            androidCode: "bal-rBA",
            osxCode: "bal.lproj",
            osxLocale: "bal",
            glottolog: "balo1260",
        },
        direction: "ltr",
        country: "Pakistan",
        countryCode: "pk",
        flag: {
            image: "https://crowdin.com/images/flags/bal.png",
            primaryColor: { hex: "#004226", rgb: [0, 66, 38], cmyk: [100, 0, 42, 74], base10: 16934 },
            flagColors: [
                { hex: "#004226", rgb: [0, 66, 38], cmyk: [100, 0, 42, 74], base10: 16934 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Balochistan",
        regionCode: "ba",
    },
    {
        name: "Bambara",
        nativeName: "Bamanankan",
        ids: {
            locale: "bm-ML",
            ISO_639_1: "bm",
            ISO_639_2: "bam",
            ISO_639_3: "bam",
            androidCode: "bm-rML",
            osxCode: "bm.lproj",
            osxLocale: "bm",
            glottolog: "bamb1269",
        },
        direction: "ltr",
        country: "Mali",
        countryCode: "ml",
        flag: {
            image: "https://crowdin.com/images/flags/bm.png",
            emoji: "🇲🇱",
            primaryColor: { hex: "#FCD116", rgb: [20, 181, 58], cmyk: [89, 0, 68, 29], base10: 1357114 },
            flagColors: [
                { hex: "#14B53A", rgb: [20, 181, 58], cmyk: [93, 0, 100, 0], base10: 1357114 },
                { hex: "#FCD116", rgb: [252, 209, 22], cmyk: [0, 5, 100, 0], base10: 16568598 },
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 90, 76, 0], base10: 13504806 },
            ],
        },
        region: "Bamana",
        regionCode: "bm",
    },
    {
        name: "Bashkir",
        nativeName: "Башҡортса",
        ids: {
            locale: "ba-RU",
            ISO_639_1: "ba",
            ISO_639_2: "bak",
            ISO_639_3: "bak",
            androidCode: "ba-rRU",
            osxCode: "ba.lproj",
            osxLocale: "ba",
            glottolog: "bash1264",
        },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/ba.png",
            primaryColor: { hex: "#0070FF", rgb: [0, 112, 255], cmyk: [100, 56, 0, 0], base10: 28927 },
            flagColors: [
                { hex: "#0070FF", rgb: [0, 112, 255], cmyk: [100, 56, 0, 0], base10: 28927 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007000", rgb: [0, 112, 0], cmyk: [100, 0, 100, 56], base10: 28672 },
                { hex: "#FFD700", rgb: [255, 215, 0], cmyk: [0, 16, 100, 0], base10: 16766720 },
            ],
        },
        region: "Bashkortostan",
        regionCode: "ba",
    },
    {
        name: "Basque",
        nativeName: "Euskara",
        ids: {
            locale: "eu-ES",
            ISO_639_1: "eu",
            ISO_639_2: "eus",
            ISO_639_3: "eus",
            androidCode: "eu-rES",
            osxCode: "eu.lproj",
            osxLocale: "eu",
            glottolog: "basq1248",
        },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/eu.png",
            primaryColor: { hex: "#009B48", rgb: [0, 155, 72], cmyk: [100, 0, 54, 39], base10: 39752 },
            flagColors: [
                { hex: "#D52B1E", rgb: [213, 43, 30], cmyk: [0, 80, 86, 17], base10: 13970206 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#009B48", rgb: [0, 155, 72], cmyk: [100, 0, 54, 39], base10: 39752 },
            ],
        },
        region: "Basque Country",
        regionCode: "pv",
    },
    {
        name: "Belarusian",
        nativeName: "беларуская",
        ids: {
            locale: "be-BY",
            ISO_639_1: "be",
            ISO_639_2: "bel",
            ISO_639_3: "bel",
            androidCode: "be-rBY",
            osxCode: "be.lproj",
            osxLocale: "be",
            glottolog: "bela1254",
        },
        direction: "ltr",
        country: "Belarus",
        countryCode: "by",
        flag: {
            image: "https://crowdin.com/images/flags/be.png",
            emoji: "🇧🇾",
            primaryColor: { hex: "#CF101A", rgb: [207, 16, 26], cmyk: [0, 92, 87, 19], base10: 13570074 },
            flagColors: [
                { hex: "#D22730", rgb: [210, 39, 48], cmyk: [0, 96, 82, 1], base10: 13772592 },
                { hex: "#00AF66", rgb: [0, 175, 102], cmyk: [92, 0, 85, 0], base10: 44902 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Bengali",
        nativeName: "বাংলা",
        ids: {
            locale: "bn-BD",
            ISO_639_1: "bn",
            ISO_639_2: "ben",
            ISO_639_3: "ben",
            androidCode: "bn-rBD",
            osxCode: "bn.lproj",
            osxLocale: "bn",
            glottolog: "beng1280",
        },
        direction: "ltr",
        country: "Bangladesh",
        countryCode: "bn",
        flag: {
            image: "https://crowdin.com/images/flags/bn.png",
            emoji: "🇧🇩",
            primaryColor: { hex: "#006747", rgb: [0, 103, 71], cmyk: [100, 0, 31, 60], base10: 26439 },
            flagColors: [
                { hex: "#F42A41", rgb: [244, 42, 65], cmyk: [0, 95, 100, 0], base10: 16001601 },
                { hex: "#006A4E", rgb: [0, 106, 78], cmyk: [93, 4, 75, 43], base10: 27214 },
            ],
        },
    },
    {
        name: "Bengali, India",
        nativeName: "বাংলা, ভারত",
        ids: {
            locale: "bn-IN",
            ISO_639_1: "bn",
            ISO_639_2: "ben",
            ISO_639_3: "ben",
            androidCode: "bn-rIN",
            osxCode: "bn-IN.lproj",
            osxLocale: "bn_IN",
            glottolog: "beng1280",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/bn-IN.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Berber",
        nativeName: "Tamaziɣt",
        ids: {
            locale: "ber-DZ",
            ISO_639_2: "ber",
            ISO_639_3: "ber",
            androidCode: "ber-rDZ",
            osxCode: "ber.lproj",
            osxLocale: "ber",
            glottolog: "berb1260",
        },
        direction: "ltr",
        country: "Algeria",
        countryCode: "dz",
        flag: {
            image: "https://crowdin.com/images/flags/ber.png",
            primaryColor: { hex: "#99CC33", rgb: [153, 204, 51], cmyk: [25, 0, 75, 20], base10: 10079283 },
            flagColors: [
                { hex: "#0099CC", rgb: [0, 153, 204], cmyk: [100, 25, 0, 20], base10: 39372 },
                { hex: "#99CC33", rgb: [153, 204, 51], cmyk: [25, 0, 75, 20], base10: 10079283 },
                { hex: "#FFE513", rgb: [255, 229, 19], cmyk: [0, 10, 93, 0], base10: 16770323 },
                { hex: "#CC0033", rgb: [204, 0, 51], cmyk: [0, 100, 75, 20], base10: 13369395 },
            ],
        },
        region: "Berber",
        regionCode: "ber",
    },
    {
        name: "Bihari",
        nativeName: "Bihari",
        ids: {
            locale: "bh-IN",
            ISO_639_1: "bh",
            ISO_639_2: "bih",
            ISO_639_3: "bih",
            androidCode: "bh-rIN",
            osxCode: "bh.lproj",
            osxLocale: "bh",
            glottolog: "biha1245",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/bh.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
        region: "Bihar",
        regionCode: "br",
    },
    {
        name: "Birifor",
        nativeName: "Birifor",
        ids: { locale: "bfo-BF", ISO_639_3: "bfo", androidCode: "bfo-rBF", osxCode: "bfo.lproj", osxLocale: "bfo", glottolog: "biri1257" },
        direction: "ltr",
        country: "Burkina Faso",
        countryCode: "bf",
        flag: {
            image: "https://crowdin.com/images/flags/bfo.png",
            emoji: "🇧🇫",
            primaryColor: { hex: "#009E49", rgb: [0, 158, 73], cmyk: [100, 0, 54, 38], base10: 40521 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
            ],
        },
    },
    {
        name: "Bislama",
        nativeName: "Bislama",
        ids: {
            locale: "bi-VU",
            ISO_639_1: "bi",
            ISO_639_2: "bis",
            ISO_639_3: "bis",
            androidCode: "bi-rVU",
            osxCode: "bi.lproj",
            osxLocale: "bi",
            glottolog: "bisl1239",
        },
        direction: "ltr",
        country: "Vanuatu",
        countryCode: "vu",
        flag: {
            image: "https://crowdin.com/images/flags/bi.png",
            emoji: "🇻🇺",
            primaryColor: { hex: "#FDCE12", rgb: [253, 206, 18], cmyk: [0, 19, 93, 1], base10: 16633362 },
            flagColors: [
                { hex: "#C0102E", rgb: [192, 16, 46], cmyk: [0, 100, 80, 5], base10: 12587054 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#009A44", rgb: [0, 154, 68], cmyk: [92, 0, 97, 0], base10: 39492 },
            ],
        },
    },
    {
        name: "Bosnian",
        nativeName: "Bosanski",
        ids: {
            locale: "bs-BA",
            ISO_639_1: "bs",
            ISO_639_2: "bos",
            ISO_639_3: "bos",
            androidCode: "bs-rBA",
            osxCode: "bs.lproj",
            osxLocale: "bs",
            glottolog: "bosn1245",
        },
        direction: "ltr",
        country: "Bosnia and Herzegovina",
        countryCode: "ba",
        flag: {
            image: "https://crowdin.com/images/flags/bs.png",
            emoji: "🇧🇦",
            primaryColor: { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 85, 0, 46], base10: 5257 },
            flagColors: [
                { hex: "#002F6C", rgb: [0, 47, 108], cmyk: [100, 74, 0, 45], base10: 12140 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
            ],
        },
    },
    {
        name: "Breton",
        nativeName: "Brezhoneg",
        ids: {
            locale: "br-FR",
            ISO_639_1: "br",
            ISO_639_2: "bre",
            ISO_639_3: "bre",
            androidCode: "br-rFR",
            osxCode: "br.lproj",
            osxLocale: "br",
            glottolog: "bret1244",
        },
        direction: "ltr",
        country: "France",
        countryCode: "fr",
        flag: {
            image: "https://crowdin.com/images/flags/br-FR.png",
            primaryColor: { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Brittany",
        regionCode: "e",
    },
    {
        name: "Bulgarian",
        nativeName: "български",
        ids: {
            locale: "bg-BG",
            ISO_639_1: "bg",
            ISO_639_2: "bul",
            ISO_639_3: "bul",
            androidCode: "bg-rBG",
            osxCode: "bg.lproj",
            osxLocale: "bg",
            glottolog: "bulg1262",
        },
        direction: "ltr",
        country: "Bulgaria",
        countryCode: "bg",
        flag: {
            image: "https://crowdin.com/images/flags/bg.png",
            emoji: "🇧🇬",
            primaryColor: { hex: "#009B74", rgb: [0, 155, 116], cmyk: [100, 0, 25, 39], base10: 39796 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00966E", rgb: [0, 150, 110], cmyk: [92, 0, 85, 0], base10: 38510 },
                { hex: "#D62612", rgb: [214, 38, 18], cmyk: [0, 95, 100, 0], base10: 14034450 },
            ],
        },
    },
    {
        name: "Burmese",
        nativeName: "မြန်မာဘာသာ",
        ids: {
            locale: "my-MM",
            ISO_639_1: "my",
            ISO_639_2: "mya",
            ISO_639_3: "mya",
            androidCode: "my-rMM",
            osxCode: "my.lproj",
            osxLocale: "my",
            glottolog: "nucl1310",
        },
        direction: "ltr",
        country: "Myanmar",
        countryCode: "mm",
        flag: {
            image: "https://crowdin.com/images/flags/my.png",
            emoji: "🇲🇲",
            primaryColor: { hex: "#EA2839", rgb: [234, 40, 57], cmyk: [0, 83, 76, 8], base10: 15345721 },
            flagColors: [
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#43B02A", rgb: [67, 176, 42], cmyk: [68, 0, 100, 0], base10: 4436010 },
                { hex: "#EE2737", rgb: [238, 39, 55], cmyk: [0, 93, 82, 0], base10: 15607607 },
            ],
        },
    },
    {
        name: "Catalan",
        nativeName: "Català",
        ids: {
            locale: "ca-ES",
            ISO_639_1: "ca",
            ISO_639_2: "cat",
            ISO_639_3: "cat",
            androidCode: "ca-rES",
            osxCode: "ca.lproj",
            osxLocale: "ca",
            glottolog: "stan1289",
        },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/ca.png",
            primaryColor: { hex: "#DA121A", rgb: [218, 18, 26], cmyk: [0, 92, 88, 15], base10: 14291482 },
            flagColors: [
                { hex: "#FCDD09", rgb: [252, 221, 9], cmyk: [0, 12, 96, 1], base10: 16571657 },
                { hex: "#DA121A", rgb: [218, 18, 26], cmyk: [0, 92, 88, 15], base10: 14291482 },
            ],
        },
        region: "Catalonia",
        regionCode: "ca",
    },
    {
        name: "Cebuano",
        nativeName: "Sugboanon",
        ids: {
            locale: "ceb-PH",
            ISO_639_2: "ceb",
            ISO_639_3: "ceb",
            androidCode: "ceb-rPH",
            osxCode: "ceb.lproj",
            osxLocale: "ceb",
            glottolog: "cebu1242",
        },
        direction: "ltr",
        country: "Philippines",
        countryCode: "ph",
        flag: {
            image: "https://crowdin.com/images/flags/ceb.png",
            emoji: "🇵🇭",
            primaryColor: { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 67, 0, 34], base10: 14504 },
            flagColors: [
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
                { hex: "#BF0D3E", rgb: [191, 13, 62], cmyk: [0, 100, 59, 11], base10: 12520766 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FED141", rgb: [254, 209, 65], cmyk: [0, 9, 80, 0], base10: 16699713 },
            ],
        },
        region: "Central Visayas",
        regionCode: "07",
    },
    {
        name: "Chamorro",
        nativeName: "Chamoru",
        ids: {
            locale: "ch-GU",
            ISO_639_1: "ch",
            ISO_639_2: "cha",
            ISO_639_3: "cha",
            androidCode: "ch-rGU",
            osxCode: "ch.lproj",
            osxLocale: "ch",
            glottolog: "cham1312",
        },
        direction: "ltr",
        country: "Guam",
        countryCode: "gu",
        flag: {
            image: "https://crowdin.com/images/flags/ch.png",
            emoji: "🇬🇺",
            primaryColor: { hex: "#00257C", rgb: [0, 37, 124], cmyk: [100, 70, 0, 51], base10: 9596 },
            flagColors: [
                { hex: "#C62139", rgb: [198, 33, 57], cmyk: [0, 90, 76, 0], base10: 12984633 },
                { hex: "#00297B", rgb: [0, 41, 123], cmyk: [100, 78, 0, 57], base10: 10619 },
            ],
        },
    },
    {
        name: "Chechen",
        nativeName: "Нохчийн",
        ids: {
            locale: "ce-CE",
            ISO_639_1: "ce",
            ISO_639_2: "che",
            ISO_639_3: "che",
            androidCode: "ce-rCE",
            osxCode: "ce.lproj",
            osxLocale: "ce",
            glottolog: "chec1245",
        },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/ce.png",
            primaryColor: { hex: "#2B7338", rgb: [43, 115, 56], cmyk: [63, 0, 51, 55], base10: 2847544 },
            flagColors: [
                { hex: "#2B7338", rgb: [43, 115, 56], cmyk: [63, 0, 51, 55], base10: 2847544 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#DA251D", rgb: [218, 37, 29], cmyk: [0, 83, 87, 15], base10: 14296349 },
                { hex: "#FFCC00", rgb: [255, 204, 0], cmyk: [0, 20, 100, 0], base10: 16763904 },
            ],
        },
        region: "Chechnya",
        regionCode: "ce",
    },
    {
        name: "Cherokee",
        nativeName: "ᏣᎳᎩ",
        ids: {
            locale: "chr-US",
            ISO_639_2: "chr",
            ISO_639_3: "chr",
            androidCode: "chr-rUS",
            osxCode: "chr.lproj",
            osxLocale: "chr",
            glottolog: "cher1273",
        },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/chr.png",
            emoji: "🇺🇸",
            primaryColor: { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [90, 49, 0, 62], base10: 668001 },
            flagColors: [
                { hex: "#B31942", rgb: [179, 25, 66], cmyk: [0, 100, 66, 13], base10: 11737410 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [100, 68, 0, 54], base10: 668001 },
            ],
        },
        region: "Oklahoma",
        regionCode: "ok",
    },
    {
        name: "Chewa",
        nativeName: "Chichewa",
        ids: {
            locale: "ny-MW",
            ISO_639_1: "ny",
            ISO_639_2: "nya",
            ISO_639_3: "nya",
            androidCode: "ny-rMW",
            osxCode: "ny.lproj",
            osxLocale: "ny",
            glottolog: "nyan1308",
        },
        direction: "ltr",
        country: "Malawi",
        countryCode: "mw",
        flag: {
            image: "https://crowdin.com/images/flags/ny.png",
            emoji: "🇲🇼",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#007A33", rgb: [0, 122, 51], cmyk: [91, 0, 100, 26], base10: 31283 },
            ],
        },
    },
    {
        name: "Chinese Simplified",
        nativeName: "简体中文",
        ids: {
            locale: "zh-CN",
            ISO_639_1: "zh",
            ISO_639_2: "zho",
            ISO_639_3: "zho",
            androidCode: "zh-rCN",
            osxCode: "zh-Hans.lproj",
            osxLocale: "zh-Hans",
            glottolog: "sini1245",
        },
        direction: "ltr",
        country: "China",
        countryCode: "cn",
        flag: {
            image: "https://crowdin.com/images/flags/zh-CN.png",
            emoji: "🇨🇳",
            primaryColor: { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 88, 84, 7], base10: 15604773 },
            flagColors: [
                { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 88, 84, 7], base10: 15604773 },
                { hex: "#FFFF00", rgb: [255, 255, 0], cmyk: [0, 0, 100, 0], base10: 16776960 },
            ],
        },
    },
    {
        name: "Chinese Traditional",
        nativeName: "繁體中文",
        ids: {
            locale: "zh-TW",
            ISO_639_1: "zh",
            ISO_639_2: "zho",
            ISO_639_3: "zho",
            androidCode: "zh-rTW",
            osxCode: "zh-Hant.lproj",
            osxLocale: "zh-Hant",
            glottolog: "sini1245",
        },
        direction: "ltr",
        country: "Taiwan",
        countryCode: "tw",
        flag: {
            image: "https://crowdin.com/images/flags/zh-TW.png",
            emoji: "🇹🇼",
            primaryColor: { hex: "#FE0000", rgb: [254, 0, 0], cmyk: [0, 100, 100, 0], base10: 16646144 },
            flagColors: [
                { hex: "#FE0000", rgb: [254, 0, 0], cmyk: [0, 100, 100, 0], base10: 16646144 },
                { hex: "#000095", rgb: [0, 0, 149], cmyk: [100, 100, 0, 42], base10: 149 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Chinese Traditional, Hong Kong",
        nativeName: "繁體中文,香港",
        ids: {
            locale: "zh-HK",
            ISO_639_1: "zh",
            ISO_639_2: "zho",
            ISO_639_3: "zho",
            androidCode: "zh-rHK",
            osxCode: "zh-HK.lproj",
            osxLocale: "zh_HK",
            glottolog: "sini1245",
        },
        direction: "ltr",
        country: "Hong Kong",
        countryCode: "hk",
        flag: {
            image: "https://crowdin.com/images/flags/zh-HK.png",
            emoji: "🇭🇰",
            primaryColor: { hex: "#DE2408", rgb: [222, 36, 8], cmyk: [0, 84, 96, 13], base10: 14558216 },
            flagColors: [
                { hex: "#DE2910", rgb: [222, 41, 16], cmyk: [0, 82, 93, 13], base10: 14559504 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Chinese Traditional, Macau",
        nativeName: "繁體中文,澳門",
        ids: {
            locale: "zh-MO",
            ISO_639_1: "zh",
            ISO_639_2: "zho",
            ISO_639_3: "zho",
            androidCode: "zh-rMO",
            osxCode: "zh-MO.lproj",
            osxLocale: "zh_MO",
            glottolog: "sini1245",
        },
        direction: "ltr",
        country: "Macau",
        countryCode: "mo",
        flag: {
            image: "https://crowdin.com/images/flags/zh-MO.png",
            emoji: "🇲🇴",
            primaryColor: { hex: "#00795E", rgb: [0, 121, 94], cmyk: [100, 0, 22, 53], base10: 31070 },
            flagColors: [
                { hex: "#077662", rgb: [7, 118, 98], cmyk: [94, 0, 17, 54], base10: 489058 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FFDF1E", rgb: [255, 223, 30], cmyk: [0, 13, 88, 0], base10: 16768798 },
            ],
        },
    },
    {
        name: "Chinese Traditional, Singapore",
        nativeName: "繁體中文,新加坡",
        ids: {
            locale: "zh-SG",
            ISO_639_1: "zh",
            ISO_639_2: "zho",
            ISO_639_3: "zho",
            androidCode: "zh-rSG",
            osxCode: "zh-SG.lproj",
            osxLocale: "zh_SG",
            glottolog: "sini1245",
        },
        direction: "ltr",
        country: "Singapore",
        countryCode: "sg",
        flag: {
            image: "https://crowdin.com/images/flags/zh-SG.png",
            emoji: "🇸🇬",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#C73b3C", rgb: [199, 59, 60], cmyk: [0, 90, 76, 0], base10: 13056828 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Chuvash",
        nativeName: "Căvashla",
        ids: {
            locale: "cv-CU",
            ISO_639_1: "cv",
            ISO_639_2: "chv",
            ISO_639_3: "chv",
            androidCode: "cv-rCU",
            osxCode: "cv.lproj",
            osxLocale: "cv",
            glottolog: "chuv1255",
        },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/cv.png",
            primaryColor: { hex: "#FFDF00", rgb: [255, 223, 0], cmyk: [0, 13, 100, 0], base10: 16768768 },
            flagColors: [
                { hex: "#FFDF00", rgb: [255, 223, 0], cmyk: [0, 13, 100, 0], base10: 16768768 },
                { hex: "#A2260B", rgb: [162, 38, 11], cmyk: [0, 77, 93, 36], base10: 10626571 },
            ],
        },
        region: "Chuvashia",
        regionCode: "cu",
    },
    {
        name: "Cornish",
        nativeName: "Kernowek",
        ids: {
            locale: "kw-GB",
            ISO_639_1: "kw",
            ISO_639_2: "cor",
            ISO_639_3: "cor",
            androidCode: "kw-rGB",
            osxCode: "kw.lproj",
            osxLocale: "kw",
            glottolog: "corn1251",
        },
        direction: "ltr",
        country: "United Kingdom",
        countryCode: "gb",
        flag: {
            image: "https://crowdin.com/images/flags/kw.png",
            primaryColor: { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Cornwall",
        regionCode: "con",
    },
    {
        name: "Corsican",
        nativeName: "Corsu",
        ids: {
            locale: "co-FR",
            ISO_639_1: "co",
            ISO_639_2: "cos",
            ISO_639_3: "cos",
            androidCode: "co-rFR",
            osxCode: "co.lproj",
            osxLocale: "co",
            glottolog: "cors1241",
        },
        direction: "ltr",
        country: "France",
        countryCode: "fr",
        flag: {
            image: "https://crowdin.com/images/flags/co.png",
            primaryColor: { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Corsica",
        regionCode: "co",
    },
    {
        name: "Cree",
        nativeName: "ᓀᐦᐃᔭᐍᐏᐣ",
        ids: {
            locale: "cr-NT",
            ISO_639_1: "cr",
            ISO_639_2: "cre",
            ISO_639_3: "cre",
            androidCode: "cr-rNT",
            osxCode: "cr.lproj",
            osxLocale: "cr",
            glottolog: "cree1271",
        },
        direction: "ltr",
        country: "Canada",
        countryCode: "ca",
        flag: {
            image: "https://crowdin.com/images/flags/cr.png",
            primaryColor: { hex: "#2A317D", rgb: [42, 49, 125], cmyk: [66, 61, 0, 51], base10: 2765181 },
            flagColors: [
                { hex: "#2A317D", rgb: [42, 49, 125], cmyk: [66, 61, 0, 51], base10: 2765181 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#E32726", rgb: [227, 39, 38], cmyk: [0, 83, 83, 11], base10: 14886694 },
                { hex: "#00754A", rgb: [0, 117, 74], cmyk: [100, 0, 37, 54], base10: 30026 },
                { hex: "#FFC828", rgb: [255, 200, 40], cmyk: [0, 22, 84, 0], base10: 16762920 },
            ],
        },
        region: "Northwest Territories",
        regionCode: "nt",
    },
    {
        name: "Croatian",
        nativeName: "Hrvatski",
        ids: {
            locale: "hr-HR",
            ISO_639_1: "hr",
            ISO_639_2: "hrv",
            ISO_639_3: "hrv",
            androidCode: "hr-rHR",
            osxCode: "hr.lproj",
            osxLocale: "hr",
            glottolog: "croa1245",
        },
        direction: "ltr",
        country: "Croatia",
        countryCode: "hr",
        flag: {
            image: "https://crowdin.com/images/flags/hr.png",
            emoji: "🇭🇷",
            primaryColor: { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 92, 77, 22], base10: 13111342 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 85, 0, 39], base10: 74089 },
                { hex: "#71C5E8", rgb: [113, 197, 232], cmyk: [52, 0, 0, 0], base10: 7456232 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Czech",
        nativeName: "Čeština",
        ids: {
            locale: "cs-CZ",
            ISO_639_1: "cs",
            ISO_639_2: "ces",
            ISO_639_3: "ces",
            androidCode: "cs-rCZ",
            osxCode: "cs.lproj",
            osxLocale: "cs",
            glottolog: "czec1258",
        },
        direction: "ltr",
        country: "Czech Republic",
        countryCode: "cz",
        flag: {
            image: "https://crowdin.com/images/flags/cs.png",
            emoji: "🇨🇿",
            primaryColor: { hex: "#D7141A", rgb: [215, 20, 26], cmyk: [0, 91, 88, 16], base10: 14095386 },
            flagColors: [
                { hex: "#11457E", rgb: [17, 69, 126], cmyk: [100, 81, 0, 23], base10: 1131902 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#D7141A", rgb: [215, 20, 26], cmyk: [0, 100, 62, 0], base10: 14095386 },
            ],
        },
    },
    {
        name: "Danish",
        nativeName: "Dansk",
        ids: {
            locale: "da-DK",
            ISO_639_1: "da",
            ISO_639_2: "dan",
            ISO_639_3: "dan",
            androidCode: "da-rDK",
            osxCode: "da.lproj",
            osxLocale: "da",
            glottolog: "dani1285",
        },
        direction: "ltr",
        country: "Denmark",
        countryCode: "dk",
        flag: {
            image: "https://crowdin.com/images/flags/da.png",
            emoji: "🇩🇰",
            primaryColor: { hex: "#C60C30", rgb: [198, 12, 48], cmyk: [0, 94, 76, 22], base10: 12979248 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Dari",
        nativeName: "دری",
        ids: { locale: "fa-AF", ISO_639_3: "prs", androidCode: "fa-rAF", osxCode: "fa-AF.lproj", osxLocale: "fa_AF", glottolog: "dari1249" },
        direction: "rtl",
        country: "Afghanistan",
        countryCode: "af",
        flag: {
            image: "https://crowdin.com/images/flags/fa-AF.png",
            emoji: "🇦🇫",
            primaryColor: { hex: "#D32011", rgb: [211, 32, 17], cmyk: [0, 85, 92, 17], base10: 13836305 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#D32011", rgb: [211, 32, 17], cmyk: [0, 95, 100, 0], base10: 13836305 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007A36", rgb: [0, 122, 54], cmyk: [93, 0, 98, 17], base10: 31286 },
            ],
        },
    },
    {
        name: "Dhivehi",
        nativeName: "ދިވެހި",
        ids: {
            locale: "dv-MV",
            ISO_639_1: "dv",
            ISO_639_2: "div",
            ISO_639_3: "div",
            androidCode: "dv-rMV",
            osxCode: "dv.lproj",
            osxLocale: "dv",
            glottolog: "dhiv1236",
        },
        direction: "rtl",
        country: "Maldives",
        countryCode: "mv",
        flag: {
            image: "https://crowdin.com/images/flags/dv.png",
            emoji: "🇲🇻",
            primaryColor: { hex: "#D21034", rgb: [210, 16, 52], cmyk: [0, 92, 75, 18], base10: 13766708 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#00843D", rgb: [0, 132, 61], cmyk: [93, 0, 98, 17], base10: 33853 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Dutch",
        nativeName: "Nederlands",
        ids: {
            locale: "nl-NL",
            ISO_639_1: "nl",
            ISO_639_2: "nld",
            ISO_639_3: "nld",
            androidCode: "nl-rNL",
            osxCode: "nl.lproj",
            osxLocale: "nl",
            glottolog: "mode1257",
        },
        direction: "ltr",
        country: "Netherlands",
        countryCode: "nl",
        flag: {
            image: "https://crowdin.com/images/flags/nl.png",
            emoji: "🇳🇱",
            primaryColor: { hex: "#FF4F00", rgb: [255, 79, 0], cmyk: [0, 69, 100, 0], base10: 16731904 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15781 },
            ],
        },
    },
    {
        name: "Dutch, Belgium",
        nativeName: "Belgisch-Nederlands",
        ids: {
            locale: "nl-BE",
            ISO_639_1: "nl",
            ISO_639_2: "nld",
            ISO_639_3: "nld",
            androidCode: "nl-rBE",
            osxCode: "nl-BE.lproj",
            osxLocale: "nl_BE",
            glottolog: "mode1257",
        },
        direction: "ltr",
        country: "Belgium",
        countryCode: "be",
        flag: {
            image: "https://crowdin.com/images/flags/nl-BE.png",
            emoji: "🇧🇪",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#2D2926", rgb: [45, 41, 38], cmyk: [65, 66, 68, 82], base10: 2959654 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
            ],
        },
    },
    {
        name: "Dutch, Suriname",
        nativeName: "Surinaams-Nederlands",
        ids: {
            locale: "nl-SR",
            ISO_639_1: "nl",
            ISO_639_2: "nld",
            ISO_639_3: "nld",
            androidCode: "nl-rSR",
            osxCode: "nl-SR.lproj",
            osxLocale: "nl_SR",
            glottolog: "mode1257",
        },
        direction: "ltr",
        country: "Suriname",
        countryCode: "sr",
        flag: {
            image: "https://crowdin.com/images/flags/nl-SR.png",
            emoji: "🇸🇷",
            primaryColor: { hex: "#B40A2D", rgb: [180, 10, 45], cmyk: [0, 94, 75, 29], base10: 11799085 },
            flagColors: [
                { hex: "#007A33", rgb: [0, 122, 51], cmyk: [91, 0, 100, 26], base10: 31283 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
            ],
        },
    },
    {
        name: "Dzongkha",
        nativeName: "རྫོང་ཁ་",
        ids: {
            locale: "dz-BT",
            ISO_639_1: "dz",
            ISO_639_2: "dzo",
            ISO_639_3: "dzo",
            androidCode: "dz-rBT",
            osxCode: "dz.lproj",
            osxLocale: "dz",
            glottolog: "nucl1307",
        },
        direction: "ltr",
        country: "Bhutan",
        countryCode: "bt",
        flag: {
            image: "https://crowdin.com/images/flags/dz.png",
            emoji: "🇧🇹",
            primaryColor: { hex: "#FF4E12", rgb: [255, 78, 18], cmyk: [0, 69, 93, 0], base10: 16731666 },
            flagColors: [
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#FF6720", rgb: [255, 103, 32], cmyk: [0, 68, 96, 0], base10: 16738080 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "English",
        nativeName: "English",
        ids: {
            locale: "en",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rUS",
            osxCode: "en.lproj",
            osxLocale: "en",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/en.png",
            emoji: "🇺🇸",
            primaryColor: { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [90, 49, 0, 62], base10: 668001 },
            flagColors: [
                { hex: "#B31942", rgb: [179, 25, 66], cmyk: [0, 100, 66, 13], base10: 11737410 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [100, 68, 0, 54], base10: 668001 },
            ],
        },
    },
    {
        name: "English (upside down)",
        nativeName: "ɥsıןƃuƎ",
        ids: { locale: "en-UD", androidCode: "en-rUD", osxCode: "en-UD.lproj", osxLocale: "en_UD" },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/en-UD.png",
            emoji: "🇺🇸",
            primaryColor: { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [90, 49, 0, 62], base10: 668001 },
            flagColors: [
                { hex: "#B31942", rgb: [179, 25, 66], cmyk: [0, 100, 66, 13], base10: 11737410 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [100, 68, 0, 54], base10: 668001 },
            ],
        },
    },
    {
        name: "English, Arabia",
        nativeName: "English, Arabia",
        ids: {
            locale: "en-AR",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rAR",
            osxCode: "en-AR.lproj",
            osxLocale: "en_AR",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "United Arab Emirates",
        countryCode: "ae",
        flag: {
            image: "https://crowdin.com/images/flags/en-AR.png",
            emoji: "🇦🇪",
            primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "English, Australia",
        nativeName: "English, Australia",
        ids: {
            locale: "en-AU",
            ISO_639_1: "en",
            ISO_639_2: "aus",
            ISO_639_3: "eng",
            androidCode: "en-rAU",
            osxCode: "en-AU.lproj",
            osxLocale: "en_AU",
            glottolog: "aust1314",
        },
        direction: "ltr",
        country: "Australia",
        countryCode: "au",
        flag: {
            image: "https://crowdin.com/images/flags/en-AU.png",
            emoji: "🇦🇺",
            primaryColor: { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 20, 100, 0], base10: 16764160 },
            flagColors: [
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 85, 0, 39], base10: 74089 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#E4002B", rgb: [228, 0, 43], cmyk: [0, 100, 89, 0], base10: 14942251 },
            ],
        },
    },
    {
        name: "English, Belize",
        nativeName: "English, Belize",
        ids: {
            locale: "en-BZ",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rBZ",
            osxCode: "en-BZ.lproj",
            osxLocale: "en_BZ",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Belize",
        countryCode: "bz",
        flag: {
            image: "https://crowdin.com/images/flags/en-BZ.png",
            emoji: "🇧🇿",
            primaryColor: { hex: "#003F87", rgb: [0, 63, 135], cmyk: [100, 53, 0, 47], base10: 16263 },
            flagColors: [
                { hex: "#D90F19", rgb: [217, 15, 25], cmyk: [0, 90, 76, 0], base10: 14225177 },
                { hex: "#171696", rgb: [23, 22, 150], cmyk: [100, 76, 0, 9], base10: 1513110 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "English, Canada",
        nativeName: "English, Canada",
        ids: {
            locale: "en-CA",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rCA",
            osxCode: "en-CA.lproj",
            osxLocale: "en_CA",
            glottolog: "cana1268",
        },
        direction: "ltr",
        country: "Canada",
        countryCode: "ca",
        flag: {
            image: "https://crowdin.com/images/flags/en-CA.png",
            emoji: "🇨🇦",
            primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            flagColors: [
                { hex: "#D80621", rgb: [216, 6, 33], cmyk: [0, 90, 76, 0], base10: 14157345 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "English, Caribbean",
        nativeName: "English, Caribbean",
        ids: {
            locale: "en-CB",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rCB",
            osxCode: "en-CB.lproj",
            osxLocale: "en_CB",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/en-CB.png",
            emoji: "🇺🇸",
            primaryColor: { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [90, 49, 0, 62], base10: 668001 },
            flagColors: [
                { hex: "#B31942", rgb: [179, 25, 66], cmyk: [0, 100, 66, 13], base10: 11737410 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [100, 68, 0, 54], base10: 668001 },
            ],
        },
        region: "Caribbean",
        regionCode: "cb",
    },
    {
        name: "English, China",
        nativeName: "English, China",
        ids: {
            locale: "en-CN",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rCN",
            osxCode: "en-CN.lproj",
            osxLocale: "en_CN",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "China",
        countryCode: "cn",
        flag: {
            image: "https://crowdin.com/images/flags/en-CN.png",
            emoji: "🇨🇳",
            primaryColor: { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 88, 84, 7], base10: 15604773 },
            flagColors: [
                { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 88, 84, 7], base10: 15604773 },
                { hex: "#FFFF00", rgb: [255, 255, 0], cmyk: [0, 0, 100, 0], base10: 16776960 },
            ],
        },
    },
    {
        name: "English, Denmark",
        nativeName: "English, Denmark",
        ids: {
            locale: "en-DK",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rDK",
            osxCode: "en-DK.lproj",
            osxLocale: "en_DK",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Denmark",
        countryCode: "dk",
        flag: {
            image: "https://crowdin.com/images/flags/en-DK.png",
            emoji: "🇩🇰",
            primaryColor: { hex: "#C60C30", rgb: [198, 12, 48], cmyk: [0, 94, 76, 22], base10: 12979248 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "English, Hong Kong",
        nativeName: "English, Hong Kong",
        ids: {
            locale: "en-HK",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rHK",
            osxCode: "en-HK.lproj",
            osxLocale: "en_HK",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Hong Kong",
        countryCode: "hk",
        flag: {
            image: "https://crowdin.com/images/flags/en-HK.png",
            emoji: "🇭🇰",
            primaryColor: { hex: "#DE2408", rgb: [222, 36, 8], cmyk: [0, 84, 96, 13], base10: 14558216 },
            flagColors: [
                { hex: "#DE2910", rgb: [222, 41, 16], cmyk: [0, 82, 93, 13], base10: 14559504 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "English, India",
        nativeName: "English, India",
        ids: {
            locale: "en-IN",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rIN",
            osxCode: "en-IN.lproj",
            osxLocale: "en_IN",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/en-IN.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "English, Indonesia",
        nativeName: "English, Indonesia",
        ids: {
            locale: "en-ID",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rID",
            osxCode: "en-ID.lproj",
            osxLocale: "en_ID",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Indonesia",
        countryCode: "id",
        flag: {
            image: "https://crowdin.com/images/flags/en-ID.png",
            emoji: "🇮🇩",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "English, Ireland",
        nativeName: "English, Ireland",
        ids: {
            locale: "en-IE",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rIE",
            osxCode: "en-IE.lproj",
            osxLocale: "en_IE",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Ireland",
        countryCode: "ie",
        flag: {
            image: "https://crowdin.com/images/flags/en-IE.png",
            emoji: "🇮🇪",
            primaryColor: { hex: "#169B62", rgb: [22, 155, 98], cmyk: [86, 0, 37, 39], base10: 1481570 },
            flagColors: [
                { hex: "#009A44", rgb: [0, 154, 68], cmyk: [92, 0, 97, 0], base10: 39492 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FF8200", rgb: [255, 130, 0], cmyk: [0, 54, 100, 0], base10: 16744960 },
            ],
        },
    },
    {
        name: "English, Jamaica",
        nativeName: "English, Jamaica",
        ids: {
            locale: "en-JM",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rJM",
            osxCode: "en-JM.lproj",
            osxLocale: "en_JM",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Jamaica",
        countryCode: "jm",
        flag: {
            image: "https://crowdin.com/images/flags/en-JM.png",
            emoji: "🇯🇲",
            primaryColor: { hex: "#009B3A", rgb: [0, 155, 58], cmyk: [100, 0, 63, 39], base10: 39738 },
            flagColors: [
                { hex: "#009B3A", rgb: [0, 155, 58], cmyk: [93, 0, 100, 0], base10: 39738 },
                { hex: "#FED100", rgb: [254, 209, 0], cmyk: [0, 4, 88, 0], base10: 16699648 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "English, Japan",
        nativeName: "English, Japan",
        ids: {
            locale: "en-JA",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rJA",
            osxCode: "en-JA.lproj",
            osxLocale: "en_JA",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Japan",
        countryCode: "ja",
        flag: {
            image: "https://crowdin.com/images/flags/en-JA.png",
            emoji: "🇯🇵",
            primaryColor: { hex: "#BC002D", rgb: [188, 0, 45], cmyk: [0, 100, 76, 26], base10: 12320813 },
            flagColors: [
                { hex: "#BC002D", rgb: [188, 0, 45], cmyk: [0, 100, 90, 0], base10: 12320813 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "English, Malaysia",
        nativeName: "English, Malaysia",
        ids: {
            locale: "en-MY",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rMY",
            osxCode: "en-MY.lproj",
            osxLocale: "en_MY",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Malaysia",
        countryCode: "my",
        flag: {
            image: "https://crowdin.com/images/flags/en-MY.png",
            emoji: "🇲🇾",
            primaryColor: { hex: "#FFCC00", rgb: [255, 204, 0], cmyk: [0, 20, 100, 0], base10: 16763904 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
            ],
        },
    },
    {
        name: "English, New Zealand",
        nativeName: "English, New Zealand",
        ids: {
            locale: "en-NZ",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rNZ",
            osxCode: "en-NZ.lproj",
            osxLocale: "en_NZ",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "New Zealand",
        countryCode: "nz",
        flag: {
            image: "https://crowdin.com/images/flags/en-NZ.png",
            emoji: "🇳🇿",
            primaryColor: { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 85, 0, 39], base10: 74089 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "English, Norway",
        nativeName: "English, Norway",
        ids: {
            locale: "en-NO",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rNO",
            osxCode: "en-NO.lproj",
            osxLocale: "en_NO",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Norway",
        countryCode: "no",
        flag: {
            image: "https://crowdin.com/images/flags/en-NO.png",
            emoji: "🇳🇴",
            primaryColor: { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 94, 75, 27], base10: 12192815 },
            flagColors: [
                { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 100, 76, 13], base10: 12192815 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00205B", rgb: [0, 32, 91], cmyk: [100, 78, 0, 57], base10: 8283 },
            ],
        },
    },
    {
        name: "English, Philippines",
        nativeName: "English, Philippines",
        ids: {
            locale: "en-PH",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rPH",
            osxCode: "en-PH.lproj",
            osxLocale: "en_PH",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Philippines",
        countryCode: "ph",
        flag: {
            image: "https://crowdin.com/images/flags/en-PH.png",
            emoji: "🇵🇭",
            primaryColor: { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 67, 0, 34], base10: 14504 },
            flagColors: [
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
                { hex: "#BF0D3E", rgb: [191, 13, 62], cmyk: [0, 100, 59, 11], base10: 12520766 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FED141", rgb: [254, 209, 65], cmyk: [0, 9, 80, 0], base10: 16699713 },
            ],
        },
    },
    {
        name: "English, Puerto Rico",
        nativeName: "English, Puerto Rico",
        ids: {
            locale: "en-PR",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rPR",
            osxCode: "en-PR.lproj",
            osxLocale: "en_PR",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Puerto Rico",
        countryCode: "pr",
        flag: {
            image: "https://crowdin.com/images/flags/en-PR.png",
            emoji: "🇵🇷",
            primaryColor: { hex: "#E92228", rgb: [233, 34, 40], cmyk: [0, 85, 83, 9], base10: 15278632 },
            flagColors: [
                { hex: "#E92228", rgb: [233, 34, 40], cmyk: [0, 90, 76, 0], base10: 15278632 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#3A5EAB", rgb: [58, 94, 171], cmyk: [100, 78, 0, 57], base10: 3825323 },
            ],
        },
    },
    {
        name: "English, Singapore",
        nativeName: "English, Singapore",
        ids: {
            locale: "en-SG",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rSG",
            osxCode: "en-SG.lproj",
            osxLocale: "en_SG",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Singapore",
        countryCode: "sg",
        flag: {
            image: "https://crowdin.com/images/flags/en-SG.png",
            emoji: "🇸🇬",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#C73b3C", rgb: [199, 59, 60], cmyk: [0, 90, 76, 0], base10: 13056828 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "English, South Africa",
        nativeName: "English, South Africa",
        ids: {
            locale: "en-ZA",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rZA",
            osxCode: "en-ZA.lproj",
            osxLocale: "en_ZA",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/en-ZA.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "English, Sweden",
        nativeName: "English, Sweden",
        ids: {
            locale: "en-SE",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rSE",
            osxCode: "en-SE.lproj",
            osxLocale: "en_SE",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Sweden",
        countryCode: "se",
        flag: {
            image: "https://crowdin.com/images/flags/en-SE.png",
            emoji: "🇸🇪",
            primaryColor: { hex: "#FECC02", rgb: [254, 204, 2], cmyk: [0, 20, 99, 0], base10: 16698370 },
            flagColors: [
                { hex: "#006AA7", rgb: [0, 106, 167], cmyk: [100, 37, 0, 35], base10: 27303 },
                { hex: "#FECC02", rgb: [254, 204, 2], cmyk: [0, 20, 99, 0], base10: 16698370 },
            ],
        },
    },
    {
        name: "English, United Kingdom",
        nativeName: "English, United Kingdom",
        ids: {
            locale: "en-GB",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rGB",
            osxCode: "en-GB.lproj",
            osxLocale: "en_GB",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "United Kingdom",
        countryCode: "gb",
        flag: {
            image: "https://crowdin.com/images/flags/en-GB.png",
            emoji: "🇬🇧",
            primaryColor: { hex: "#00247D", rgb: [0, 36, 125], cmyk: [100, 71, 0, 51], base10: 9341 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 85, 0, 39], base10: 74089 },
            ],
        },
    },
    {
        name: "English, United States",
        nativeName: "English, United States",
        ids: {
            locale: "en-US",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rUS",
            osxCode: "en-US.lproj",
            osxLocale: "en_US",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/en-US.png",
            emoji: "🇺🇸",
            primaryColor: { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [90, 49, 0, 62], base10: 668001 },
            flagColors: [
                { hex: "#B31942", rgb: [179, 25, 66], cmyk: [0, 100, 66, 13], base10: 11737410 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [100, 68, 0, 54], base10: 668001 },
            ],
        },
    },
    {
        name: "English, Zimbabwe",
        nativeName: "English, Zimbabwe",
        ids: {
            locale: "en-ZW",
            ISO_639_1: "en",
            ISO_639_2: "eng",
            ISO_639_3: "eng",
            androidCode: "en-rZW",
            osxCode: "en-ZW.lproj",
            osxLocale: "en_ZW",
            glottolog: "stan1293",
        },
        direction: "ltr",
        country: "Zimbabwe",
        countryCode: "zw",
        flag: {
            image: "https://crowdin.com/images/flags/en-ZW.png",
            emoji: "🇿🇼",
            primaryColor: { hex: "#FFD200", rgb: [255, 210, 0], cmyk: [0, 18, 100, 0], base10: 16765440 },
            flagColors: [
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#FCE300", rgb: [252, 227, 0], cmyk: [0, 0, 100, 0], base10: 16573184 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
            ],
        },
    },
    {
        name: "Esperanto",
        nativeName: "Esperanto",
        ids: {
            locale: "eo-UY",
            ISO_639_1: "eo",
            ISO_639_2: "epo",
            ISO_639_3: "epo",
            androidCode: "eo-rUY",
            osxCode: "eo.lproj",
            osxLocale: "eo",
            glottolog: "espe1235",
        },
        direction: "ltr",
        country: "International",
        countryCode: "uy",
        flag: {
            image: "https://crowdin.com/images/flags/eo.png",
            primaryColor: { hex: "#009900", rgb: [0, 153, 0], cmyk: [100, 0, 100, 40], base10: 39168 },
            flagColors: [
                { hex: "#009900", rgb: [0, 153, 0], cmyk: [100, 0, 100, 40], base10: 39168 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Estonian",
        nativeName: "Eesti keel",
        ids: {
            locale: "et-EE",
            ISO_639_1: "et",
            ISO_639_2: "est",
            ISO_639_3: "est",
            androidCode: "et-rEE",
            osxCode: "et.lproj",
            osxLocale: "et",
            glottolog: "esto1258",
        },
        direction: "ltr",
        country: "Estonia",
        countryCode: "ee",
        flag: {
            image: "https://crowdin.com/images/flags/et.png",
            emoji: "🇪🇪",
            primaryColor: { hex: "#0072CE", rgb: [0, 114, 206], cmyk: [100, 45, 0, 19], base10: 29390 },
            flagColors: [
                { hex: "#0072CE", rgb: [0, 114, 206], cmyk: [90, 47, 0, 0], base10: 29390 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Ewe",
        nativeName: "Eʋegbe",
        ids: {
            locale: "ee-GH",
            ISO_639_1: "ee",
            ISO_639_2: "ewe",
            ISO_639_3: "ewe",
            androidCode: "ee-rGH",
            osxCode: "ee.lproj",
            osxLocale: "ee",
            glottolog: "ewee1241",
        },
        direction: "ltr",
        country: "Ghana",
        countryCode: "gh",
        flag: {
            image: "https://crowdin.com/images/flags/ee.png",
            emoji: "🇬🇭",
            primaryColor: { hex: "#CF0921", rgb: [207, 9, 33], cmyk: [0, 96, 84, 19], base10: 13568289 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Faroese",
        nativeName: "Føroyskt",
        ids: {
            locale: "fo-FO",
            ISO_639_1: "fo",
            ISO_639_2: "fao",
            ISO_639_3: "fao",
            androidCode: "fo-rFO",
            osxCode: "fo.lproj",
            osxLocale: "fo",
            glottolog: "faro1244",
        },
        direction: "ltr",
        country: "Faroe Islands",
        countryCode: "fo",
        flag: {
            image: "https://crowdin.com/images/flags/fo.png",
            emoji: "🇫🇴",
            primaryColor: { hex: "#0165BF", rgb: [1, 101, 191], cmyk: [99, 47, 0, 25], base10: 91583 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0065BD", rgb: [0, 101, 189], cmyk: [100, 47, 0, 26], base10: 26045 },
                { hex: "#ED2939", rgb: [237, 41, 57], cmyk: [0, 83, 76, 7], base10: 15542585 },
            ],
        },
    },
    {
        name: "Fijian",
        nativeName: "Vakaviti",
        ids: {
            locale: "fj-FJ",
            ISO_639_1: "fj",
            ISO_639_2: "fij",
            ISO_639_3: "fij",
            androidCode: "fj-rFJ",
            osxCode: "fj.lproj",
            osxLocale: "fj",
            glottolog: "fiji1243",
        },
        direction: "ltr",
        country: "Fiji Islands",
        countryCode: "fj",
        flag: {
            image: "https://crowdin.com/images/flags/fj.png",
            emoji: "🇫🇯",
            primaryColor: { hex: "#68bfe5", rgb: [104, 191, 229], cmyk: [55, 17, 0, 10], base10: 6864869 },
            flagColors: [
                { hex: "#69B3E7", rgb: [105, 179, 231], cmyk: [58, 8, 0, 0], base10: 6927335 },
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 78, 0, 57], base10: 74089 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 90, 76, 0], base10: 13111342 },
            ],
        },
    },
    {
        name: "Filipino",
        nativeName: "Wikang Filipino",
        ids: {
            locale: "fil-PH",
            ISO_639_2: "fil",
            ISO_639_3: "fil",
            androidCode: "fil-rPH",
            osxCode: "fil.lproj",
            osxLocale: "fil",
            glottolog: "fili1244",
        },
        direction: "ltr",
        country: "Philippines",
        countryCode: "ph",
        flag: {
            image: "https://crowdin.com/images/flags/fil.png",
            emoji: "🇵🇭",
            primaryColor: { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 67, 0, 34], base10: 14504 },
            flagColors: [
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
                { hex: "#BF0D3E", rgb: [191, 13, 62], cmyk: [0, 100, 59, 11], base10: 12520766 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FED141", rgb: [254, 209, 65], cmyk: [0, 9, 80, 0], base10: 16699713 },
            ],
        },
    },
    {
        name: "Finnish",
        nativeName: "Suomi",
        ids: {
            locale: "fi-FI",
            ISO_639_1: "fi",
            ISO_639_2: "fin",
            ISO_639_3: "fin",
            androidCode: "fi-rFI",
            osxCode: "fi.lproj",
            osxLocale: "fi",
            glottolog: "finn1318",
        },
        direction: "ltr",
        country: "Finland",
        countryCode: "fi",
        flag: {
            image: "https://crowdin.com/images/flags/fi.png",
            emoji: "🇫🇮",
            primaryColor: { hex: "#002F6C", rgb: [0, 47, 108], cmyk: [100, 56, 0, 58], base10: 12140 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#002F6C", rgb: [0, 47, 108], cmyk: [100, 74, 0, 45], base10: 12140 },
            ],
        },
    },
    {
        name: "Flemish",
        nativeName: "Vlaams",
        ids: { locale: "vls-BE", ISO_639_3: "vls", androidCode: "vls-rBE", osxCode: "vls.lproj", osxLocale: "vls", glottolog: "dutc1256" },
        direction: "ltr",
        country: "Belgium",
        countryCode: "be",
        flag: {
            image: "https://crowdin.com/images/flags/vls-BE.png",
            primaryColor: { hex: "#FEEA28", rgb: [254, 234, 40], cmyk: [0, 8, 84, 0], base10: 16706088 },
            flagColors: [
                { hex: "#FEEA28", rgb: [254, 234, 40], cmyk: [0, 8, 84, 0], base10: 16706088 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            ],
        },
        region: "Flanders",
        regionCode: "vlg",
    },
    {
        name: "Franconian",
        nativeName: "Fränkisch",
        ids: { locale: "fra-DE", ISO_639_3: "vmf", androidCode: "fra-rDE", osxCode: "fra.lproj", osxLocale: "fra", glottolog: "main1267" },
        direction: "ltr",
        country: "Germany",
        countryCode: "de",
        flag: {
            image: "https://crowdin.com/images/flags/fra-DE.png",
            emoji: "🇩🇪",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#DD0000", rgb: [221, 0, 0], cmyk: [0, 100, 100, 0], base10: 14483456 },
                { hex: "#FFCC00", rgb: [255, 204, 0], cmyk: [0, 12, 100, 5], base10: 16763904 },
            ],
        },
        region: "Franconia",
        regionCode: "fra",
    },
    {
        name: "French",
        nativeName: "Français",
        ids: {
            locale: "fr-FR",
            ISO_639_1: "fr",
            ISO_639_2: "fra",
            ISO_639_3: "fra",
            androidCode: "fr-rFR",
            osxCode: "fr.lproj",
            osxLocale: "fr",
            glottolog: "stan1290",
        },
        direction: "ltr",
        country: "French",
        countryCode: "fr",
        flag: {
            image: "https://crowdin.com/images/flags/fr.png",
            emoji: "🇫🇷",
            primaryColor: { hex: "#318CE7", rgb: [49, 140, 231], cmyk: [79, 39, 0, 9], base10: 3247335 },
            flagColors: [
                { hex: "#002395", rgb: [0, 35, 149], cmyk: [100, 80, 0, 0], base10: 9109 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#ED2939", rgb: [237, 41, 57], cmyk: [0, 100, 100, 0], base10: 15542585 },
            ],
        },
    },
    {
        name: "French, Belgium",
        nativeName: "Français, Belgique",
        ids: {
            locale: "fr-BE",
            ISO_639_1: "fr",
            ISO_639_2: "fra",
            ISO_639_3: "fra",
            androidCode: "fr-rBE",
            osxCode: "fr-BE.lproj",
            osxLocale: "fr_BE",
            glottolog: "stan1290",
        },
        direction: "ltr",
        country: "Belgium",
        countryCode: "be",
        flag: {
            image: "https://crowdin.com/images/flags/fr-BE.png",
            emoji: "🇧🇪",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#2D2926", rgb: [45, 41, 38], cmyk: [65, 66, 68, 82], base10: 2959654 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
            ],
        },
    },
    {
        name: "French, Canada",
        nativeName: "Français, Canada",
        ids: {
            locale: "fr-CA",
            ISO_639_1: "fr",
            ISO_639_2: "fra",
            ISO_639_3: "fra",
            androidCode: "fr-rCA",
            osxCode: "fr-CA.lproj",
            osxLocale: "fr_CA",
            glottolog: "stan1290",
        },
        direction: "ltr",
        country: "Canada",
        countryCode: "ca",
        flag: {
            image: "https://crowdin.com/images/flags/fr-CA.png",
            emoji: "🇨🇦",
            primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            flagColors: [
                { hex: "#D80621", rgb: [216, 6, 33], cmyk: [0, 90, 76, 0], base10: 14157345 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "French, Luxembourg",
        nativeName: "Français, Luxembourgeois",
        ids: {
            locale: "fr-LU",
            ISO_639_1: "fr",
            ISO_639_2: "fra",
            ISO_639_3: "fra",
            androidCode: "fr-rLU",
            osxCode: "fr-LU.lproj",
            osxLocale: "fr_LU",
            glottolog: "stan1290",
        },
        direction: "ltr",
        country: "Luxembourg",
        countryCode: "lu",
        flag: {
            image: "https://crowdin.com/images/flags/fr-LU.png",
            emoji: "🇱🇺",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#EA141D", rgb: [234, 20, 29], cmyk: [0, 90, 76, 0], base10: 15340573 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#51ADDA", rgb: [81, 173, 218], cmyk: [79, 7, 0, 0], base10: 5352922 },
            ],
        },
    },
    {
        name: "French, Quebec",
        nativeName: "Français, Québec",
        ids: {
            locale: "fr-QC",
            ISO_639_1: "fr",
            ISO_639_2: "fra",
            ISO_639_3: "fra",
            androidCode: "fr-rQC",
            osxCode: "fr-QC.lproj",
            osxLocale: "fr_QC",
            glottolog: "stan1290",
        },
        direction: "ltr",
        country: "Canada",
        countryCode: "ca",
        flag: {
            image: "https://crowdin.com/images/flags/fr-QC.png",
            primaryColor: { hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 63, 0, 35], base10: 15781 },
            flagColors: [
                { hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 63, 0, 35], base10: 15781 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Quebec",
        regionCode: "qc",
    },
    {
        name: "French, Switzerland",
        nativeName: "Français, Suisse",
        ids: {
            locale: "fr-CH",
            ISO_639_1: "fr",
            ISO_639_2: "fra",
            ISO_639_3: "fra",
            androidCode: "fr-rCH",
            osxCode: "fr-CH.lproj",
            osxLocale: "fr_CH",
            glottolog: "stan1290",
        },
        direction: "ltr",
        country: "Switzerland",
        countryCode: "ch",
        flag: {
            image: "https://crowdin.com/images/flags/fr-CH.png",
            emoji: "🇨🇭",
            primaryColor: { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 81, 87, 15], base10: 14297372 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Frisian",
        nativeName: "Frysk",
        ids: {
            locale: "fy-NL",
            ISO_639_1: "fy",
            ISO_639_2: "fry",
            ISO_639_3: "fry",
            androidCode: "fy-rNL",
            osxCode: "fy.lproj",
            osxLocale: "fy",
            glottolog: "fris1239",
        },
        direction: "ltr",
        country: "Netherlands",
        countryCode: "nl",
        flag: {
            image: "https://crowdin.com/images/flags/fy-NL.png",
            primaryColor: { hex: "#0155A5", rgb: [1, 85, 165], cmyk: [99, 48, 0, 35], base10: 87461 },
            flagColors: [
                { hex: "#0155A5", rgb: [1, 85, 165], cmyk: [99, 48, 0, 35], base10: 87461 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#EE3E34", rgb: [238, 62, 52], cmyk: [0, 74, 78, 7], base10: 15613492 },
            ],
        },
        region: "Friesland",
        regionCode: "fr",
    },
    {
        name: "Friulian",
        nativeName: "Furlan",
        ids: {
            locale: "fur-IT",
            ISO_639_2: "fur",
            ISO_639_3: "fur",
            androidCode: "fur-rIT",
            osxCode: "fur.lproj",
            osxLocale: "fur",
            glottolog: "friu1240",
        },
        direction: "ltr",
        country: "Italy",
        countryCode: "it",
        flag: {
            image: "https://crowdin.com/images/flags/fur-IT.png",
            emoji: "🇮🇹",
            primaryColor: { hex: "#196DB6", rgb: [25, 109, 182], cmyk: [86, 40, 0, 29], base10: 1666486 },
            flagColors: [
                { hex: "#008C45", rgb: [0, 140, 69], cmyk: [100, 0, 51, 45], base10: 35909 },
                { hex: "#F4F9FF", rgb: [244, 249, 255], cmyk: [4, 2, 0, 0], base10: 16054783 },
                { hex: "#CD212A", rgb: [205, 33, 42], cmyk: [0, 84, 80, 20], base10: 13443370 },
            ],
        },
        region: "Friuli",
        regionCode: "fur",
    },
    {
        name: "Fula",
        nativeName: "Fulfulde",
        ids: {
            locale: "ff-ZA",
            ISO_639_1: "ff",
            ISO_639_2: "ful",
            ISO_639_3: "ful",
            androidCode: "ff-rZA",
            osxCode: "ff.lproj",
            osxLocale: "ff",
            glottolog: "fula1264",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/ff.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Ga",
        nativeName: "Gã",
        ids: {
            locale: "gaa-GH",
            ISO_639_2: "gaa",
            ISO_639_3: "gaa",
            androidCode: "gaa-rGH",
            osxCode: "gaa.lproj",
            osxLocale: "gaa",
            glottolog: "gaaa1244",
        },
        direction: "ltr",
        country: "Ghana",
        countryCode: "gh",
        flag: {
            image: "https://crowdin.com/images/flags/gaa.png",
            emoji: "🇬🇭",
            primaryColor: { hex: "#CF0921", rgb: [207, 9, 33], cmyk: [0, 96, 84, 19], base10: 13568289 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Galician",
        nativeName: "Galego",
        ids: {
            locale: "gl-ES",
            ISO_639_1: "gl",
            ISO_639_2: "glg",
            ISO_639_3: "glg",
            androidCode: "gl-rES",
            osxCode: "gl.lproj",
            osxLocale: "gl",
            glottolog: "gali1258",
        },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/gl.png",
            primaryColor: { hex: "#0099CC", rgb: [0, 153, 204], cmyk: [100, 25, 0, 20], base10: 39372 },
            flagColors: [
                { hex: "#0099CC", rgb: [0, 153, 204], cmyk: [100, 25, 0, 20], base10: 39372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#005BBF", rgb: [0, 91, 191], cmyk: [100, 52, 0, 25], base10: 23487 },
                { hex: "#CCCCCC", rgb: [204, 204, 204], cmyk: [0, 0, 0, 20], base10: 13421772 },
                { hex: "#BCAC0B", rgb: [188, 172, 11], cmyk: [0, 9, 94, 26], base10: 12364811 },
                { hex: "#D81126", rgb: [216, 17, 38], cmyk: [0, 92, 82, 15], base10: 14160166 },
                { hex: "#139576", rgb: [19, 149, 118], cmyk: [87, 0, 21, 42], base10: 1283446 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
        region: "Galiza",
        regionCode: "ga",
    },
    {
        name: "Georgian",
        nativeName: "ქართული",
        ids: {
            locale: "ka-GE",
            ISO_639_1: "ka",
            ISO_639_2: "kat",
            ISO_639_3: "kat",
            androidCode: "ka-rGE",
            osxCode: "ka.lproj",
            osxLocale: "ka",
            glottolog: "nucl1302",
        },
        direction: "ltr",
        country: "Georgia",
        countryCode: "ge",
        flag: {
            image: "https://crowdin.com/images/flags/ka.png",
            emoji: "🇬🇪",
            primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "German",
        nativeName: "Deutsch",
        ids: {
            locale: "de-DE",
            ISO_639_1: "de",
            ISO_639_2: "deu",
            ISO_639_3: "deu",
            androidCode: "de-rDE",
            osxCode: "de.lproj",
            osxLocale: "de",
            glottolog: "high1289",
        },
        direction: "ltr",
        country: "Germany",
        countryCode: "de",
        flag: {
            image: "https://crowdin.com/images/flags/de.png",
            emoji: "🇩🇪",
            primaryColor: { hex: "#DD0000", rgb: [221, 0, 0], cmyk: [0, 100, 100, 13], base10: 14483456 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#DD0000", rgb: [221, 0, 0], cmyk: [0, 100, 100, 0], base10: 14483456 },
                { hex: "#FFCC00", rgb: [255, 204, 0], cmyk: [0, 12, 100, 5], base10: 16763904 },
            ],
        },
    },
    {
        name: "German, Austria",
        nativeName: "Deutsch, Österreich",
        ids: {
            locale: "de-AT",
            ISO_639_1: "de",
            ISO_639_2: "deu",
            ISO_639_3: "deu",
            androidCode: "de-rAT",
            osxCode: "de-AT.lproj",
            osxLocale: "de_AT",
            glottolog: "high1289",
        },
        direction: "ltr",
        country: "Austria",
        countryCode: "at",
        flag: {
            image: "https://crowdin.com/images/flags/de-AT.png",
            emoji: "🇦🇹",
            primaryColor: { hex: "#ED2939", rgb: [237, 41, 57], cmyk: [0, 83, 76, 7], base10: 15542585 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "German, Belgium",
        nativeName: "Deutsch, Belgien",
        ids: {
            locale: "de-BE",
            ISO_639_1: "de",
            ISO_639_2: "deu",
            ISO_639_3: "deu",
            androidCode: "de-rBE",
            osxCode: "de-BE.lproj",
            osxLocale: "de_BE",
            glottolog: "high1289",
        },
        direction: "ltr",
        country: "Belgium",
        countryCode: "be",
        flag: {
            image: "https://crowdin.com/images/flags/de-BE.png",
            emoji: "🇧🇪",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#2D2926", rgb: [45, 41, 38], cmyk: [65, 66, 68, 82], base10: 2959654 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
            ],
        },
    },
    {
        name: "German, Liechtenstein",
        nativeName: "Deutsch, Liechtenstein",
        ids: {
            locale: "de-LI",
            ISO_639_1: "de",
            ISO_639_2: "deu",
            ISO_639_3: "deu",
            androidCode: "de-rLI",
            osxCode: "de-LI.lproj",
            osxLocale: "de_LI",
            glottolog: "high1290",
        },
        direction: "ltr",
        country: "Liechtenstein",
        countryCode: "li",
        flag: {
            image: "https://crowdin.com/images/flags/de-LI.png",
            emoji: "🇱🇮",
            primaryColor: { hex: "#002780", rgb: [0, 39, 128], cmyk: [100, 70, 0, 50], base10: 10112 },
            flagColors: [
                { hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15781 },
                { hex: "#E4002B", rgb: [228, 0, 43], cmyk: [0, 100, 89, 0], base10: 14942251 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
            ],
        },
    },
    {
        name: "German, Luxembourg",
        nativeName: "Deutsch, Luxemburg",
        ids: {
            locale: "de-LU",
            ISO_639_1: "de",
            ISO_639_2: "deu",
            ISO_639_3: "deu",
            androidCode: "de-rLU",
            osxCode: "de-LU.lproj",
            osxLocale: "de_LU",
            glottolog: "high1289",
        },
        direction: "ltr",
        country: "Luxembourg",
        countryCode: "lu",
        flag: {
            image: "https://crowdin.com/images/flags/de-LU.png",
            emoji: "🇱🇺",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#EA141D", rgb: [234, 20, 29], cmyk: [0, 90, 76, 0], base10: 15340573 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#51ADDA", rgb: [81, 173, 218], cmyk: [79, 7, 0, 0], base10: 5352922 },
            ],
        },
    },
    {
        name: "German, Switzerland",
        nativeName: "Deutsch, Schweiz",
        ids: {
            locale: "de-CH",
            ISO_639_1: "de",
            ISO_639_2: "gsw",
            ISO_639_3: "gsw",
            androidCode: "de-rCH",
            osxCode: "de-CH.lproj",
            osxLocale: "de_CH",
            glottolog: "swis1247",
        },
        direction: "ltr",
        country: "Switzerland",
        countryCode: "ch",
        flag: {
            image: "https://crowdin.com/images/flags/de-CH.png",
            emoji: "🇨🇭",
            primaryColor: { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 81, 87, 15], base10: 14297372 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Gothic",
        nativeName: "𐌲𐌿𐍄𐍂𐌰𐌶𐌳𐌰",
        ids: {
            locale: "got-DE",
            ISO_639_2: "got",
            ISO_639_3: "got",
            androidCode: "got-rDE",
            osxCode: "got.lproj",
            osxLocale: "got",
            glottolog: "goth1244",
        },
        direction: "ltr",
        country: "Germany",
        countryCode: "de",
        flag: {
            image: "https://crowdin.com/images/flags/got.png",
            emoji: "🇩🇪",
            primaryColor: { hex: "#800080", rgb: [128, 0, 128], cmyk: [0, 100, 0, 50], base10: 8388736 },
            flagColors: [
                { hex: "#800080", rgb: [128, 0, 128], cmyk: [0, 100, 0, 50], base10: 8388736 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Greek",
        nativeName: "Ελληνικά",
        ids: {
            locale: "el-GR",
            ISO_639_1: "el",
            ISO_639_2: "ell",
            ISO_639_3: "ell",
            androidCode: "el-rGR",
            osxCode: "el.lproj",
            osxLocale: "el",
            glottolog: "gree1276",
        },
        direction: "ltr",
        country: "Greece",
        countryCode: "gr",
        flag: {
            image: "https://crowdin.com/images/flags/el.png",
            emoji: "🇬🇷",
            primaryColor: { hex: "#0D5EAF", rgb: [13, 94, 175], cmyk: [93, 46, 0, 31], base10: 876207 },
            flagColors: [
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Greek, Cyprus",
        nativeName: "Ελληνικά, Κύπρος",
        ids: {
            locale: "el-CY",
            ISO_639_1: "el",
            ISO_639_2: "ell",
            ISO_639_3: "ell",
            androidCode: "el-rCY",
            osxCode: "el-CY.lproj",
            osxLocale: "el_CY",
            glottolog: "gree1276",
        },
        direction: "ltr",
        country: "Cyprus",
        countryCode: "cy",
        flag: {
            image: "https://crowdin.com/images/flags/el-CY.png",
            emoji: "🇨🇾",
            primaryColor: { hex: "#D57800", rgb: [213, 120, 0], cmyk: [0, 44, 100, 16], base10: 13989888 },
            flagColors: [
                { hex: "#D57800", rgb: [213, 120, 0], cmyk: [0, 54, 100, 5], base10: 13989888 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#4E5B31", rgb: [78, 91, 49], cmyk: [49, 22, 85, 58], base10: 5135153 },
            ],
        },
    },
    {
        name: "Greenlandic",
        nativeName: "Kalaallisut",
        ids: {
            locale: "kl-GL",
            ISO_639_1: "kl",
            ISO_639_2: "kal",
            ISO_639_3: "kal",
            androidCode: "kl-rGL",
            osxCode: "kl.lproj",
            osxLocale: "kl",
            glottolog: "kala1399",
        },
        direction: "ltr",
        country: "Denmark",
        countryCode: "dk",
        flag: {
            image: "https://crowdin.com/images/flags/kl.png",
            emoji: "🇬🇱",
            primaryColor: { hex: "#C60C30", rgb: [198, 12, 48], cmyk: [0, 94, 76, 22], base10: 12979248 },
            flagColors: [
                { hex: "#D00C33", rgb: [208, 12, 51], cmyk: [0, 94, 76, 18], base10: 13634611 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Greenland",
        regionCode: "gl",
    },
    {
        name: "Guarani",
        nativeName: "Avañeʼẽ",
        ids: { locale: "gn-PY", ISO_639_1: "gn", ISO_639_3: "gug", androidCode: "gn-rPY", osxCode: "gn.lproj", osxLocale: "gn", glottolog: "para1311" },
        direction: "ltr",
        country: "Paraguay",
        countryCode: "py",
        flag: {
            image: "https://crowdin.com/images/flags/gn.png",
            emoji: "🇵🇾",
            primaryColor: { hex: "#D52B1E", rgb: [213, 43, 30], cmyk: [0, 80, 86, 16], base10: 13970206 },
            flagColors: [
                { hex: "#D52B1E", rgb: [213, 43, 30], cmyk: [0, 90, 76, 0], base10: 13970206 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 80, 0, 12], base10: 14504 },
                { hex: "#FEDF00", rgb: [254, 223, 0], cmyk: [0, 0, 100, 0], base10: 16703232 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#009B3A", rgb: [0, 155, 58], cmyk: [93, 0, 100, 0], base10: 39738 },
            ],
        },
    },
    {
        name: "Gujarati",
        nativeName: "ગુજરાતી",
        ids: {
            locale: "gu-IN",
            ISO_639_1: "gu",
            ISO_639_2: "guj",
            ISO_639_3: "guj",
            androidCode: "gu-rIN",
            osxCode: "gu.lproj",
            osxLocale: "gu",
            glottolog: "guja1252",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/gu-IN.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Haitian Creole",
        nativeName: "Kreyòl ayisyen",
        ids: {
            locale: "ht-HT",
            ISO_639_1: "ht",
            ISO_639_2: "hat",
            ISO_639_3: "hat",
            androidCode: "ht-rHT",
            osxCode: "ht.lproj",
            osxLocale: "ht",
            glottolog: "hait1244",
        },
        direction: "ltr",
        country: "Haiti",
        countryCode: "ht",
        flag: {
            image: "https://crowdin.com/images/flags/ht.png",
            emoji: "🇭🇹",
            primaryColor: { hex: "#00209F", rgb: [0, 32, 159], cmyk: [100, 80, 0, 38], base10: 8351 },
            flagColors: [
                { hex: "#00209F", rgb: [0, 32, 159], cmyk: [100, 76, 0, 9], base10: 8351 },
                { hex: "#D21034", rgb: [210, 16, 52], cmyk: [0, 90, 76, 0], base10: 13766708 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#016A16", rgb: [1, 106, 22], cmyk: [93, 0, 100, 0], base10: 92694 },
                { hex: "#F1B517", rgb: [241, 181, 23], cmyk: [0, 0, 100, 0], base10: 15840535 },
            ],
        },
    },
    {
        name: "Hausa",
        nativeName: "Hausa",
        ids: {
            locale: "ha-HG",
            ISO_639_1: "ha",
            ISO_639_2: "hau",
            ISO_639_3: "hau",
            androidCode: "ha-rHG",
            osxCode: "ha.lproj",
            osxLocale: "ha",
            glottolog: "haus1257",
        },
        direction: "ltr",
        country: "Nigeria",
        countryCode: "ng",
        flag: {
            image: "https://crowdin.com/images/flags/ha.png",
            emoji: "🇳🇬",
            primaryColor: { hex: "#008753", rgb: [0, 135, 83], cmyk: [100, 0, 39, 47], base10: 34643 },
            flagColors: [
                { hex: "#1B7339", rgb: [27, 115, 57], cmyk: [93, 0, 100, 0], base10: 1798969 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Hawaiian",
        nativeName: "Ōlelo Hawaiʻi",
        ids: {
            locale: "haw-US",
            ISO_639_2: "haw",
            ISO_639_3: "haw",
            androidCode: "haw-rUS",
            osxCode: "haw.lproj",
            osxLocale: "haw",
            glottolog: "hawa1245",
        },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/haw.png",
            primaryColor: { hex: "#00247D", rgb: [0, 36, 125], cmyk: [100, 71, 0, 51], base10: 9341 },
            flagColors: [
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [99, 69, 0, 59], base10: 74089 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 92, 77, 22], base10: 13111342 },
            ],
        },
        region: "Hawaii",
        regionCode: "hi",
    },
    {
        name: "Hebrew",
        nativeName: "עִברִית",
        ids: {
            locale: "he-IL",
            ISO_639_1: "he",
            ISO_639_2: "heb",
            ISO_639_3: "heb",
            androidCode: "iw-rIL",
            osxCode: "he.lproj",
            osxLocale: "he",
            glottolog: "hebr1246",
        },
        direction: "rtl",
        country: "Israel",
        countryCode: "il",
        flag: {
            image: "https://crowdin.com/images/flags/he.png",
            emoji: "🇮🇱",
            primaryColor: { hex: "#0038b8", rgb: [0, 56, 184], cmyk: [100, 70, 0, 28], base10: 14520 },
            flagColors: [
                { hex: "#005EB8", rgb: [0, 94, 184], cmyk: [100, 56, 0, 3], base10: 24248 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Herero",
        nativeName: "Otjiherero",
        ids: {
            locale: "hz-NA",
            ISO_639_1: "he",
            ISO_639_2: "heb",
            ISO_639_3: "heb",
            androidCode: "hz-rNA",
            osxCode: "hz.lproj",
            osxLocale: "hz",
            glottolog: "hebr1246",
        },
        direction: "ltr",
        country: "Namibia",
        countryCode: "na",
        flag: {
            image: "https://crowdin.com/images/flags/hz.png",
            emoji: "🇳🇦",
            primaryColor: { hex: "#D21034", rgb: [210, 16, 52], cmyk: [0, 92, 75, 18], base10: 13766708 },
            flagColors: [
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFC72C", rgb: [255, 199, 44], cmyk: [0, 16, 89, 0], base10: 16762668 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#009A44", rgb: [0, 154, 68], cmyk: [92, 0, 97, 0], base10: 39492 },
            ],
        },
    },
    {
        name: "Hiligaynon",
        nativeName: "Ilonggo",
        ids: {
            locale: "hil-PH",
            ISO_639_2: "hil",
            ISO_639_3: "hil",
            androidCode: "hil-rPH",
            osxCode: "hil.lproj",
            osxLocale: "hil",
            glottolog: "hili1240",
        },
        direction: "ltr",
        country: "Philippines",
        countryCode: "ph",
        flag: {
            image: "https://crowdin.com/images/flags/hil.png",
            emoji: "🇵🇭",
            primaryColor: { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 67, 0, 34], base10: 14504 },
            flagColors: [
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
                { hex: "#BF0D3E", rgb: [191, 13, 62], cmyk: [0, 100, 59, 11], base10: 12520766 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FED141", rgb: [254, 209, 65], cmyk: [0, 9, 80, 0], base10: 16699713 },
            ],
        },
        region: "Western Visayas",
        regionCode: "06",
    },
    {
        name: "Hindi",
        nativeName: "हिंदी",
        ids: {
            locale: "hi-IN",
            ISO_639_1: "hi",
            ISO_639_2: "hin",
            ISO_639_3: "hin",
            androidCode: "hi-rIN",
            osxCode: "hi.lproj",
            osxLocale: "hi",
            glottolog: "hind1269",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/hi.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Hiri Motu",
        nativeName: "Hiri Motu",
        ids: {
            locale: "ho-PG",
            ISO_639_1: "ho",
            ISO_639_2: "hmo",
            ISO_639_3: "hmo",
            androidCode: "ho-rPG",
            osxCode: "ho.lproj",
            osxLocale: "ho",
            glottolog: "hiri1237",
        },
        direction: "ltr",
        country: "Papua New Guinea",
        countryCode: "pg",
        flag: {
            image: "https://crowdin.com/images/flags/ho.png",
            emoji: "🇵🇬",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
            ],
        },
    },
    {
        name: "Hmong",
        nativeName: "Hmoob",
        ids: {
            locale: "hmn-CN",
            ISO_639_2: "hmn",
            ISO_639_3: "hmn",
            androidCode: "hmn-rCN",
            osxCode: "hmn.lproj",
            osxLocale: "hmn",
            glottolog: "firs1234",
        },
        direction: "ltr",
        country: "China",
        countryCode: "cn",
        flag: {
            image: "https://crowdin.com/images/flags/hmn.png",
            emoji: "🇨🇳",
            primaryColor: { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 88, 84, 7], base10: 15604773 },
            flagColors: [
                { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 88, 84, 7], base10: 15604773 },
                { hex: "#FFFF00", rgb: [255, 255, 0], cmyk: [0, 0, 100, 0], base10: 16776960 },
            ],
        },
    },
    {
        name: "Hungarian",
        nativeName: "Magyar",
        ids: {
            locale: "hu-HU",
            ISO_639_1: "hu",
            ISO_639_2: "hun",
            ISO_639_3: "hun",
            androidCode: "hu-rHU",
            osxCode: "hu.lproj",
            osxLocale: "hu",
            glottolog: "hung1274",
        },
        direction: "ltr",
        country: "Hungary",
        countryCode: "hu",
        flag: {
            image: "https://crowdin.com/images/flags/hu.png",
            emoji: "🇭🇺",
            primaryColor: { hex: "#CE2939", rgb: [206, 41, 57], cmyk: [0, 80, 72, 19], base10: 13510969 },
            flagColors: [
                { hex: "#CE2939", rgb: [206, 41, 57], cmyk: [0, 80, 72, 19], base10: 13510969 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#477050", rgb: [71, 112, 80], cmyk: [37, 0, 29, 56], base10: 4681808 },
            ],
        },
    },
    {
        name: "Icelandic",
        nativeName: "Íslenska",
        ids: {
            locale: "is-IS",
            ISO_639_1: "is",
            ISO_639_2: "isl",
            ISO_639_3: "isl",
            androidCode: "is-rIS",
            osxCode: "is.lproj",
            osxLocale: "is",
            glottolog: "icel1247",
        },
        direction: "ltr",
        country: "Iceland",
        countryCode: "is",
        flag: {
            image: "https://crowdin.com/images/flags/is.png",
            emoji: "🇮🇸",
            primaryColor: { hex: "#02529C", rgb: [2, 82, 156], cmyk: [99, 47, 0, 39], base10: 152220 },
            flagColors: [
                { hex: "#02529C", rgb: [2, 82, 156], cmyk: [100, 75, 2, 18], base10: 152220 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#DC1E35", rgb: [220, 30, 53], cmyk: [0, 100, 72, 0], base10: 14425653 },
            ],
        },
    },
    {
        name: "Ido",
        nativeName: "Ido",
        ids: {
            locale: "io-EN",
            ISO_639_1: "io",
            ISO_639_2: "ido",
            ISO_639_3: "ido",
            androidCode: "io-rEN",
            osxCode: "ido.lproj",
            osxLocale: "ido",
            glottolog: "idoo1234",
        },
        direction: "ltr",
        country: "International",
        countryCode: "en",
        flag: {
            image: "https://crowdin.com/images/flags/ido.png",
            primaryColor: { hex: "#127ec9", rgb: [18, 126, 201], cmyk: [91, 37, 0, 21], base10: 1212105 },
            flagColors: [
                { hex: "#127ec9", rgb: [18, 126, 201], cmyk: [91, 37, 0, 21], base10: 1212105 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Igbo",
        nativeName: "Igbo",
        ids: {
            locale: "ig-NG",
            ISO_639_1: "ig",
            ISO_639_2: "ibo",
            ISO_639_3: "ibo",
            androidCode: "ig-rNG",
            osxCode: "ig.lproj",
            osxLocale: "ig",
            glottolog: "nucl1417",
        },
        direction: "ltr",
        country: "Nigeria",
        countryCode: "ng",
        flag: {
            image: "https://crowdin.com/images/flags/ig.png",
            emoji: "🇳🇬",
            primaryColor: { hex: "#008753", rgb: [0, 135, 83], cmyk: [100, 0, 39, 47], base10: 34643 },
            flagColors: [
                { hex: "#1B7339", rgb: [27, 115, 57], cmyk: [93, 0, 100, 0], base10: 1798969 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Ilokano",
        nativeName: "Ilokano",
        ids: {
            locale: "ilo-PH",
            ISO_639_2: "ilo",
            ISO_639_3: "ilo",
            androidCode: "ilo-rPH",
            osxCode: "ilo.lproj",
            osxLocale: "ilo",
            glottolog: "ilok1237",
        },
        direction: "ltr",
        country: "Philippines",
        countryCode: "ph",
        flag: {
            image: "https://crowdin.com/images/flags/ilo.png",
            emoji: "🇵🇭",
            primaryColor: { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 67, 0, 34], base10: 14504 },
            flagColors: [
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
                { hex: "#BF0D3E", rgb: [191, 13, 62], cmyk: [0, 100, 59, 11], base10: 12520766 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FED141", rgb: [254, 209, 65], cmyk: [0, 9, 80, 0], base10: 16699713 },
            ],
        },
    },
    {
        name: "Indonesian",
        nativeName: "Bahasa Indonesia",
        ids: {
            locale: "id-ID",
            ISO_639_1: "id",
            ISO_639_2: "ind",
            ISO_639_3: "ind",
            androidCode: "in-rID",
            osxCode: "id.lproj",
            osxLocale: "id",
            glottolog: "indo1316",
        },
        direction: "ltr",
        country: "Indonesia",
        countryCode: "id",
        flag: {
            image: "https://crowdin.com/images/flags/id.png",
            emoji: "🇮🇩",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Inuktitut",
        nativeName: "ᐃᓄᒃᑎᑐᑦ",
        ids: {
            locale: "iu-NU",
            ISO_639_1: "iu",
            ISO_639_2: "iku",
            ISO_639_3: "iku",
            androidCode: "iu-rNU",
            osxCode: "iu.lproj",
            osxLocale: "iu",
            glottolog: "east2534",
        },
        direction: "ltr",
        country: "Canada",
        countryCode: "ca",
        flag: {
            image: "https://crowdin.com/images/flags/iu.png",
            primaryColor: { hex: "#D51516", rgb: [213, 21, 22], cmyk: [0, 90, 90, 16], base10: 13964566 },
            flagColors: [
                { hex: "#D51516", rgb: [213, 21, 22], cmyk: [0, 90, 90, 16], base10: 13964566 },
                { hex: "#FDD500", rgb: [253, 213, 0], cmyk: [0, 16, 100, 1], base10: 16635136 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0164BB", rgb: [1, 100, 187], cmyk: [99, 47, 0, 27], base10: 91323 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
        region: "Nunavut",
        regionCode: "nu",
    },
    {
        name: "Irish",
        nativeName: "Gaeilge",
        ids: {
            locale: "ga-IE",
            ISO_639_1: "ga",
            ISO_639_2: "gle",
            ISO_639_3: "gle",
            androidCode: "ga-rIE",
            osxCode: "ga.lproj",
            osxLocale: "ga",
            glottolog: "iris1253",
        },
        direction: "ltr",
        country: "Ireland",
        countryCode: "ie",
        flag: {
            image: "https://crowdin.com/images/flags/ga-IE.png",
            emoji: "🇮🇪",
            primaryColor: { hex: "#169B62", rgb: [22, 155, 98], cmyk: [86, 0, 37, 39], base10: 1481570 },
            flagColors: [
                { hex: "#009A44", rgb: [0, 154, 68], cmyk: [92, 0, 97, 0], base10: 39492 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FF8200", rgb: [255, 130, 0], cmyk: [0, 54, 100, 0], base10: 16744960 },
            ],
        },
    },
    {
        name: "Italian",
        nativeName: "Italiano",
        ids: {
            locale: "it-IT",
            ISO_639_1: "it",
            ISO_639_2: "ita",
            ISO_639_3: "ita",
            androidCode: "it-rIT",
            osxCode: "it.lproj",
            osxLocale: "it",
            glottolog: "ital1282",
        },
        direction: "ltr",
        country: "Italy",
        countryCode: "it",
        flag: {
            image: "https://crowdin.com/images/flags/it.png",
            emoji: "🇮🇹",
            primaryColor: { hex: "#008C45", rgb: [0, 140, 69], cmyk: [100, 0, 51, 45], base10: 35909 },
            flagColors: [
                { hex: "#008C45", rgb: [0, 140, 69], cmyk: [100, 0, 51, 45], base10: 35909 },
                { hex: "#F4F9FF", rgb: [244, 249, 255], cmyk: [4, 2, 0, 0], base10: 16054783 },
                { hex: "#CD212A", rgb: [205, 33, 42], cmyk: [0, 84, 80, 20], base10: 13443370 },
            ],
        },
    },
    {
        name: "Italian, Switzerland",
        nativeName: "Italiano, Svizzera",
        ids: {
            locale: "it-CH",
            ISO_639_1: "it",
            ISO_639_2: "ita",
            ISO_639_3: "ita",
            androidCode: "it-rCH",
            osxCode: "it-CH.lproj",
            osxLocale: "it_CH",
            glottolog: "ital1282",
        },
        direction: "ltr",
        country: "Switzerland",
        countryCode: "ch",
        flag: {
            image: "https://crowdin.com/images/flags/it-CH.png",
            emoji: "🇨🇭",
            primaryColor: { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 81, 87, 15], base10: 14297372 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Japanese",
        nativeName: "日本語",
        ids: {
            locale: "ja-JP",
            ISO_639_1: "ja",
            ISO_639_2: "jpn",
            ISO_639_3: "jpn",
            androidCode: "ja-rJP",
            osxCode: "ja.lproj",
            osxLocale: "ja",
            glottolog: "nucl1643",
        },
        direction: "ltr",
        country: "Japan",
        countryCode: "ja",
        flag: {
            image: "https://crowdin.com/images/flags/ja.png",
            emoji: "🇯🇵",
            primaryColor: { hex: "#BC002D", rgb: [188, 0, 45], cmyk: [0, 100, 76, 26], base10: 12320813 },
            flagColors: [
                { hex: "#BC002D", rgb: [188, 0, 45], cmyk: [0, 100, 90, 0], base10: 12320813 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Javanese",
        nativeName: "Basa Jawa",
        ids: {
            locale: "jv-ID",
            ISO_639_1: "jv",
            ISO_639_2: "jav",
            ISO_639_3: "jav",
            androidCode: "jv-rID",
            osxCode: "jv.lproj",
            osxLocale: "jv",
            glottolog: "java1253",
        },
        direction: "ltr",
        country: "Indonesia",
        countryCode: "id",
        flag: {
            image: "https://crowdin.com/images/flags/jv.png",
            emoji: "🇮🇩",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "K'iche'",
        nativeName: "Quiché",
        ids: { locale: "quc-GT", ISO_639_3: "quc", androidCode: "quc-rGT", osxCode: "quc.lproj", osxLocale: "quc", glottolog: "kich1262" },
        direction: "ltr",
        country: "Guatemala",
        countryCode: "gt",
        flag: {
            image: "https://crowdin.com/images/flags/quc.png",
            emoji: "🇬🇹",
            primaryColor: { hex: "#4997D0", rgb: [73, 151, 208], cmyk: [65, 27, 0, 18], base10: 4822992 },
            flagColors: [
                { hex: "#4997D0", rgb: [73, 151, 208], cmyk: [79, 7, 0, 0], base10: 4822992 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Kabyle",
        nativeName: "Taqbaylit",
        ids: {
            locale: "kab-KAB",
            ISO_639_2: "kab",
            ISO_639_3: "kab",
            androidCode: "kab-rKAB",
            osxCode: "kab.lproj",
            osxLocale: "kab",
            glottolog: "kaby1243",
        },
        direction: "ltr",
        country: "Algeria",
        countryCode: "dz",
        flag: {
            image: "https://crowdin.com/images/flags/kab.png",
            primaryColor: { hex: "#CD263E", rgb: [205, 38, 62], cmyk: [0, 81, 70, 20], base10: 13444670 },
            flagColors: [
                { hex: "#CD263E", rgb: [205, 38, 62], cmyk: [0, 81, 70, 20], base10: 13444670 },
                { hex: "#0065BD", rgb: [0, 101, 189], cmyk: [100, 47, 0, 26], base10: 26045 },
                { hex: "#F2CE01", rgb: [242, 206, 1], cmyk: [0, 15, 100, 5], base10: 15912449 },
            ],
        },
        region: "Kabylia",
        regionCode: "kab",
    },
    {
        name: "Kannada",
        nativeName: "ಕನ್ನಡ",
        ids: {
            locale: "kn-IN",
            ISO_639_1: "kn",
            ISO_639_2: "kan",
            ISO_639_3: "kan",
            androidCode: "kn-rIN",
            osxCode: "kn.lproj",
            osxLocale: "kn",
            glottolog: "nucl1305",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/kn.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Kapampangan",
        nativeName: "Kapampangan",
        ids: {
            locale: "pam-PH",
            ISO_639_2: "pam",
            ISO_639_3: "pam",
            androidCode: "pam-rPH",
            osxCode: "pam.lproj",
            osxLocale: "pam",
            glottolog: "pamp1243",
        },
        direction: "ltr",
        country: "Philippines",
        countryCode: "ph",
        flag: {
            image: "https://crowdin.com/images/flags/pam.png",
            emoji: "🇵🇭",
            primaryColor: { hex: "#81007F", rgb: [129, 0, 127], cmyk: [0, 100, 2, 49], base10: 8454271 },
            flagColors: [
                { hex: "#81007F", rgb: [129, 0, 127], cmyk: [0, 100, 2, 49], base10: 8454271 },
                { hex: "#FE0000", rgb: [254, 0, 0], cmyk: [0, 100, 100, 0], base10: 16646144 },
                { hex: "#FFFF00", rgb: [255, 255, 0], cmyk: [0, 0, 100, 0], base10: 16776960 },
                { hex: "#00FF01", rgb: [0, 255, 1], cmyk: [100, 0, 100, 0], base10: 65281 },
            ],
        },
    },
    {
        name: "Kashmiri",
        nativeName: "कॉशुर",
        ids: {
            locale: "ks-IN",
            ISO_639_1: "ks",
            ISO_639_2: "kas",
            ISO_639_3: "kas",
            androidCode: "ks-rIN",
            osxCode: "ks.lproj",
            osxLocale: "ks",
            glottolog: "kash1277",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/ks.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Kashmiri, Pakistan",
        nativeName: "कॉशुर, पाकिस्तान",
        ids: {
            locale: "ks-PK",
            ISO_639_1: "ks",
            ISO_639_2: "kas",
            ISO_639_3: "kas",
            androidCode: "ks-rPK",
            osxCode: "ks-PK.lproj",
            osxLocale: "ks_PK",
            glottolog: "kash1277",
        },
        direction: "ltr",
        country: "Pakistan",
        countryCode: "pk",
        flag: {
            image: "https://crowdin.com/images/flags/ks-PK.png",
            emoji: "🇵🇰",
            primaryColor: { hex: "#00401A", rgb: [0, 64, 26], cmyk: [100, 0, 59, 75], base10: 16410 },
            flagColors: [
                { hex: "#115740", rgb: [17, 87, 64], cmyk: [87, 13, 72, 56], base10: 1136448 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Kashubian",
        nativeName: "Kaszëbsczi",
        ids: {
            locale: "csb-PL",
            ISO_639_2: "csb",
            ISO_639_3: "csb",
            androidCode: "csb-rPL",
            osxCode: "csb.lproj",
            osxLocale: "csb",
            glottolog: "kash1274",
        },
        direction: "ltr",
        country: "Poland",
        countryCode: "pl",
        flag: {
            image: "https://crowdin.com/images/flags/csb.png",
            emoji: "🇵🇱",
            primaryColor: { hex: "#FFFF00", rgb: [255, 255, 0], cmyk: [0, 0, 100, 0], base10: 16776960 },
            flagColors: [
                { hex: "#FFFF00", rgb: [255, 255, 0], cmyk: [0, 0, 100, 0], base10: 16776960 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Kazakh",
        nativeName: "Қазақша",
        ids: {
            locale: "kk-KZ",
            ISO_639_1: "kk",
            ISO_639_2: "kaz",
            ISO_639_3: "kaz",
            androidCode: "kk-rKZ",
            osxCode: "kk.lproj",
            osxLocale: "kk",
            glottolog: "kaza1248",
        },
        direction: "ltr",
        country: "Kazakhstan",
        countryCode: "kz",
        flag: {
            image: "https://crowdin.com/images/flags/kk.png",
            emoji: "🇰🇿",
            primaryColor: { hex: "#00AFCA", rgb: [0, 175, 202], cmyk: [100, 13, 0, 21], base10: 45002 },
            flagColors: [
                { hex: "#00AFCA", rgb: [0, 175, 202], cmyk: [89, 0, 19, 0], base10: 45002 },
                { hex: "#FEC50C", rgb: [254, 197, 12], cmyk: [0, 0, 100, 0], base10: 16696588 },
            ],
        },
    },
    {
        name: "Khmer",
        nativeName: "ភាសាខ្មែរ",
        ids: {
            locale: "km-KH",
            ISO_639_1: "km",
            ISO_639_2: "khm",
            ISO_639_3: "khm",
            androidCode: "km-rKH",
            osxCode: "km.lproj",
            osxLocale: "km",
            glottolog: "khme1253",
        },
        direction: "ltr",
        country: "Cambodia",
        countryCode: "kh",
        flag: {
            image: "https://crowdin.com/images/flags/km.png",
            emoji: "🇰🇭",
            primaryColor: { hex: "#032EA1", rgb: [3, 46, 161], cmyk: [98, 71, 0, 37], base10: 208545 },
            flagColors: [
                { hex: "#032EA1", rgb: [3, 46, 161], cmyk: [100, 76, 0, 9], base10: 208545 },
                { hex: "#E00025", rgb: [224, 0, 37], cmyk: [0, 90, 76, 0], base10: 14680101 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Kinyarwanda",
        nativeName: "Ikinyarwanda",
        ids: {
            locale: "rw-RW",
            ISO_639_1: "rw",
            ISO_639_2: "kin",
            ISO_639_3: "kin",
            androidCode: "rw-rRW",
            osxCode: "rw.lproj",
            osxLocale: "rw",
            glottolog: "kiny1244",
        },
        direction: "ltr",
        country: "Rwanda",
        countryCode: "rw",
        flag: {
            image: "https://crowdin.com/images/flags/rw.png",
            emoji: "🇷🇼",
            primaryColor: { hex: "#E5BE01", rgb: [229, 190, 1], cmyk: [0, 17, 100, 10], base10: 15056385 },
            flagColors: [
                { hex: "#00A1DE", rgb: [0, 161, 222], cmyk: [100, 35, 0, 2], base10: 41438 },
                { hex: "#E5BE01", rgb: [229, 190, 1], cmyk: [0, 32, 100, 0], base10: 15056385 },
                { hex: "#FAD201", rgb: [250, 210, 1], cmyk: [0, 5, 100, 0], base10: 16437761 },
                { hex: "#20603D", rgb: [32, 96, 61], cmyk: [100, 0, 85, 29], base10: 2121789 },
            ],
        },
    },
    {
        name: "Klingon",
        nativeName: " ",
        ids: {
            locale: "tlh-AA",
            ISO_639_2: "tlh",
            ISO_639_3: "tlh",
            androidCode: "tlh-rAA",
            osxCode: "tlh.lproj",
            osxLocale: "tlh",
            glottolog: "klin1234",
        },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/tlh-AA.png",
            emoji: "🇺🇸",
            primaryColor: { hex: "#008852", rgb: [0, 136, 82], cmyk: [100, 0, 40, 47], base10: 34898 },
            flagColors: [
                { hex: "#008852", rgb: [0, 136, 82], cmyk: [100, 0, 40, 47], base10: 34898 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Komi",
        nativeName: "Коми кыв",
        ids: { locale: "kv-KO", ISO_639_1: "kv", ISO_639_3: "kpv", androidCode: "kv-rKO", osxCode: "kv.lproj", osxLocale: "kv", glottolog: "Komi" },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/kv.png",
            primaryColor: { hex: "#009B3A", rgb: [0, 155, 58], cmyk: [100, 0, 63, 39], base10: 39738 },
            flagColors: [
                { hex: "#0039A6", rgb: [0, 57, 166], cmyk: [100, 66, 0, 35], base10: 14758 },
                { hex: "#009B3A", rgb: [0, 155, 58], cmyk: [100, 0, 63, 39], base10: 39738 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Komi",
        regionCode: "ko",
    },
    {
        name: "Kongo",
        nativeName: "Kikongo",
        ids: {
            locale: "kg-CG",
            ISO_639_1: "kg",
            ISO_639_2: "kon",
            ISO_639_3: "kon",
            androidCode: "kg-rCG",
            osxCode: "kg.lproj",
            osxLocale: "kg",
            glottolog: "core1256",
        },
        direction: "ltr",
        country: "Congo",
        countryCode: "cd",
        flag: {
            image: "https://crowdin.com/images/flags/kg.png",
            emoji: "🇨🇬",
            primaryColor: { hex: "#009543", rgb: [0, 149, 67], cmyk: [100, 0, 55, 42], base10: 38211 },
            flagColors: [
                { hex: "#009543", rgb: [0, 149, 67], cmyk: [93, 0, 100, 0], base10: 38211 },
                { hex: "#FBDE4A", rgb: [251, 222, 74], cmyk: [0, 5, 100, 0], base10: 16506442 },
                { hex: "#DC241F", rgb: [220, 36, 31], cmyk: [0, 90, 76, 0], base10: 14427167 },
            ],
        },
    },
    {
        name: "Konkani",
        nativeName: "कोंकणी",
        ids: {
            locale: "kok-IN",
            ISO_639_2: "kok",
            ISO_639_3: "kok",
            androidCode: "kok-rIN",
            osxCode: "kok.lproj",
            osxLocale: "kok",
            glottolog: "konk1267",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/kok.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Korean",
        nativeName: "한국어",
        ids: {
            locale: "ko-KR",
            ISO_639_1: "ko",
            ISO_639_2: "kor",
            ISO_639_3: "kor",
            androidCode: "ko-rKR",
            osxCode: "ko.lproj",
            osxLocale: "ko",
            glottolog: "kore1280",
        },
        direction: "ltr",
        country: "South Korea",
        countryCode: "kr",
        flag: {
            image: "https://crowdin.com/images/flags/ko.png",
            emoji: "🇰🇷",
            primaryColor: { hex: "#CD2E3A", rgb: [205, 46, 58], cmyk: [0, 78, 72, 20], base10: 13446714 },
            flagColors: [
                { hex: "#CD2E3A", rgb: [205, 46, 58], cmyk: [0, 100, 80, 5], base10: 13446714 },
                { hex: "#0F64CD", rgb: [15, 100, 205], cmyk: [100, 74, 0, 45], base10: 1008845 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Kurdish",
        nativeName: "Kurdî",
        ids: {
            locale: "ku-TR",
            ISO_639_1: "ku",
            ISO_639_2: "kur",
            ISO_639_3: "kur",
            androidCode: "ku-rTR",
            osxCode: "ku.lproj",
            osxLocale: "ku",
            glottolog: "kurd1259",
        },
        direction: "ltr",
        country: "Iran",
        countryCode: "ir",
        flag: {
            image: "https://crowdin.com/images/flags/ku.png",
            primaryColor: { hex: "#278E43", rgb: [39, 138, 65], cmyk: [72, 0, 53, 46], base10: 2591297 },
            flagColors: [
                { hex: "#ED2024", rgb: [237, 32, 36], cmyk: [0, 87, 85, 7], base10: 15540260 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#278E43", rgb: [39, 142, 67], cmyk: [73, 0, 53, 44], base10: 2592323 },
                { hex: "#FEBD11", rgb: [254, 189, 17], cmyk: [0, 26, 93, 0], base10: 16694545 },
            ],
        },
        region: "Kurdistan",
        regionCode: "ku",
    },
    {
        name: "Kurmanji (Kurdish)",
        nativeName: "Kurmancî",
        ids: {
            locale: "kmr-TR",
            ISO_639_1: "ku",
            ISO_639_2: "kur",
            ISO_639_3: "kmr",
            androidCode: "kmr-rTR",
            osxCode: "kmr.lproj",
            osxLocale: "kmr",
            glottolog: "nort2641",
        },
        direction: "ltr",
        country: "Iran",
        countryCode: "ir",
        flag: {
            image: "https://crowdin.com/images/flags/kmr.png",
            primaryColor: { hex: "#278E43", rgb: [39, 138, 65], cmyk: [72, 0, 53, 46], base10: 2591297 },
            flagColors: [
                { hex: "#ED2024", rgb: [237, 32, 36], cmyk: [0, 87, 85, 7], base10: 15540260 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#278E43", rgb: [39, 142, 67], cmyk: [73, 0, 53, 44], base10: 2592323 },
                { hex: "#FEBD11", rgb: [254, 189, 17], cmyk: [0, 26, 93, 0], base10: 16694545 },
            ],
        },
        region: "Kurdistan",
        regionCode: "ku",
    },
    {
        name: "Kwanyama",
        nativeName: "Oshikwanyama",
        ids: {
            locale: "kj-AO",
            ISO_639_1: "kj",
            ISO_639_2: "kua",
            ISO_639_3: "kua",
            androidCode: "kj-rAO",
            osxCode: "kj.lproj",
            osxLocale: "kj",
            glottolog: "kuan1247",
        },
        direction: "ltr",
        country: "Angola",
        countryCode: "ao",
        flag: {
            image: "https://crowdin.com/images/flags/kj.png",
            emoji: "🇦🇴",
            primaryColor: { hex: "#C8102E", rgb: [204, 9, 47], cmyk: [0, 96, 77, 20], base10: 13371695 },
            flagColors: [
                { hex: "#CC092F", rgb: [204, 9, 47], cmyk: [0, 100, 80, 5], base10: 13371695 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFCB00", rgb: [255, 203, 0], cmyk: [0, 5, 100, 0], base10: 16763648 },
            ],
        },
    },
    {
        name: "Kyrgyz",
        nativeName: "Кыргызча",
        ids: {
            locale: "ky-KG",
            ISO_639_1: "ky",
            ISO_639_2: "kir",
            ISO_639_3: "kir",
            androidCode: "ky-rKG",
            osxCode: "ky.lproj",
            osxLocale: "ky",
            glottolog: "kirg1245",
        },
        direction: "ltr",
        country: "Kyrgyzstan",
        countryCode: "kg",
        flag: {
            image: "https://crowdin.com/images/flags/ky.png",
            emoji: "🇰🇬",
            primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
            ],
        },
    },
    {
        name: "Lao",
        nativeName: "ລາວ",
        ids: {
            locale: "lo-LA",
            ISO_639_1: "lo",
            ISO_639_2: "lao",
            ISO_639_3: "lao",
            androidCode: "lo-rLA",
            osxCode: "lo.lproj",
            osxLocale: "lo",
            glottolog: "laoo1244",
        },
        direction: "ltr",
        country: "Laos",
        countryCode: "la",
        flag: {
            image: "https://crowdin.com/images/flags/lo.png",
            emoji: "🇱🇦",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 90, 76, 0], base10: 13504806 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#002868", rgb: [0, 40, 104], cmyk: [100, 76, 0, 9], base10: 10344 },
            ],
        },
    },
    {
        name: "Latin",
        nativeName: "Latina",
        ids: {
            locale: "la-LA",
            ISO_639_1: "la",
            ISO_639_2: "lat",
            ISO_639_3: "lat",
            androidCode: "la-rLA",
            osxCode: "la.lproj",
            osxLocale: "la",
            glottolog: "impe1234",
        },
        direction: "ltr",
        country: "Vatican City",
        countryCode: "va",
        flag: {
            image: "https://crowdin.com/images/flags/la-LA.png",
            emoji: "🇻🇦",
            primaryColor: { hex: "#FFE000", rgb: [255, 224, 0], cmyk: [0, 12, 100, 0], base10: 16769024 },
            flagColors: [
                { hex: "#FFE000", rgb: [255, 224, 0], cmyk: [0, 12, 100, 0], base10: 16769024 },
                { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#CCCCCC", rgb: [204, 204, 204], cmyk: [0, 0, 0, 20], base10: 13421772 },
            ],
        },
    },
    {
        name: "Latvian",
        nativeName: "Latviešu",
        ids: {
            locale: "lv-LV",
            ISO_639_1: "lv",
            ISO_639_2: "lav",
            ISO_639_3: "lav",
            androidCode: "lv-rLV",
            osxCode: "lv.lproj",
            osxLocale: "lv",
            glottolog: "latv1249",
        },
        direction: "ltr",
        country: "Latvia",
        countryCode: "lv",
        flag: {
            image: "https://crowdin.com/images/flags/lv.png",
            emoji: "🇱🇻",
            primaryColor: { hex: "#A4343A", rgb: [164, 52, 58], cmyk: [0, 68, 65, 36], base10: 10761274 },
            flagColors: [
                { hex: "#A4343A", rgb: [164, 52, 58], cmyk: [3, 90, 65, 28], base10: 10761274 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Ligurian",
        nativeName: "Ligure",
        ids: { locale: "lij-IT", ISO_639_3: "lij", androidCode: "lij-rIT", osxCode: "lij.lproj", osxLocale: "lij", glottolog: "ligu1248" },
        direction: "ltr",
        country: "Italy",
        countryCode: "it",
        flag: {
            image: "https://crowdin.com/images/flags/lij.png",
            primaryColor: { hex: "#009C31", rgb: [0, 156, 49], cmyk: [100, 0, 69, 39], base10: 39985 },
            flagColors: [
                { hex: "#009C31", rgb: [0, 156, 49], cmyk: [100, 0, 69, 39], base10: 39985 },
                { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
                { hex: "#009CCE", rgb: [0, 156, 206], cmyk: [100, 24, 0, 19], base10: 40142 },
                { hex: "#BDBDBD", rgb: [189, 189, 189], cmyk: [0, 0, 0, 26], base10: 12434877 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#6B6B6B", rgb: [107, 107, 107], cmyk: [0, 0, 0, 58], base10: 7039851 },
            ],
        },
        region: "Liguria",
        regionCode: "lij",
    },
    {
        name: "Limburgish",
        nativeName: "Limburgs",
        ids: {
            locale: "li-LI",
            ISO_639_1: "li",
            ISO_639_2: "lim",
            ISO_639_3: "lim",
            androidCode: "li-rLI",
            osxCode: "li.lproj",
            osxLocale: "li",
            glottolog: "limb1263",
        },
        direction: "ltr",
        country: "Netherlands",
        countryCode: "nl",
        flag: {
            image: "https://crowdin.com/images/flags/li.png",
            primaryColor: { hex: "#2D558E", rgb: [45, 85, 142], cmyk: [68, 40, 0, 44], base10: 2971022 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#2D558E", rgb: [45, 85, 142], cmyk: [68, 40, 0, 44], base10: 2971022 },
                { hex: "#F8C60B", rgb: [248, 198, 11], cmyk: [0, 20, 96, 3], base10: 16303627 },
                { hex: "#E34220", rgb: [227, 66, 32], cmyk: [0, 71, 86, 11], base10: 14893600 },
            ],
        },
        region: "Limburg",
        regionCode: "li",
    },
    {
        name: "Lingala",
        nativeName: "Lingála",
        ids: {
            locale: "ln-CD",
            ISO_639_1: "ln",
            ISO_639_2: "lin",
            ISO_639_3: "lin",
            androidCode: "ln-rCD",
            osxCode: "ln.lproj",
            osxLocale: "ln",
            glottolog: "ling1269",
        },
        direction: "ltr",
        country: "Congo",
        countryCode: "cd",
        flag: {
            image: "https://crowdin.com/images/flags/ln.png",
            emoji: "🇨🇬",
            primaryColor: { hex: "#0085CA", rgb: [0, 133, 202], cmyk: [100, 34, 0, 21], base10: 34250 },
            flagColors: [
                { hex: "#0085CA", rgb: [0, 133, 202], cmyk: [100, 15, 0, 6], base10: 34250 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
            ],
        },
    },
    {
        name: "Lithuanian",
        nativeName: "Lietuvių",
        ids: {
            locale: "lt-LT",
            ISO_639_1: "ln",
            ISO_639_2: "lin",
            ISO_639_3: "lin",
            androidCode: "lt-rLT",
            osxCode: "lt.lproj",
            osxLocale: "lt",
            glottolog: "ling1269",
        },
        direction: "ltr",
        country: "Lithuania",
        countryCode: "lt",
        flag: {
            image: "https://crowdin.com/images/flags/lt.png",
            emoji: "🇱🇹",
            primaryColor: { hex: "#FDB913", rgb: [253, 185, 19], cmyk: [0, 27, 92, 1], base10: 16627987 },
            flagColors: [
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#046A38", rgb: [4, 106, 56], cmyk: [85, 3, 91, 44], base10: 289336 },
                { hex: "#BE3A34", rgb: [190, 58, 52], cmyk: [1, 87, 77, 13], base10: 12466740 },
            ],
        },
    },
    {
        name: "Lojban",
        nativeName: "La .lojban.",
        ids: {
            locale: "jbo-EN",
            ISO_639_2: "jbo",
            ISO_639_3: "jbo",
            androidCode: "jbo-rEN",
            osxCode: "jbo.lproj",
            osxLocale: "jbo",
            glottolog: "lojb1234",
        },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/jbo.png",
            emoji: "🇺🇸",
            primaryColor: { hex: "#000063", rgb: [0, 0, 99], cmyk: [100, 100, 0, 61], base10: 99 },
            flagColors: [
                { hex: "#209E6C", rgb: [32, 158, 108], cmyk: [80, 0, 32, 38], base10: 2137708 },
                { hex: "#960016", rgb: [150, 0, 22], cmyk: [0, 100, 85, 41], base10: 9830422 },
                { hex: "#000063", rgb: [0, 0, 99], cmyk: [100, 100, 0, 61], base10: 99 },
            ],
        },
    },
    {
        name: "LOLCAT",
        nativeName: "LOLCAT",
        ids: { locale: "lol-US", androidCode: "lol-rUS", osxCode: "lol.lproj", osxLocale: "lol" },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/lol.png",
            primaryColor: { hex: "#B8D251", rgb: [184, 210, 81], cmyk: [12, 0, 61, 18], base10: 12112465 },
            flagColors: [
                { hex: "#B8D251", rgb: [184, 210, 81], cmyk: [12, 0, 61, 18], base10: 12112465 },
                { hex: "#509C89", rgb: [80, 156, 137], cmyk: [49, 0, 12, 39], base10: 5282953 },
                { hex: "#5CB59F", rgb: [92, 181, 159], cmyk: [49, 0, 12, 29], base10: 6075807 },
                { hex: "#19909B", rgb: [25, 144, 155], cmyk: [84, 7, 0, 39], base10: 1675419 },
            ],
        },
    },
    {
        name: "Low German",
        nativeName: "Plattdüütsch",
        ids: {
            locale: "nds-DE",
            ISO_639_2: "nds",
            ISO_639_3: "nds",
            androidCode: "nds-rDE",
            osxCode: "nds.lproj",
            osxLocale: "nds",
            glottolog: "lowg1239",
        },
        direction: "ltr",
        country: "Germany",
        countryCode: "de",
        flag: {
            image: "https://crowdin.com/images/flags/nds.png",
            emoji: "🇩🇪",
            primaryColor: { hex: "#DD0000", rgb: [221, 0, 0], cmyk: [0, 100, 100, 13], base10: 14483456 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#DD0000", rgb: [221, 0, 0], cmyk: [0, 100, 100, 0], base10: 14483456 },
                { hex: "#FFCC00", rgb: [255, 204, 0], cmyk: [0, 12, 100, 5], base10: 16763904 },
            ],
        },
    },
    {
        name: "Lower Sorbian",
        nativeName: "Dolnoserbski",
        ids: {
            locale: "dsb-DE",
            ISO_639_2: "dsb",
            ISO_639_3: "dsb",
            androidCode: "dsb-rDE",
            osxCode: "dsb.lproj",
            osxLocale: "dsb",
            glottolog: "lowe1385",
        },
        direction: "ltr",
        country: "Germany",
        countryCode: "de",
        flag: {
            image: "https://crowdin.com/images/flags/dsb-DE.png",
            emoji: "🇩🇪",
            primaryColor: { hex: "#0C4076", rgb: [12, 64, 118], cmyk: [90, 46, 0, 54], base10: 802934 },
            flagColors: [
                { hex: "#0C4076", rgb: [12, 64, 118], cmyk: [90, 46, 0, 54], base10: 802934 },
                { hex: "#CC3533", rgb: [204, 53, 51], cmyk: [0, 74, 75, 20], base10: 13382963 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Luganda",
        nativeName: "Oluganda",
        ids: {
            locale: "lg-UG",
            ISO_639_1: "lg",
            ISO_639_2: "lug",
            ISO_639_3: "lug",
            androidCode: "lg-rUG",
            osxCode: "lg.lproj",
            osxLocale: "lg",
            glottolog: "gand1255",
        },
        direction: "ltr",
        country: "Uganda",
        countryCode: "ug",
        flag: {
            image: "https://crowdin.com/images/flags/lg.png",
            emoji: "🇺🇬",
            primaryColor: { hex: "#D90000", rgb: [217, 0, 0], cmyk: [0, 100, 100, 15], base10: 14221312 },
            flagColors: [
                { hex: "#FCDC04", rgb: [252, 220, 4], cmyk: [0, 5, 100, 0], base10: 16571396 },
                { hex: "#D90000", rgb: [217, 0, 0], cmyk: [0, 90, 76, 0], base10: 14221312 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#9CA69C", rgb: [156, 166, 156], cmyk: [50, 34, 27, 11], base10: 10266268 },
            ],
        },
    },
    {
        name: "Luhya",
        nativeName: "Oluluhya",
        ids: { locale: "luy-KE", ISO_639_3: "luy", androidCode: "luy-rKE", osxCode: "luy.lproj", osxLocale: "luy", glottolog: "cent2288" },
        direction: "ltr",
        country: "Kenya",
        countryCode: "ke",
        flag: {
            image: "https://crowdin.com/images/flags/luy.png",
            emoji: "🇰🇪",
            primaryColor: { hex: "#BB0000", rgb: [187, 0, 0], cmyk: [0, 100, 100, 27], base10: 12255232 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#BB0000", rgb: [187, 0, 0], cmyk: [1, 87, 77, 13], base10: 12255232 },
                { hex: "#006600", rgb: [0, 102, 0], cmyk: [92, 0, 97, 0], base10: 26112 },
            ],
        },
    },
    {
        name: "Luxembourgish",
        nativeName: "Lëtzebuergesch",
        ids: {
            locale: "lb-LU",
            ISO_639_1: "lb",
            ISO_639_2: "ltz",
            ISO_639_3: "ltz",
            androidCode: "lb-rLU",
            osxCode: "lb.lproj",
            osxLocale: "lb",
            glottolog: "luxe1241",
        },
        direction: "ltr",
        country: "Luxembourg",
        countryCode: "lu",
        flag: {
            image: "https://crowdin.com/images/flags/lb.png",
            emoji: "🇱🇺",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#EA141D", rgb: [234, 20, 29], cmyk: [0, 90, 76, 0], base10: 15340573 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#51ADDA", rgb: [81, 173, 218], cmyk: [79, 7, 0, 0], base10: 5352922 },
            ],
        },
    },
    {
        name: "Macedonian",
        nativeName: "Македонски",
        ids: {
            locale: "mk-MK",
            ISO_639_1: "mk",
            ISO_639_2: "mkd",
            ISO_639_3: "mkd",
            androidCode: "mk-rMK",
            osxCode: "mk.lproj",
            osxLocale: "mk",
            glottolog: "mace1250",
        },
        direction: "ltr",
        country: "North Macedonia",
        countryCode: "mk",
        flag: {
            image: "https://crowdin.com/images/flags/mk.png",
            emoji: "🇲🇰",
            primaryColor: { hex: "#CE2028", rgb: [206, 32, 40], cmyk: [0, 84, 81, 19], base10: 13508648 },
            flagColors: [
                { hex: "#D82126", rgb: [216, 33, 38], cmyk: [0, 85, 82, 15], base10: 14164262 },
                { hex: "#F8E92E", rgb: [248, 233, 46], cmyk: [0, 6, 82, 3], base10: 16312622 },
            ],
        },
    },
    {
        name: "Maithili",
        nativeName: "मैथिली",
        ids: {
            locale: "mai-IN",
            ISO_639_2: "mai",
            ISO_639_3: "mai",
            androidCode: "mai-rIN",
            osxCode: "mai.lproj",
            osxLocale: "mai",
            glottolog: "mait1250",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/mai.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Malagasy",
        nativeName: "Malagasy",
        ids: {
            locale: "mg-MG",
            ISO_639_1: "mg",
            ISO_639_2: "mlg",
            ISO_639_3: "mlg",
            androidCode: "mg-rMG",
            osxCode: "mg.lproj",
            osxLocale: "mg",
            glottolog: "mala1537",
        },
        direction: "ltr",
        country: "Madagascar",
        countryCode: "mg",
        flag: {
            image: "https://crowdin.com/images/flags/mg.png",
            emoji: "🇲🇬",
            primaryColor: { hex: "#00843D", rgb: [0, 132, 61], cmyk: [100, 0, 54, 48], base10: 33853 },
            flagColors: [
                { hex: "#F9423A", rgb: [249, 66, 58], cmyk: [0, 83, 81, 0], base10: 16335418 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00843D", rgb: [0, 132, 61], cmyk: [93, 0, 98, 17], base10: 33853 },
            ],
        },
    },
    {
        name: "Malay",
        nativeName: "Bahasa Melayu",
        ids: {
            locale: "ms-MY",
            ISO_639_1: "ms",
            ISO_639_2: "msa",
            ISO_639_3: "msa",
            androidCode: "ms-rMY",
            osxCode: "ms.lproj",
            osxLocale: "ms",
            glottolog: "indo1326",
        },
        direction: "ltr",
        country: "Malaysia",
        countryCode: "my",
        flag: {
            image: "https://crowdin.com/images/flags/ms.png",
            emoji: "🇲🇾",
            primaryColor: { hex: "#FFCC00", rgb: [255, 204, 0], cmyk: [0, 20, 100, 0], base10: 16763904 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
            ],
        },
    },
    {
        name: "Malay, Brunei",
        nativeName: "Bahasa Melayu Brunei",
        ids: { locale: "ms-BN", ISO_639_3: "kxd", androidCode: "ms-rBN", osxCode: "ms-BN.lproj", osxLocale: "ms_BN", glottolog: "brun1242" },
        direction: "ltr",
        country: "Brunei",
        countryCode: "bn",
        flag: {
            image: "https://crowdin.com/images/flags/ms-BN.png",
            emoji: "🇧🇳",
            primaryColor: { hex: "#FCE300", rgb: [252, 227, 0], cmyk: [0, 10, 100, 1], base10: 16573184 },
            flagColors: [
                { hex: "#FCE300", rgb: [252, 227, 0], cmyk: [0, 0, 100, 0], base10: 16573184 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
            ],
        },
    },
    {
        name: "Malayalam",
        nativeName: "മലയാളം",
        ids: {
            locale: "ml-IN",
            ISO_639_1: "ml",
            ISO_639_2: "mal",
            ISO_639_3: "mal",
            androidCode: "ml-rIN",
            osxCode: "ml.lproj",
            osxLocale: "ml",
            glottolog: "mala1464",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/ml-IN.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Maltese",
        nativeName: "Malti",
        ids: {
            locale: "mt-MT",
            ISO_639_1: "mt",
            ISO_639_2: "mlt",
            ISO_639_3: "mlt",
            androidCode: "mt-rMT",
            osxCode: "mt.lproj",
            osxLocale: "mt",
            glottolog: "malt1254",
        },
        direction: "ltr",
        country: "Malta",
        countryCode: "mt",
        flag: {
            image: "https://crowdin.com/images/flags/mt.png",
            emoji: "🇲🇹",
            primaryColor: { hex: "#C01B22", rgb: [192, 27, 34], cmyk: [0, 86, 82, 25], base10: 12589858 },
            flagColors: [
                { hex: "#7C878E", rgb: [124, 135, 142], cmyk: [50, 34, 27, 11], base10: 8161166 },
                { hex: "#333F48", rgb: [51, 63, 72], cmyk: [78, 57, 39, 56], base10: 3358536 },
                { hex: "#C01B22", rgb: [192, 27, 34], cmyk: [0, 100, 80, 5], base10: 12589858 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Manx",
        nativeName: "Gaelg",
        ids: {
            locale: "gv-IM",
            ISO_639_1: "gv",
            ISO_639_2: "glv",
            ISO_639_3: "glv",
            androidCode: "gv-rIM",
            osxCode: "gv.lproj",
            osxLocale: "gv",
            glottolog: "manx1243",
        },
        direction: "ltr",
        country: "United Kingdom",
        countryCode: "gb",
        flag: {
            image: "https://crowdin.com/images/flags/gv.png",
            emoji: "🇮🇲",
            primaryColor: { hex: "#CF142B", rgb: [207, 20, 43], cmyk: [0, 90, 79, 19], base10: 13571115 },
            flagColors: [
                { hex: "#CF142B", rgb: [207, 20, 43], cmyk: [0, 90, 79, 19], base10: 13571115 },
                { hex: "#F9DD16", rgb: [249, 221, 22], cmyk: [0, 11, 91, 2], base10: 16375062 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Isle of Man",
        regionCode: "im",
    },
    {
        name: "Maori",
        nativeName: "Māori",
        ids: {
            locale: "mi-NZ",
            ISO_639_1: "mi",
            ISO_639_2: "mri",
            ISO_639_3: "mri",
            androidCode: "mi-rNZ",
            osxCode: "mi.lproj",
            osxLocale: "mi",
            glottolog: "maor1246",
        },
        direction: "ltr",
        country: "New Zealand",
        countryCode: "nz",
        flag: {
            image: "https://crowdin.com/images/flags/mi.png",
            emoji: "🇳🇿",
            primaryColor: { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 85, 0, 39], base10: 74089 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Mapudungun",
        nativeName: "Mapudungun",
        ids: {
            locale: "arn-CL",
            ISO_639_2: "arn",
            ISO_639_3: "arn",
            androidCode: "arn-rCL",
            osxCode: "arn.lproj",
            osxLocale: "arn",
            glottolog: "mapu1245",
        },
        direction: "ltr",
        country: "Chile",
        countryCode: "cl",
        flag: {
            image: "https://crowdin.com/images/flags/arn.png",
            emoji: "🇨🇱",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
            ],
        },
    },
    {
        name: "Marathi",
        nativeName: "मराठी",
        ids: {
            locale: "mr-IN",
            ISO_639_1: "mr",
            ISO_639_2: "mar",
            ISO_639_3: "mar",
            androidCode: "mr-rIN",
            osxCode: "mr.lproj",
            osxLocale: "mr",
            glottolog: "mara1378",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/mr.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Marshallese",
        nativeName: "Kajin M̧ajeļ",
        ids: {
            locale: "mh-MH",
            ISO_639_1: "mh",
            ISO_639_2: "mah",
            ISO_639_3: "mah",
            androidCode: "mh-rMH",
            osxCode: "mh.lproj",
            osxLocale: "mh",
            glottolog: "mars1254",
        },
        direction: "ltr",
        country: "Marshall Islands",
        countryCode: "mh",
        flag: {
            image: "https://crowdin.com/images/flags/mh.png",
            emoji: "🇲🇭",
            primaryColor: { hex: "#003087", rgb: [0, 48, 135], cmyk: [100, 64, 0, 47], base10: 12423 },
            flagColors: [
                { hex: "#003087", rgb: [0, 48, 135], cmyk: [100, 81, 0, 23], base10: 12423 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#E57200", rgb: [229, 114, 0], cmyk: [0, 61, 100, 0], base10: 15036928 },
            ],
        },
    },
    {
        name: "Mohawk",
        nativeName: "Kanienʼkéha",
        ids: {
            locale: "moh-CA",
            ISO_639_2: "moh",
            ISO_639_3: "moh",
            androidCode: "moh-rCA",
            osxCode: "moh.lproj",
            osxLocale: "moh",
            glottolog: "moha1258",
        },
        direction: "ltr",
        country: "Canada",
        countryCode: "ca",
        flag: {
            image: "https://crowdin.com/images/flags/moh.png",
            emoji: "🇨🇦",
            primaryColor: { hex: "#D0021B", rgb: [208, 2, 27], cmyk: [0, 99, 87, 18], base10: 13632027 },
            flagColors: [
                { hex: "#D0021B", rgb: [208, 2, 27], cmyk: [0, 99, 87, 18], base10: 13632027 },
                { hex: "#FDC62F", rgb: [253, 198, 47], cmyk: [0, 22, 81, 1], base10: 16631343 },
            ],
        },
    },
    {
        name: "Mongolian",
        nativeName: "Монгол",
        ids: {
            locale: "mn-MN",
            ISO_639_1: "mn",
            ISO_639_2: "mon",
            ISO_639_3: "mon",
            androidCode: "mn-rMN",
            osxCode: "mn.lproj",
            osxLocale: "mn",
            glottolog: "mong1331",
        },
        direction: "ltr",
        country: "Mongolia",
        countryCode: "mn",
        flag: {
            image: "https://crowdin.com/images/flags/mn.png",
            emoji: "🇲🇳",
            primaryColor: { hex: "#DA2032", rgb: [218, 32, 50], cmyk: [0, 85, 77, 15], base10: 14295090 },
            flagColors: [
                { hex: "#DA2032", rgb: [218, 32, 50], cmyk: [0, 95, 100, 0], base10: 14295090 },
                { hex: "#0066B3", rgb: [0, 102, 179], cmyk: [58, 8, 0, 0], base10: 26291 },
                { hex: "#FFD900", rgb: [255, 217, 0], cmyk: [0, 5, 100, 0], base10: 16767232 },
            ],
        },
    },
    {
        name: "Montenegrin (Cyrillic)",
        nativeName: "Црногорски",
        ids: {
            locale: "sr-Cyrl-ME",
            ISO_639_1: "me",
            ISO_639_2: "cnr",
            ISO_639_3: "cnr",
            androidCode: "sr-rCyrl-rME",
            osxCode: "sr-Cyrl-ME.lproj",
            osxLocale: "sr_Cyrl_ME",
            glottolog: "mont1282",
        },
        direction: "ltr",
        country: "Montenegro",
        countryCode: "me",
        flag: {
            image: "https://crowdin.com/images/flags/sr-Cyrl-ME.png",
            emoji: "🇲🇪",
            primaryColor: { hex: "#C40308", rgb: [196, 3, 8], cmyk: [0, 98, 96, 23], base10: 12845832 },
            flagColors: [
                { hex: "#C40308", rgb: [196, 3, 8], cmyk: [0, 90, 76, 0], base10: 12845832 },
                { hex: "#D4AF3A", rgb: [212, 175, 58], cmyk: [0, 20, 100, 8], base10: 13938490 },
                { hex: "#1D5E91", rgb: [29, 94, 145], cmyk: [100, 51, 0, 34], base10: 1924753 },
                { hex: "#6D8C3E", rgb: [109, 140, 62], cmyk: [41, 0, 100, 22], base10: 7179326 },
                { hex: "#B96B29", rgb: [185, 107, 41], cmyk: [0, 39, 100, 11], base10: 12151593 },
            ],
        },
    },
    {
        name: "Montenegrin (Latin)",
        nativeName: "Crnogorski",
        ids: {
            locale: "me-ME",
            ISO_639_1: "me",
            ISO_639_2: "cnr",
            ISO_639_3: "cnr",
            androidCode: "me-rME",
            osxCode: "me.lproj",
            osxLocale: "me",
            glottolog: "mont1282",
        },
        direction: "ltr",
        country: "Montenegro",
        countryCode: "me",
        flag: {
            image: "https://crowdin.com/images/flags/me.png",
            emoji: "🇲🇪",
            primaryColor: { hex: "#C40308", rgb: [196, 3, 8], cmyk: [0, 98, 96, 23], base10: 12845832 },
            flagColors: [
                { hex: "#C40308", rgb: [196, 3, 8], cmyk: [0, 90, 76, 0], base10: 12845832 },
                { hex: "#D4AF3A", rgb: [212, 175, 58], cmyk: [0, 20, 100, 8], base10: 13938490 },
                { hex: "#1D5E91", rgb: [29, 94, 145], cmyk: [100, 51, 0, 34], base10: 1924753 },
                { hex: "#6D8C3E", rgb: [109, 140, 62], cmyk: [41, 0, 100, 22], base10: 7179326 },
                { hex: "#B96B29", rgb: [185, 107, 41], cmyk: [0, 39, 100, 11], base10: 12151593 },
            ],
        },
    },
    {
        name: "Mossi",
        nativeName: "Mooré",
        ids: {
            locale: "mos-MOS",
            ISO_639_2: "mos",
            ISO_639_3: "mos",
            androidCode: "mos-rMOS",
            osxCode: "mos.lproj",
            osxLocale: "mos",
            glottolog: "moss1236",
        },
        direction: "ltr",
        country: "Burkina Faso",
        countryCode: "bf",
        flag: {
            image: "https://crowdin.com/images/flags/mos.png",
            emoji: "🇧🇫",
            primaryColor: { hex: "#009E49", rgb: [0, 158, 73], cmyk: [100, 0, 54, 38], base10: 40521 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
            ],
        },
    },
    {
        name: "Nauru",
        nativeName: "Dorerin Naoero",
        ids: {
            locale: "na-NR",
            ISO_639_1: "na",
            ISO_639_2: "nau",
            ISO_639_3: "nau",
            androidCode: "na-rNR",
            osxCode: "na.lproj",
            osxLocale: "na",
            glottolog: "naur1243",
        },
        direction: "ltr",
        country: "Nauru",
        countryCode: "nr",
        flag: {
            image: "https://crowdin.com/images/flags/na.png",
            emoji: "🇳🇷",
            primaryColor: { hex: "#012169", rgb: [1, 33, 105], cmyk: [99, 69, 0, 59], base10: 74089 },
            flagColors: [
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 85, 0, 39], base10: 74089 },
                { hex: "#FFC72C", rgb: [255, 199, 44], cmyk: [0, 16, 89, 0], base10: 16762668 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Ndonga",
        nativeName: "Ndonga",
        ids: {
            locale: "ng-NA",
            ISO_639_1: "ng",
            ISO_639_2: "ndo",
            ISO_639_3: "ndo",
            androidCode: "ng-rNA",
            osxCode: "ng.lproj",
            osxLocale: "ng",
            glottolog: "ndon1254",
        },
        direction: "ltr",
        country: "Namibia",
        countryCode: "na",
        flag: {
            image: "https://crowdin.com/images/flags/ng.png",
            emoji: "🇳🇦",
            primaryColor: { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 92, 77, 22], base10: 13111342 },
            flagColors: [
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFC72C", rgb: [255, 199, 44], cmyk: [0, 16, 89, 0], base10: 16762668 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#009A44", rgb: [0, 154, 68], cmyk: [92, 0, 97, 0], base10: 39492 },
            ],
        },
    },
    {
        name: "Nepali",
        nativeName: "नेपाली",
        ids: {
            locale: "ne-NP",
            ISO_639_1: "ne",
            ISO_639_2: "nep",
            ISO_639_3: "nep",
            androidCode: "ne-rNP",
            osxCode: "ne.lproj",
            osxLocale: "ne",
            glottolog: "nepa1254",
        },
        direction: "ltr",
        country: "Nepal",
        countryCode: "np",
        flag: {
            image: "https://crowdin.com/images/flags/ne-NP.png",
            emoji: "🇳🇵",
            primaryColor: { hex: "#DC143C", rgb: [220, 20, 60], cmyk: [0, 91, 73, 14], base10: 14423100 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#003893", rgb: [0, 56, 147], cmyk: [100, 81, 0, 23], base10: 14483 },
                { hex: "#DC143C", rgb: [220, 20, 60], cmyk: [0, 100, 80, 5], base10: 14423100 },
            ],
        },
    },
    {
        name: "Nepali, India",
        nativeName: "नेपाली, भारत",
        ids: {
            locale: "ne-IN",
            ISO_639_1: "ne",
            ISO_639_2: "nep",
            ISO_639_3: "nep",
            androidCode: "ne-rIN",
            osxCode: "ne-IN.lproj",
            osxLocale: "ne_IN",
            glottolog: "nepa1254",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/ne-IN.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Nigerian Pidgin",
        nativeName: "Naija",
        ids: { locale: "pcm-NG", ISO_639_3: "pcm", androidCode: "pcm-rNG", osxCode: "pcm.lproj", osxLocale: "pcm", glottolog: "nige1257" },
        direction: "ltr",
        country: "Nigeria",
        countryCode: "ng",
        flag: {
            image: "https://crowdin.com/images/flags/pcm.png",
            emoji: "🇳🇬",
            primaryColor: { hex: "#008753", rgb: [0, 135, 83], cmyk: [100, 0, 39, 47], base10: 34643 },
            flagColors: [
                { hex: "#1B7339", rgb: [27, 115, 57], cmyk: [93, 0, 100, 0], base10: 1798969 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Northern Sami",
        nativeName: "Davvisámegiella",
        ids: {
            locale: "se-NO",
            ISO_639_1: "se",
            ISO_639_2: "sme",
            ISO_639_3: "sme",
            androidCode: "se-rNO",
            osxCode: "se.lproj",
            osxLocale: "se",
            glottolog: "nort2671",
        },
        direction: "ltr",
        country: "Norway",
        countryCode: "no",
        flag: {
            image: "https://crowdin.com/images/flags/se.png",
            emoji: "🇳🇴",
            primaryColor: { hex: "#144997", rgb: [20, 73, 151], cmyk: [87, 52, 0, 41], base10: 1329559 },
            flagColors: [
                { hex: "#144997", rgb: [20, 73, 151], cmyk: [87, 52, 0, 41], base10: 1329559 },
                { hex: "#DC241F", rgb: [220, 36, 31], cmyk: [0, 84, 86, 14], base10: 14427167 },
                { hex: "#007229", rgb: [0, 114, 41], cmyk: [100, 0, 64, 55], base10: 29225 },
                { hex: "#FFCE00", rgb: [255, 206, 0], cmyk: [0, 19, 100, 0], base10: 16764416 },
            ],
        },
    },
    {
        name: "Northern Sotho",
        nativeName: "Sesotho sa Leboa",
        ids: {
            locale: "ns-ZA",
            ISO_639_2: "nso",
            ISO_639_3: "nso",
            androidCode: "ns-rZA",
            osxCode: "nso.lproj",
            osxLocale: "nso",
            glottolog: "nort3233",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/nso.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Norwegian",
        nativeName: "Norsk",
        ids: {
            locale: "no-NO",
            ISO_639_1: "no",
            ISO_639_2: "nor",
            ISO_639_3: "nor",
            androidCode: "no-rNO",
            osxCode: "no.lproj",
            osxLocale: "no",
            glottolog: "norw1258",
        },
        direction: "ltr",
        country: "Norway",
        countryCode: "no",
        flag: {
            image: "https://crowdin.com/images/flags/no.png",
            emoji: "🇳🇴",
            primaryColor: { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 94, 75, 27], base10: 12192815 },
            flagColors: [
                { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 100, 76, 13], base10: 12192815 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00205B", rgb: [0, 32, 91], cmyk: [100, 78, 0, 57], base10: 8283 },
            ],
        },
    },
    {
        name: "Norwegian Bokmal",
        nativeName: "Norsk Bokmål",
        ids: {
            locale: "nb-NO",
            ISO_639_1: "no",
            ISO_639_2: "nor",
            ISO_639_3: "nob",
            androidCode: "nb-rNO",
            osxCode: "nb.lproj",
            osxLocale: "nb",
            glottolog: "norw1258",
        },
        direction: "ltr",
        country: "Norway",
        countryCode: "no",
        flag: {
            image: "https://crowdin.com/images/flags/nb.png",
            emoji: "🇳🇴",
            primaryColor: { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 94, 75, 27], base10: 12192815 },
            flagColors: [
                { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 100, 76, 13], base10: 12192815 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00205B", rgb: [0, 32, 91], cmyk: [100, 78, 0, 57], base10: 8283 },
            ],
        },
    },
    {
        name: "Norwegian Nynorsk",
        nativeName: "Norsk Nynorsk",
        ids: {
            locale: "nn-NO",
            ISO_639_1: "no",
            ISO_639_2: "nor",
            ISO_639_3: "nno",
            androidCode: "nn-rNO",
            osxCode: "nn-NO.lproj",
            osxLocale: "nn_NO",
            glottolog: "norw1258",
        },
        direction: "ltr",
        country: "Norway",
        countryCode: "no",
        flag: {
            image: "https://crowdin.com/images/flags/nn-NO.png",
            emoji: "🇳🇴",
            primaryColor: { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 94, 75, 27], base10: 12192815 },
            flagColors: [
                { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 100, 76, 13], base10: 12192815 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00205B", rgb: [0, 32, 91], cmyk: [100, 78, 0, 57], base10: 8283 },
            ],
        },
    },
    {
        name: "Occitan",
        nativeName: "Occitan",
        ids: {
            locale: "oc-FR",
            ISO_639_1: "oc",
            ISO_639_2: "oci",
            ISO_639_3: "oci",
            androidCode: "oc-rFR",
            osxCode: "oc.lproj",
            osxLocale: "oc",
            glottolog: "occi1239",
        },
        direction: "ltr",
        country: "France",
        countryCode: "fr",
        flag: {
            image: "https://crowdin.com/images/flags/oc.png",
            primaryColor: { hex: "#C40026", rgb: [196, 0, 38], cmyk: [0, 100, 81, 23], base10: 12845094 },
            flagColors: [
                { hex: "#C40026", rgb: [196, 0, 38], cmyk: [0, 100, 81, 23], base10: 12845094 },
                { hex: "#FFD203", rgb: [255, 210, 3], cmyk: [0, 18, 99, 0], base10: 16765443 },
            ],
        },
        region: "Occitanie",
        regionCode: "oc",
    },
    {
        name: "Odia",
        nativeName: "ଓଡ଼ିଆ",
        ids: {
            locale: "or-IN",
            ISO_639_1: "or",
            ISO_639_2: "ori",
            ISO_639_3: "ori",
            androidCode: "or-rIN",
            osxCode: "or.lproj",
            osxLocale: "or",
            glottolog: "oriy1255",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/or.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Ojibwe",
        nativeName: "ᐊᓂᐦᔑᓈᐯᒧᐎᓐ",
        ids: {
            locale: "oj-CA",
            ISO_639_1: "oj",
            ISO_639_2: "oji",
            ISO_639_3: "oji",
            androidCode: "oj-rCA",
            osxCode: "oj.lproj",
            osxLocale: "oj",
            glottolog: "ojib1241",
        },
        direction: "ltr",
        country: "Canada",
        countryCode: "ca",
        flag: {
            image: "https://crowdin.com/images/flags/oj.png",
            primaryColor: { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Ojibwewaki",
        regionCode: "oj",
    },
    {
        name: "Oromo",
        nativeName: "Oromoo",
        ids: {
            locale: "om-ET",
            ISO_639_1: "om",
            ISO_639_2: "orm",
            ISO_639_3: "orm",
            androidCode: "om-rET",
            osxCode: "om.lproj",
            osxLocale: "om",
            glottolog: "nucl1736",
        },
        direction: "ltr",
        country: "Ethiopia",
        countryCode: "et",
        flag: {
            image: "https://crowdin.com/images/flags/om.png",
            emoji: "🇪🇹",
            primaryColor: { hex: "#009A44", rgb: [0, 154, 68], cmyk: [100, 0, 56, 40], base10: 39492 },
            flagColors: [
                { hex: "#009A44", rgb: [0, 154, 68], cmyk: [92, 0, 97, 0], base10: 39492 },
                { hex: "#FEDD00", rgb: [254, 221, 0], cmyk: [0, 1, 100, 0], base10: 16702720 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#0645B1", rgb: [6, 69, 177], cmyk: [99, 76, 0, 0], base10: 411057 },
            ],
        },
    },
    {
        name: "Ossetian",
        nativeName: "Ирон ӕвзаг",
        ids: {
            locale: "os-SE",
            ISO_639_1: "os",
            ISO_639_2: "oss",
            ISO_639_3: "oss",
            androidCode: "os-rSE",
            osxCode: "os.lproj",
            osxLocale: "os",
            glottolog: "osse1243",
        },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/os.png",
            primaryColor: { hex: "#EF4135", rgb: [250, 60, 50], cmyk: [0, 76, 80, 2], base10: 16399410 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#EF4135", rgb: [250, 60, 50], cmyk: [0, 76, 80, 2], base10: 16399410 },
                { hex: "#FBDC09", rgb: [251, 220, 9], cmyk: [0, 12, 96, 2], base10: 16505865 },
            ],
        },
        region: "North Ossetia–Alania",
        regionCode: "os",
    },
    {
        name: "Pali",
        nativeName: "पालि",
        ids: {
            locale: "pi-IN",
            ISO_639_1: "pi",
            ISO_639_2: "pli",
            ISO_639_3: "pli",
            androidCode: "pi-rIN",
            osxCode: "pi.lproj",
            osxLocale: "pi",
            glottolog: "pali1273",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/pi.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Papiamento",
        nativeName: "Papiamentu",
        ids: {
            locale: "pap-PAP",
            ISO_639_2: "pap",
            ISO_639_3: "pap",
            androidCode: "pap-rPAP",
            osxCode: "pap.lproj",
            osxLocale: "pap",
            glottolog: "papi1253",
        },
        direction: "ltr",
        country: "Aruba",
        countryCode: "aw",
        flag: {
            image: "https://crowdin.com/images/flags/pap.png",
            emoji: "🇦🇼",
            primaryColor: { hex: "#FBE122", rgb: [251, 225, 34], cmyk: [0, 10, 86, 2], base10: 16507170 },
            flagColors: [
                { hex: "#418FDE", rgb: [65, 143, 222], cmyk: [69, 34, 0, 0], base10: 4296670 },
                { hex: "#FBE122", rgb: [251, 225, 34], cmyk: [0, 1, 88, 0], base10: 16507170 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
            ],
        },
    },
    {
        name: "Pashto",
        nativeName: "پښتو",
        ids: {
            locale: "ps-AF",
            ISO_639_1: "ps",
            ISO_639_2: "pus",
            ISO_639_3: "pus",
            androidCode: "ps-rAF",
            osxCode: "ps.lproj",
            osxLocale: "ps",
            glottolog: "pash1269",
        },
        direction: "rtl",
        country: "Afghanistan",
        countryCode: "af",
        flag: {
            image: "https://crowdin.com/images/flags/ps.png",
            emoji: "🇦🇫",
            primaryColor: { hex: "#D32011", rgb: [211, 32, 17], cmyk: [0, 85, 92, 17], base10: 13836305 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#D32011", rgb: [211, 32, 17], cmyk: [0, 95, 100, 0], base10: 13836305 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007A36", rgb: [0, 122, 54], cmyk: [93, 0, 98, 17], base10: 31286 },
            ],
        },
    },
    {
        name: "Persian",
        nativeName: "فارسی",
        ids: {
            locale: "fa-IR",
            ISO_639_1: "fa",
            ISO_639_2: "fas",
            ISO_639_3: "fas",
            androidCode: "fa-rIR",
            osxCode: "fa.lproj",
            osxLocale: "fa",
            glottolog: "fars1254",
        },
        direction: "rtl",
        country: "Iran",
        countryCode: "ir",
        flag: {
            image: "https://crowdin.com/images/flags/fa.png",
            emoji: "🇮🇷",
            primaryColor: { hex: "#DA0000", rgb: [218, 0, 0], cmyk: [0, 100, 100, 15], base10: 14286848 },
            flagColors: [
                { hex: "#239F40", rgb: [35, 159, 64], cmyk: [100, 0, 67, 23], base10: 2334528 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#DA0000", rgb: [218, 0, 0], cmyk: [0, 100, 80, 5], base10: 14286848 },
            ],
        },
    },
    {
        name: "Pirate English",
        nativeName: "Pirate English",
        ids: { locale: "en-PT", androidCode: "en-rPT", osxCode: "en-PT.lproj", osxLocale: "en_PT" },
        direction: "ltr",
        country: "United Kingdom",
        countryCode: "gb",
        flag: {
            image: "https://crowdin.com/images/flags/en-PT.png",
            emoji: "🏴‍☠️",
            primaryColor: { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Polish",
        nativeName: "Polski",
        ids: {
            locale: "pl-PL",
            ISO_639_1: "pl",
            ISO_639_2: "pol",
            ISO_639_3: "pol",
            androidCode: "pl-rPL",
            osxCode: "pl.lproj",
            osxLocale: "pl",
            glottolog: "poli1260",
        },
        direction: "ltr",
        country: "Poland",
        countryCode: "pl",
        flag: {
            image: "https://crowdin.com/images/flags/pl.png",
            emoji: "🇵🇱",
            primaryColor: { hex: "#D22730", rgb: [210, 39, 48], cmyk: [0, 96, 82, 1], base10: 13772592 },
            flagColors: [
                { hex: "#D22730", rgb: [210, 39, 48], cmyk: [0, 96, 82, 1], base10: 13772592 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Portuguese",
        nativeName: "Português",
        ids: {
            locale: "pt-PT",
            ISO_639_1: "pt",
            ISO_639_2: "por",
            ISO_639_3: "por",
            androidCode: "pt-rPT",
            osxCode: "pt.lproj",
            osxLocale: "pt",
            glottolog: "port1283",
        },
        direction: "ltr",
        country: "Portugal",
        countryCode: "pt",
        flag: {
            image: "https://crowdin.com/images/flags/pt-PT.png",
            emoji: "🇵🇹",
            primaryColor: { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            flagColors: [
                { hex: "#046A38", rgb: [4, 106, 56], cmyk: [85, 3, 91, 44], base10: 289336 },
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFE900", rgb: [255, 233, 0], cmyk: [0, 3, 97, 0], base10: 16771328 },
                { hex: "#002D72", rgb: [0, 45, 114], cmyk: [100, 79, 0, 37], base10: 11634 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Portuguese, Brazilian",
        nativeName: "Português do Brasil",
        ids: {
            locale: "pt-BR",
            ISO_639_1: "pt",
            ISO_639_2: "por",
            ISO_639_3: "por",
            androidCode: "pt-rBR",
            osxCode: "pt-BR.lproj",
            osxLocale: "pt_BR",
            glottolog: "braz1246",
        },
        direction: "ltr",
        country: "Brazil",
        countryCode: "br",
        flag: {
            image: "https://crowdin.com/images/flags/pt-BR.png",
            emoji: "🇧🇷",
            primaryColor: { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
            flagColors: [
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#FEDD00", rgb: [254, 221, 0], cmyk: [0, 1, 100, 0], base10: 16702720 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 85, 0, 39], base10: 74089 },
            ],
        },
    },
    {
        name: "Punjabi",
        nativeName: "ਪੰਜਾਬੀ",
        ids: {
            locale: "pa-IN",
            ISO_639_1: "pa",
            ISO_639_2: "pan",
            ISO_639_3: "pan",
            androidCode: "pa-rIN",
            osxCode: "pa.lproj",
            osxLocale: "pa",
            glottolog: "panj1256",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/pa-IN.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Punjabi, Pakistan",
        nativeName: "پن٘جابی",
        ids: {
            locale: "pa-PK",
            ISO_639_1: "pa",
            ISO_639_2: "pan",
            ISO_639_3: "pan",
            androidCode: "pa-rPK",
            osxCode: "pa-PK.lproj",
            osxLocale: "pa_PK",
            glottolog: "panj1256",
        },
        direction: "ltr",
        country: "Pakistan",
        countryCode: "pk",
        flag: {
            image: "https://crowdin.com/images/flags/pa-PK.png",
            emoji: "🇵🇰",
            primaryColor: { hex: "#00401A", rgb: [0, 64, 26], cmyk: [100, 0, 59, 75], base10: 16410 },
            flagColors: [
                { hex: "#115740", rgb: [17, 87, 64], cmyk: [87, 13, 72, 56], base10: 1136448 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Quechua",
        nativeName: "Kechua",
        ids: { locale: "qu-PE", ISO_639_1: "qu", ISO_639_3: "qwe", androidCode: "qu-rPE", osxCode: "qu.lproj", osxLocale: "qu", glottolog: "quec1387" },
        direction: "ltr",
        country: "Peru",
        countryCode: "pe",
        flag: {
            image: "https://crowdin.com/images/flags/qu.png",
            emoji: "🇵🇪",
            primaryColor: { hex: "#D91023", rgb: [217, 16, 35], cmyk: [0, 93, 84, 15], base10: 14225443 },
            flagColors: [
                { hex: "#D91023", rgb: [217, 16, 35], cmyk: [0, 93, 84, 15], base10: 14225443 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Quenya",
        nativeName: "Quenya",
        ids: { locale: "qya-AA", ISO_639_3: "qya", androidCode: "qya-rAA", osxCode: "qya.lproj", osxLocale: "qya", glottolog: "quen1234" },
        direction: "ltr",
        country: "Middle-earth",
        countryCode: "aa",
        flag: {
            image: "https://crowdin.com/images/flags/qya-AA.png",
            primaryColor: { hex: "#008852", rgb: [0, 136, 82], cmyk: [100, 0, 40, 47], base10: 34898 },
            flagColors: [
                { hex: "#008852", rgb: [0, 136, 82], cmyk: [100, 0, 40, 47], base10: 34898 },
                { hex: "#DD342C", rgb: [221, 52, 44], cmyk: [0, 76, 80, 13], base10: 14496812 },
            ],
        },
    },
    {
        name: "Romanian",
        nativeName: "Limba română",
        ids: {
            locale: "ro-RO",
            ISO_639_1: "ro",
            ISO_639_2: "ron",
            ISO_639_3: "ron",
            androidCode: "ro-rRO",
            osxCode: "ro.lproj",
            osxLocale: "ro",
            glottolog: "roma1327",
        },
        direction: "ltr",
        country: "Romania",
        countryCode: "ro",
        flag: {
            image: "https://crowdin.com/images/flags/ro.png",
            emoji: "🇷🇴",
            primaryColor: { hex: "#FCD116", rgb: [252, 209, 22], cmyk: [0, 17, 91, 1], base10: 16568598 },
            flagColors: [
                { hex: "#002B7F", rgb: [0, 43, 127], cmyk: [100, 85, 0, 39], base10: 11135 },
                { hex: "#FCD116", rgb: [252, 209, 22], cmyk: [0, 10, 98, 0], base10: 16568598 },
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 100, 80, 5], base10: 13504806 },
            ],
        },
    },
    {
        name: "Romansh",
        nativeName: "Rumantsch",
        ids: {
            locale: "rm-CH",
            ISO_639_1: "rm",
            ISO_639_2: "roh",
            ISO_639_3: "roh",
            androidCode: "rm-rCH",
            osxCode: "rm.lproj",
            osxLocale: "rm",
            glottolog: "roma1326",
        },
        direction: "ltr",
        country: "Switzerland",
        countryCode: "ch",
        flag: {
            image: "https://crowdin.com/images/flags/rm-CH.png",
            emoji: "🇨🇭",
            primaryColor: { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 81, 87, 15], base10: 14297372 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Rundi",
        nativeName: "ÍkiRǔndi",
        ids: {
            locale: "rn-BI",
            ISO_639_1: "rn",
            ISO_639_2: "run",
            ISO_639_3: "run",
            androidCode: "rn-rBI",
            osxCode: "rn.lproj",
            osxLocale: "rn",
            glottolog: "rund1242",
        },
        direction: "ltr",
        country: "Republic of Burundi",
        countryCode: "bi",
        flag: {
            image: "https://crowdin.com/images/flags/rn.png",
            emoji: "🇧🇮",
            primaryColor: { hex: "#18B637", rgb: [24, 182, 55], cmyk: [87, 0, 70, 29], base10: 1619511 },
            flagColors: [
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 100, 80, 5], base10: 13504806 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#1EB53A", rgb: [30, 181, 58], cmyk: [68, 0, 100, 0], base10: 2012474 },
            ],
        },
    },
    {
        name: "Russian",
        nativeName: "Русский",
        ids: {
            locale: "ru-RU",
            ISO_639_1: "ru",
            ISO_639_2: "rus",
            ISO_639_3: "rus",
            androidCode: "ru-rRU",
            osxCode: "ru.lproj",
            osxLocale: "ru",
            glottolog: "russ1263",
        },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/ru.png",
            emoji: "🇷🇺",
            primaryColor: { hex: "#DB0D20", rgb: [219, 13, 32], cmyk: [0, 94, 85, 14], base10: 14355744 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#1C3578", rgb: [28, 53, 120], cmyk: [90, 47, 0, 0], base10: 1848696 },
                { hex: "#E4181C", rgb: [228, 24, 28], cmyk: [0, 90, 76, 0], base10: 14948380 },
            ],
        },
    },
    {
        name: "Russian, Belarus",
        nativeName: "Русский, Беларусь",
        ids: {
            locale: "ru-BY",
            ISO_639_1: "ru",
            ISO_639_2: "rus",
            ISO_639_3: "rus",
            androidCode: "ru-rBY",
            osxCode: "ru-BY.lproj",
            osxLocale: "ru_BY",
            glottolog: "russ1263",
        },
        direction: "ltr",
        country: "Belarus",
        countryCode: "by",
        flag: {
            image: "https://crowdin.com/images/flags/ru-BY.png",
            emoji: "🇧🇾",
            primaryColor: { hex: "#CF101A", rgb: [207, 16, 26], cmyk: [0, 92, 87, 19], base10: 13570074 },
            flagColors: [
                { hex: "#D22730", rgb: [210, 39, 48], cmyk: [0, 96, 82, 1], base10: 13772592 },
                { hex: "#00AF66", rgb: [0, 175, 102], cmyk: [92, 0, 85, 0], base10: 44902 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Russian, Moldova",
        nativeName: "Русский, Молдова",
        ids: {
            locale: "ru-MD",
            ISO_639_1: "ru",
            ISO_639_2: "rus",
            ISO_639_3: "rus",
            androidCode: "ru-rMD",
            osxCode: "ru-MD.lproj",
            osxLocale: "ru_MD",
            glottolog: "russ1263",
        },
        direction: "ltr",
        country: "Moldova",
        countryCode: "md",
        flag: {
            image: "https://crowdin.com/images/flags/ru-MD.png",
            emoji: "🇲🇩",
            primaryColor: { hex: "#0046AE", rgb: [0, 70, 174], cmyk: [100, 60, 0, 32], base10: 18094 },
            flagColors: [
                { hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15781 },
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#AD7C59", rgb: [173, 124, 89], cmyk: [14, 44, 59, 18], base10: 11369561 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Russian, Ukraine",
        nativeName: "Русский, Украина",
        ids: {
            locale: "ru-UA",
            ISO_639_1: "ru",
            ISO_639_2: "rus",
            ISO_639_3: "rus",
            androidCode: "ru-rUA",
            osxCode: "ru-UA.lproj",
            osxLocale: "ru_UA",
            glottolog: "russ1263",
        },
        direction: "ltr",
        country: "Ukraine",
        countryCode: "ua",
        flag: {
            image: "https://crowdin.com/images/flags/ru-UA.png",
            emoji: "🇺🇦",
            primaryColor: { hex: "#FFD700", rgb: [255, 215, 0], cmyk: [0, 16, 100, 0], base10: 16766720 },
            flagColors: [
                { hex: "#0057B7", rgb: [0, 87, 183], cmyk: [100, 63, 0, 2], base10: 22455 },
                { hex: "#FFDD00", rgb: [255, 221, 0], cmyk: [0, 1, 100, 0], base10: 16768256 },
            ],
        },
    },
    {
        name: "Rusyn",
        nativeName: "Русины",
        ids: { locale: "ry-UA", ISO_639_3: "rue", androidCode: "ry-rUA", osxCode: "ry.lproj", osxLocale: "ry", glottolog: "Rusyn" },
        direction: "ltr",
        country: "Ukraine",
        countryCode: "ua",
        flag: {
            image: "https://crowdin.com/images/flags/ry-UA.png",
            emoji: "🇺🇦",
            primaryColor: { hex: "#FFD700", rgb: [255, 215, 0], cmyk: [0, 16, 100, 0], base10: 16766720 },
            flagColors: [
                { hex: "#0057B7", rgb: [0, 87, 183], cmyk: [100, 63, 0, 2], base10: 22455 },
                { hex: "#FFDD00", rgb: [255, 221, 0], cmyk: [0, 1, 100, 0], base10: 16768256 },
            ],
        },
    },
    {
        name: "Sakha",
        nativeName: "Саха тыла",
        ids: {
            locale: "sah-SAH",
            ISO_639_2: "sah",
            ISO_639_3: "sah",
            androidCode: "sah-rSAH",
            osxCode: "sah.lproj",
            osxLocale: "sah",
            glottolog: "yaku1245",
        },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/sah.png",
            primaryColor: { hex: "#1199FF", rgb: [17, 153, 255], cmyk: [93, 40, 0, 0], base10: 1153535 },
            flagColors: [
                { hex: "#1199FF", rgb: [17, 153, 255], cmyk: [93, 40, 0, 0], base10: 1153535 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#EE2400", rgb: [238, 36, 0], cmyk: [0, 85, 100, 7], base10: 15606784 },
                { hex: "#009900", rgb: [0, 153, 0], cmyk: [100, 0, 100, 40], base10: 39168 },
            ],
        },
        region: "Republic of Sakha (Yakutia)",
        regionCode: "sah",
    },
    {
        name: "Sango",
        nativeName: "Yângâ tî Sängö",
        ids: {
            locale: "sg-CF",
            ISO_639_1: "sg",
            ISO_639_2: "sag",
            ISO_639_3: "sag",
            androidCode: "sg-rCF",
            osxCode: "sg.lproj",
            osxLocale: "sg",
            glottolog: "sang1327",
        },
        direction: "ltr",
        country: "Central African Republic",
        countryCode: "cf",
        flag: {
            image: "https://crowdin.com/images/flags/sg.png",
            emoji: "🇨🇫",
            primaryColor: { hex: "#003082", rgb: [0, 48, 130], cmyk: [100, 63, 0, 49], base10: 12418 },
            flagColors: [
                { hex: "#003082", rgb: [0, 48, 130], cmyk: [100, 63, 0, 49], base10: 12418 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#289728", rgb: [40, 151, 40], cmyk: [74, 0, 74, 41], base10: 2660136 },
                { hex: "#FFCE00", rgb: [255, 206, 0], cmyk: [0, 19, 100, 0], base10: 16764416 },
                { hex: "#D21034", rgb: [210, 16, 52], cmyk: [0, 92, 75, 18], base10: 13766708 },
            ],
        },
    },
    {
        name: "Sanskrit",
        nativeName: "संस्कृतम्",
        ids: {
            locale: "sa-IN",
            ISO_639_1: "sa",
            ISO_639_2: "san",
            ISO_639_3: "san",
            androidCode: "sa-rIN",
            osxCode: "sa.lproj",
            osxLocale: "sa",
            glottolog: "sans1269",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/sa.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Santali",
        nativeName: "संथाली",
        ids: {
            locale: "sat-IN",
            ISO_639_2: "sat",
            ISO_639_3: "sat",
            androidCode: "sat-rIN",
            osxCode: "sat.lproj",
            osxLocale: "sat",
            glottolog: "sant1410",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/sat.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Sardinian",
        nativeName: "Limba Sarda",
        ids: {
            locale: "sc-IT",
            ISO_639_1: "sc",
            ISO_639_2: "srd",
            ISO_639_3: "srd",
            androidCode: "sc-rIT",
            osxCode: "sc.lproj",
            osxLocale: "sc",
            glottolog: "sard1257",
        },
        direction: "ltr",
        country: "Italy",
        countryCode: "it",
        flag: {
            image: "https://crowdin.com/images/flags/sc.png",
            primaryColor: { hex: "#D81921", rgb: [216, 25, 33], cmyk: [0, 88, 85, 15], base10: 14162209 },
            flagColors: [
                { hex: "#D81921", rgb: [216, 25, 33], cmyk: [0, 88, 85, 15], base10: 14162209 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
        region: "Sardinia",
        regionCode: "sc",
    },
    {
        name: "Scots",
        nativeName: "Scoats leid",
        ids: {
            locale: "sco-GB",
            ISO_639_2: "sco",
            ISO_639_3: "sco",
            androidCode: "sco-rGB",
            osxCode: "sco.lproj",
            osxLocale: "sco",
            glottolog: "scot1243",
        },
        direction: "ltr",
        country: "United Kingdom",
        countryCode: "gb",
        flag: {
            image: "https://crowdin.com/images/flags/sco.png",
            emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
            primaryColor: { hex: "#005EB8", rgb: [0, 94, 184], cmyk: [100, 49, 0, 28], base10: 24248 },
            flagColors: [
                { hex: "#005EB8", rgb: [0, 94, 184], cmyk: [100, 56, 0, 3], base10: 24248 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Scotland",
        regionCode: "sct",
    },
    {
        name: "Scottish Gaelic",
        nativeName: "Gàidhlig",
        ids: {
            locale: "gd-GB",
            ISO_639_1: "gd",
            ISO_639_2: "gla",
            ISO_639_3: "gla",
            androidCode: "gd-rGB",
            osxCode: "gd.lproj",
            osxLocale: "gd",
            glottolog: "scot1245",
        },
        direction: "ltr",
        country: "United Kingdom",
        countryCode: "gb",
        flag: {
            image: "https://crowdin.com/images/flags/gd.png",
            emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
            primaryColor: { hex: "#005EB8", rgb: [0, 94, 184], cmyk: [100, 49, 0, 28], base10: 24248 },
            flagColors: [
                { hex: "#005EB8", rgb: [0, 94, 184], cmyk: [100, 56, 0, 3], base10: 24248 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Scotland",
        regionCode: "sct",
    },
    {
        name: "Serbian (Cyrillic)",
        nativeName: "Српска ћирилица",
        ids: {
            locale: "sr-SP",
            ISO_639_1: "sr",
            ISO_639_2: "srp",
            ISO_639_3: "srp",
            androidCode: "sr-rSP",
            osxCode: "sr.lproj",
            osxLocale: "sr",
            glottolog: "serb1264",
        },
        direction: "ltr",
        country: "Serbia",
        countryCode: "rs",
        flag: {
            image: "https://crowdin.com/images/flags/sr.png",
            emoji: "🇷🇸",
            primaryColor: { hex: "#C6363C", rgb: [198, 54, 60], cmyk: [0, 73, 70, 22], base10: 12990012 },
            flagColors: [
                { hex: "#C6363C", rgb: [198, 54, 60], cmyk: [0, 100, 62, 0], base10: 12990012 },
                { hex: "#0C4076", rgb: [12, 64, 118], cmyk: [100, 85, 0, 39], base10: 802934 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Serbian (Latin)",
        nativeName: "Latinski Srpski",
        ids: {
            locale: "sr-CS",
            ISO_639_1: "sr",
            ISO_639_2: "srp",
            ISO_639_3: "srp",
            androidCode: "sr-rCS",
            osxCode: "sr-Latn.lproj",
            osxLocale: "sr_Latn",
            glottolog: "serb1264",
        },
        direction: "ltr",
        country: "Serbia",
        countryCode: "rs",
        flag: {
            image: "https://crowdin.com/images/flags/sr-CS.png",
            emoji: "🇷🇸",
            primaryColor: { hex: "#C6363C", rgb: [198, 54, 60], cmyk: [0, 73, 70, 22], base10: 12990012 },
            flagColors: [
                { hex: "#C6363C", rgb: [198, 54, 60], cmyk: [0, 100, 62, 0], base10: 12990012 },
                { hex: "#0C4076", rgb: [12, 64, 118], cmyk: [100, 85, 0, 39], base10: 802934 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Serbo-Croatian",
        nativeName: "Srpskohrvatski",
        ids: { locale: "sh-HR", ISO_639_1: "sh", ISO_639_3: "hbs", androidCode: "sh-rHR", osxCode: "sh.lproj", osxLocale: "sh", glottolog: "sout1528" },
        direction: "ltr",
        country: "Croatia",
        countryCode: "hr",
        flag: {
            image: "https://crowdin.com/images/flags/sh.png",
            emoji: "🇭🇷",
            primaryColor: { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 92, 77, 22], base10: 13111342 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#012169", rgb: [1, 33, 105], cmyk: [100, 85, 0, 39], base10: 74089 },
                { hex: "#71C5E8", rgb: [113, 197, 232], cmyk: [52, 0, 0, 0], base10: 7456232 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Seychellois Creole",
        nativeName: "Kreol",
        ids: { locale: "crs-SC", ISO_639_3: "crs", androidCode: "crs-rSC", osxCode: "crs.lproj", osxLocale: "crs", glottolog: "sese1246" },
        direction: "ltr",
        country: "Seychelles",
        countryCode: "sc",
        flag: {
            image: "https://crowdin.com/images/flags/crs.png",
            emoji: "🇸🇨",
            primaryColor: { hex: "#D72323", rgb: [215, 35, 35], cmyk: [0, 84, 84, 16], base10: 14099235 },
            flagColors: [
                { hex: "#002F6C", rgb: [0, 47, 108], cmyk: [100, 74, 0, 45], base10: 12140 },
                { hex: "#FED141", rgb: [254, 209, 65], cmyk: [0, 9, 80, 0], base10: 16699713 },
                { hex: "#D22730", rgb: [210, 39, 48], cmyk: [0, 96, 82, 1], base10: 13772592 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007A33", rgb: [0, 122, 51], cmyk: [91, 0, 100, 26], base10: 31283 },
            ],
        },
    },
    {
        name: "Shona",
        nativeName: "ChiShona",
        ids: {
            locale: "sn-ZW",
            ISO_639_1: "sn",
            ISO_639_2: "sna",
            ISO_639_3: "sna",
            androidCode: "sn-rZW",
            osxCode: "sn.lproj",
            osxLocale: "sn",
            glottolog: "core1255",
        },
        direction: "ltr",
        country: "Zimbabwe",
        countryCode: "zw",
        flag: {
            image: "https://crowdin.com/images/flags/sn.png",
            emoji: "🇿🇼",
            primaryColor: { hex: "#FCE300", rgb: [252, 227, 0], cmyk: [0, 10, 100, 1], base10: 16573184 },
            flagColors: [
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#FCE300", rgb: [252, 227, 0], cmyk: [0, 0, 100, 0], base10: 16573184 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
            ],
        },
    },
    {
        name: "Sichuan Yi",
        nativeName: "ꆈꌠꉙ",
        ids: {
            locale: "ii-CN",
            ISO_639_1: "ii",
            ISO_639_2: "iii",
            ISO_639_3: "iii",
            androidCode: "ii-rCN",
            osxCode: "ii.lproj",
            osxLocale: "ii",
            glottolog: "sich1238",
        },
        direction: "ltr",
        country: "China",
        countryCode: "cn",
        flag: {
            image: "https://crowdin.com/images/flags/ii.png",
            emoji: "🇨🇳",
            primaryColor: { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 88, 84, 7], base10: 15604773 },
            flagColors: [
                { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 88, 84, 7], base10: 15604773 },
                { hex: "#FFFF00", rgb: [255, 255, 0], cmyk: [0, 0, 100, 0], base10: 16776960 },
            ],
        },
    },
    {
        name: "Sindhi",
        nativeName: "سنڌي",
        ids: {
            locale: "sd-PK",
            ISO_639_1: "ii",
            ISO_639_2: "iii",
            ISO_639_3: "iii",
            androidCode: "sd-rPK",
            osxCode: "sd.lproj",
            osxLocale: "sd",
            glottolog: "sich1238",
        },
        direction: "rtl",
        country: "Pakistan",
        countryCode: "pk",
        flag: {
            image: "https://crowdin.com/images/flags/sd.png",
            emoji: "🇵🇰",
            primaryColor: { hex: "#00401A", rgb: [0, 64, 26], cmyk: [100, 0, 59, 75], base10: 16410 },
            flagColors: [
                { hex: "#115740", rgb: [17, 87, 64], cmyk: [87, 13, 72, 56], base10: 1136448 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Sinhala",
        nativeName: "සිංහල",
        ids: {
            locale: "si-LK",
            ISO_639_1: "si",
            ISO_639_2: "sin",
            ISO_639_3: "sin",
            androidCode: "si-rLK",
            osxCode: "si.lproj",
            osxLocale: "si",
            glottolog: "sinh1246",
        },
        direction: "ltr",
        country: "Sri Lanka",
        countryCode: "lk",
        flag: {
            image: "https://crowdin.com/images/flags/si-LK.png",
            emoji: "🇱🇰",
            primaryColor: { hex: "#FFBF24", rgb: [255, 191, 36], cmyk: [0, 25, 86, 0], base10: 16760612 },
            flagColors: [
                { hex: "#FFBE29", rgb: [255, 190, 41], cmyk: [0, 5, 100, 0], base10: 16760361 },
                { hex: "#EB7400", rgb: [235, 116, 0], cmyk: [0, 30, 71, 0], base10: 15430656 },
                { hex: "#00534E", rgb: [0, 83, 78], cmyk: [68, 0, 100, 0], base10: 21326 },
                { hex: "#8D153A", rgb: [141, 21, 58], cmyk: [2, 97, 43, 33], base10: 9246010 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Slovak",
        nativeName: "Slovenčina",
        ids: {
            locale: "sk-SK",
            ISO_639_1: "sk",
            ISO_639_2: "slk",
            ISO_639_3: "slk",
            androidCode: "sk-rSK",
            osxCode: "sk.lproj",
            osxLocale: "sk",
            glottolog: "slov1269",
        },
        direction: "ltr",
        country: "Slovakia",
        countryCode: "sk",
        flag: {
            image: "https://crowdin.com/images/flags/sk.png",
            emoji: "🇸🇰",
            primaryColor: { hex: "#EE1620", rgb: [238, 22, 32], cmyk: [0, 91, 87, 7], base10: 15603232 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0B4EA2", rgb: [11, 78, 162], cmyk: [100, 76, 0, 9], base10: 741026 },
                { hex: "#EE1C25", rgb: [238, 28, 37], cmyk: [0, 90, 76, 0], base10: 15604773 },
            ],
        },
    },
    {
        name: "Slovenian",
        nativeName: "Slovenščina",
        ids: {
            locale: "sl-SI",
            ISO_639_1: "sl",
            ISO_639_2: "slv",
            ISO_639_3: "slv",
            androidCode: "sl-rSI",
            osxCode: "sl.lproj",
            osxLocale: "sl",
            glottolog: "slov1268",
        },
        direction: "ltr",
        country: "Slovenia",
        countryCode: "si",
        flag: {
            image: "https://crowdin.com/images/flags/sl.png",
            emoji: "🇸🇮",
            primaryColor: { hex: "#005CE6", rgb: [0, 92, 230], cmyk: [100, 60, 0, 10], base10: 23782 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15781 },
                { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 79, 0], base10: 16711680 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
            ],
        },
    },
    {
        name: "Somali",
        nativeName: "Af Soomaali",
        ids: {
            locale: "so-SO",
            ISO_639_1: "so",
            ISO_639_2: "som",
            ISO_639_3: "som",
            androidCode: "so-rSO",
            osxCode: "so.lproj",
            osxLocale: "so",
            glottolog: "soma1255",
        },
        direction: "ltr",
        country: "Somalia",
        countryCode: "so",
        flag: {
            image: "https://crowdin.com/images/flags/so.png",
            emoji: "🇸🇴",
            primaryColor: { hex: "#4189DD", rgb: [65, 137, 221], cmyk: [71, 38, 0, 13], base10: 4295133 },
            flagColors: [
                { hex: "#4189DD", rgb: [65, 137, 221], cmyk: [32, 8, 0, 0], base10: 4295133 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Songhay",
        nativeName: "Songhai",
        ids: {
            locale: "son-ZA",
            ISO_639_2: "son",
            ISO_639_3: "son",
            androidCode: "son-rZA",
            osxCode: "son.lproj",
            osxLocale: "son",
            glottolog: "song1307",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/son.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#282A74", rgb: [40, 42, 116], cmyk: [66, 64, 0, 55], base10: 2632308 },
            flagColors: [
                { hex: "#282A74", rgb: [40, 42, 116], cmyk: [66, 64, 0, 55], base10: 2632308 },
                { hex: "#008852", rgb: [0, 136, 82], cmyk: [100, 0, 40, 47], base10: 34898 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#333333", rgb: [51, 51, 51], cmyk: [0, 0, 0, 80], base10: 3355443 },
            ],
        },
    },
    {
        name: "Sorani (Kurdish)",
        nativeName: "سۆرانی",
        ids: { locale: "ckb-IR", ISO_639_3: "ckb", androidCode: "ckb-rIR", osxCode: "ckb.lproj", osxLocale: "ckb", glottolog: "cent1972" },
        direction: "rtl",
        country: "Iran",
        countryCode: "ir",
        flag: {
            image: "https://crowdin.com/images/flags/ckb.png",
            primaryColor: { hex: "#278E43", rgb: [39, 138, 65], cmyk: [72, 0, 53, 46], base10: 2591297 },
            flagColors: [
                { hex: "#ED2024", rgb: [237, 32, 36], cmyk: [0, 87, 85, 7], base10: 15540260 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#278E43", rgb: [39, 142, 67], cmyk: [73, 0, 53, 44], base10: 2592323 },
                { hex: "#FEBD11", rgb: [254, 189, 17], cmyk: [0, 26, 93, 0], base10: 16694545 },
            ],
        },
        region: "Kurdistan",
        regionCode: "ku",
    },
    {
        name: "Southern Ndebele",
        nativeName: "Transvaal Ndebele",
        ids: {
            locale: "nr-ZA",
            ISO_639_1: "nr",
            ISO_639_2: "nbl",
            ISO_639_3: "nbl",
            androidCode: "nr-rZA",
            osxCode: "nr.lproj",
            osxLocale: "nr",
            glottolog: "sout2808",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/nr.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Southern Sami",
        nativeName: "Åarjelsaemien gïele",
        ids: {
            locale: "sma-NO",
            ISO_639_2: "sma",
            ISO_639_3: "sma",
            androidCode: "sma-rNO",
            osxCode: "sma.lproj",
            osxLocale: "sma",
            glottolog: "sout2674",
        },
        direction: "ltr",
        country: "Norway",
        countryCode: "no",
        flag: {
            image: "https://crowdin.com/images/flags/sma.png",
            emoji: "🇳🇴",
            primaryColor: { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 94, 75, 27], base10: 12192815 },
            flagColors: [
                { hex: "#BA0C2F", rgb: [186, 12, 47], cmyk: [0, 100, 76, 13], base10: 12192815 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00205B", rgb: [0, 32, 91], cmyk: [100, 78, 0, 57], base10: 8283 },
            ],
        },
    },
    {
        name: "Southern Sotho",
        nativeName: "SeSotho",
        ids: {
            locale: "st-ZA",
            ISO_639_1: "st",
            ISO_639_2: "sot",
            ISO_639_3: "sot",
            androidCode: "st-rZA",
            osxCode: "st.lproj",
            osxLocale: "st",
            glottolog: "sout2807",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/st.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Spanish",
        nativeName: "Español",
        ids: {
            locale: "es-ES",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rES",
            osxCode: "es.lproj",
            osxLocale: "es",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/es-ES.png",
            emoji: "🇪🇸",
            primaryColor: { hex: "#AA151B", rgb: [170, 21, 27], cmyk: [0, 88, 84, 33], base10: 11146523 },
            flagColors: [
                { hex: "#AA151B", rgb: [170, 21, 27], cmyk: [0, 90, 76, 0], base10: 11146523 },
                { hex: "#F1BF00", rgb: [241, 191, 0], cmyk: [0, 5, 100, 0], base10: 15843072 },
            ],
        },
    },
    {
        name: "Spanish (Modern)",
        nativeName: "Español (Moderno)",
        ids: {
            locale: "es-EM",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rEM",
            osxCode: "es-EM.lproj",
            osxLocale: "es_EM",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/es-EM.png",
            emoji: "🇪🇸",
            primaryColor: { hex: "#AA151B", rgb: [170, 21, 27], cmyk: [0, 88, 84, 33], base10: 11146523 },
            flagColors: [
                { hex: "#AA151B", rgb: [170, 21, 27], cmyk: [0, 90, 76, 0], base10: 11146523 },
                { hex: "#F1BF00", rgb: [241, 191, 0], cmyk: [0, 5, 100, 0], base10: 15843072 },
            ],
        },
    },
    {
        name: "Spanish, Argentina",
        nativeName: "Español argentino",
        ids: {
            locale: "es-AR",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rAR",
            osxCode: "es-AR.lproj",
            osxLocale: "es_AR",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Argentina",
        countryCode: "ar",
        flag: {
            image: "https://crowdin.com/images/flags/es-AR.png",
            emoji: "🇦🇷",
            primaryColor: { hex: "#6CACE4", rgb: [108, 172, 228], cmyk: [53, 25, 0, 11], base10: 7122148 },
            flagColors: [
                { hex: "#6CACE4", rgb: [108, 172, 228], cmyk: [54, 19, 0, 0], base10: 7122148 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#7D4016", rgb: [125, 64, 22], cmyk: [0, 68, 100, 53], base10: 8208406 },
            ],
        },
    },
    {
        name: "Spanish, Bolivia",
        nativeName: "Español boliviano",
        ids: {
            locale: "es-BO",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rBO",
            osxCode: "es-BO.lproj",
            osxLocale: "es_BO",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Bolivia",
        countryCode: "bo",
        flag: {
            image: "https://crowdin.com/images/flags/es-BO.png",
            emoji: "🇧🇴",
            primaryColor: { hex: "#007A33", rgb: [0, 122, 51], cmyk: [100, 0, 58, 52], base10: 31283 },
            flagColors: [
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#F8E600", rgb: [248, 230, 0], cmyk: [0, 0, 100, 0], base10: 16311808 },
                { hex: "#007A33", rgb: [0, 122, 51], cmyk: [91, 0, 100, 26], base10: 31283 },
            ],
        },
    },
    {
        name: "Spanish, Chile",
        nativeName: "Español chileno",
        ids: {
            locale: "es-CL",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rCL",
            osxCode: "es-CL.lproj",
            osxLocale: "es_CL",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Chile",
        countryCode: "cl",
        flag: {
            image: "https://crowdin.com/images/flags/es-CL.png",
            emoji: "🇨🇱",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
            ],
        },
    },
    {
        name: "Spanish, Colombia",
        nativeName: "Español colombiano",
        ids: {
            locale: "es-CO",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rCO",
            osxCode: "es-CO.lproj",
            osxLocale: "es_CO",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Colombia",
        countryCode: "co",
        flag: {
            image: "https://crowdin.com/images/flags/es-CO.png",
            emoji: "🇨🇴",
            primaryColor: { hex: "#FCD116", rgb: [252, 209, 22], cmyk: [0, 17, 91, 1], base10: 16568598 },
            flagColors: [
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#003087", rgb: [0, 48, 135], cmyk: [100, 81, 0, 23], base10: 12423 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
            ],
        },
    },
    {
        name: "Spanish, Costa Rica",
        nativeName: "Español costarricense",
        ids: {
            locale: "es-CR",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rCR",
            osxCode: "es-CR.lproj",
            osxLocale: "es_CR",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Costa Rica",
        countryCode: "cr",
        flag: {
            image: "https://crowdin.com/images/flags/es-CR.png",
            emoji: "🇨🇷",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#00205B", rgb: [0, 32, 91], cmyk: [100, 78, 0, 57], base10: 8283 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
            ],
        },
    },
    {
        name: "Spanish, Dominican Republic",
        nativeName: "Español dominicano",
        ids: {
            locale: "es-DO",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rDO",
            osxCode: "es-DO.lproj",
            osxLocale: "es_DO",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Dominican Republic",
        countryCode: "do",
        flag: {
            image: "https://crowdin.com/images/flags/es-DO.png",
            emoji: "🇩🇴",
            primaryColor: { hex: "#002D62", rgb: [0, 45, 98], cmyk: [100, 54, 0, 62], base10: 11618 },
            flagColors: [
                { hex: "#002D62", rgb: [0, 45, 98], cmyk: [100, 94, 0, 78], base10: 11618 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 90, 76, 0], base10: 13504806 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#006300", rgb: [0, 99, 0], cmyk: [93, 0, 100, 0], base10: 25344 },
                { hex: "#EAC102", rgb: [234, 193, 2], cmyk: [0, 5, 100, 0], base10: 15384834 },
            ],
        },
    },
    {
        name: "Spanish, Ecuador",
        nativeName: "Español ecuatoriano",
        ids: {
            locale: "es-EC",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rEC",
            osxCode: "es-EC.lproj",
            osxLocale: "es_EC",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Ecuador",
        countryCode: "ec",
        flag: {
            image: "https://crowdin.com/images/flags/es-EC.png",
            emoji: "🇪🇨",
            primaryColor: { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 18, 100, 0], base10: 16765184 },
            flagColors: [
                { hex: "#FFD100", rgb: [255, 209, 0], cmyk: [0, 5, 100, 0], base10: 16765184 },
                { hex: "#0072CE", rgb: [0, 114, 206], cmyk: [90, 47, 0, 0], base10: 29390 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
            ],
        },
    },
    {
        name: "Spanish, El Salvador",
        nativeName: "Español salvadoreño",
        ids: {
            locale: "es-SV",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rSV",
            osxCode: "es-SV.lproj",
            osxLocale: "es_SV",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "El Salvador",
        countryCode: "sv",
        flag: {
            image: "https://crowdin.com/images/flags/es-SV.png",
            emoji: "🇸🇻",
            primaryColor: { hex: "#0047AB", rgb: [0, 71, 171], cmyk: [100, 58, 0, 33], base10: 18347 },
            flagColors: [
                { hex: "#0047AB", rgb: [0, 71, 171], cmyk: [100, 56, 0, 3], base10: 18347 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FCE300", rgb: [252, 227, 0], cmyk: [0, 0, 100, 0], base10: 16573184 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#E60000", rgb: [230, 0, 0], cmyk: [0, 90, 76, 0], base10: 15073280 },
                { hex: "#009900", rgb: [0, 153, 0], cmyk: [93, 0, 98, 17], base10: 39168 },
            ],
        },
    },
    {
        name: "Spanish, Guatemala",
        nativeName: "Español guatemalteco",
        ids: {
            locale: "es-GT",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rGT",
            osxCode: "es-GT.lproj",
            osxLocale: "es_GT",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Guatemala",
        countryCode: "gt",
        flag: {
            image: "https://crowdin.com/images/flags/es-GT.png",
            emoji: "🇬🇹",
            primaryColor: { hex: "#4997D0", rgb: [73, 151, 208], cmyk: [65, 27, 0, 18], base10: 4822992 },
            flagColors: [
                { hex: "#4997D0", rgb: [73, 151, 208], cmyk: [79, 7, 0, 0], base10: 4822992 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Spanish, Honduras",
        nativeName: "Español hondureño",
        ids: {
            locale: "es-HN",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rHN",
            osxCode: "es-HN.lproj",
            osxLocale: "es_HN",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Honduras",
        countryCode: "hn",
        flag: {
            image: "https://crowdin.com/images/flags/es-HN.png",
            emoji: "🇭🇳",
            primaryColor: { hex: "#0072CE", rgb: [0, 114, 206], cmyk: [100, 45, 0, 19], base10: 29390 },
            flagColors: [
                { hex: "#0072CE", rgb: [0, 114, 206], cmyk: [90, 47, 0, 0], base10: 29390 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Spanish, Latin America",
        nativeName: "Español latinoamericano",
        ids: {
            locale: "es-419",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-r419",
            osxCode: "es-419.lproj",
            osxLocale: "es_419",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/es-419.png",
            emoji: "🇪🇸",
            primaryColor: { hex: "#AA151B", rgb: [170, 21, 27], cmyk: [0, 88, 84, 33], base10: 11146523 },
            flagColors: [
                { hex: "#AA151B", rgb: [170, 21, 27], cmyk: [0, 90, 76, 0], base10: 11146523 },
                { hex: "#F1BF00", rgb: [241, 191, 0], cmyk: [0, 5, 100, 0], base10: 15843072 },
            ],
        },
    },
    {
        name: "Spanish, Mexico",
        nativeName: "Español mexicano",
        ids: {
            locale: "es-MX",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rMX",
            osxCode: "es-MX.lproj",
            osxLocale: "es_MX",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Mexico",
        countryCode: "mx",
        flag: {
            image: "https://crowdin.com/images/flags/es-MX.png",
            emoji: "🇲🇽",
            primaryColor: { hex: "#006847", rgb: [0, 104, 71], cmyk: [100, 0, 32, 59], base10: 26695 },
            flagColors: [
                { hex: "#006341", rgb: [0, 99, 65], cmyk: [92, 2, 80, 47], base10: 25409 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
            ],
        },
    },
    {
        name: "Spanish, Nicaragua",
        nativeName: "Español nicaragüense",
        ids: {
            locale: "es-NI",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rNI",
            osxCode: "es-NI.lproj",
            osxLocale: "es_NI",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Nicaragua",
        countryCode: "ni",
        flag: {
            image: "https://crowdin.com/images/flags/es-NI.png",
            emoji: "🇳🇮",
            primaryColor: { hex: "#0067C6", rgb: [0, 103, 198], cmyk: [100, 48, 0, 22], base10: 26566 },
            flagColors: [
                { hex: "#0067c6", rgb: [0, 103, 198], cmyk: [100, 78, 0, 57], base10: 26566 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#C8A400", rgb: [200, 164, 0], cmyk: [0, 31, 100, 25], base10: 13149184 },
                { hex: "#6FD8F3", rgb: [111, 216, 243], cmyk: [55, 13, 0, 0], base10: 7330035 },
                { hex: "#EDE71F", rgb: [237, 231, 31], cmyk: [0, 5, 100, 0], base10: 15591199 },
                { hex: "#97C924", rgb: [151, 201, 36], cmyk: [93, 0, 100, 0], base10: 9947428 },
            ],
        },
    },
    {
        name: "Spanish, Panama",
        nativeName: "Español panameño",
        ids: {
            locale: "es-PA",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rPA",
            osxCode: "es-PA.lproj",
            osxLocale: "es_PA",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Panama",
        countryCode: "pa",
        flag: {
            image: "https://crowdin.com/images/flags/es-PA.png",
            emoji: "🇵🇦",
            primaryColor: { hex: "#DA121A", rgb: [218, 18, 26], cmyk: [0, 92, 88, 15], base10: 14291482 },
            flagColors: [
                { hex: "#DA121A", rgb: [218, 18, 26], cmyk: [0, 100, 80, 5], base10: 14291482 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#072357", rgb: [7, 35, 87], cmyk: [100, 56, 0, 3], base10: 467799 },
            ],
        },
    },
    {
        name: "Spanish, Paraguay",
        nativeName: "Español paraguayo",
        ids: {
            locale: "es-PY",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rPY",
            osxCode: "es-PY.lproj",
            osxLocale: "es_PY",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Paraguay",
        countryCode: "py",
        flag: {
            image: "https://crowdin.com/images/flags/es-PY.png",
            emoji: "🇵🇾",
            primaryColor: { hex: "#D52B1E", rgb: [213, 43, 30], cmyk: [0, 80, 86, 16], base10: 13970206 },
            flagColors: [
                { hex: "#D52B1E", rgb: [213, 43, 30], cmyk: [0, 90, 76, 0], base10: 13970206 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 80, 0, 12], base10: 14504 },
                { hex: "#FEDF00", rgb: [254, 223, 0], cmyk: [0, 0, 100, 0], base10: 16703232 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#009B3A", rgb: [0, 155, 58], cmyk: [93, 0, 100, 0], base10: 39738 },
            ],
        },
    },
    {
        name: "Spanish, Peru",
        nativeName: "Español peruano",
        ids: {
            locale: "es-PE",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rPE",
            osxCode: "es-PE.lproj",
            osxLocale: "es_PE",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Peru",
        countryCode: "pe",
        flag: {
            image: "https://crowdin.com/images/flags/es-PE.png",
            emoji: "🇵🇪",
            primaryColor: { hex: "#D91023", rgb: [217, 16, 35], cmyk: [0, 93, 84, 15], base10: 14225443 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Spanish, Puerto Rico",
        nativeName: "Español puertorriqueño",
        ids: {
            locale: "es-PR",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rPR",
            osxCode: "es-PR.lproj",
            osxLocale: "es_PR",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Puerto Rico",
        countryCode: "pr",
        flag: {
            image: "https://crowdin.com/images/flags/es-PR.png",
            emoji: "🇵🇷",
            primaryColor: { hex: "#E92228", rgb: [233, 34, 40], cmyk: [0, 85, 83, 9], base10: 15278632 },
            flagColors: [
                { hex: "#E92228", rgb: [233, 34, 40], cmyk: [0, 90, 76, 0], base10: 15278632 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#3A5EAB", rgb: [58, 94, 171], cmyk: [100, 78, 0, 57], base10: 3825323 },
            ],
        },
    },
    {
        name: "Spanish, United States",
        nativeName: "Español estadounidense",
        ids: {
            locale: "es-US",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rUS",
            osxCode: "es-US.lproj",
            osxLocale: "es_US",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "United States",
        countryCode: "us",
        flag: {
            image: "https://crowdin.com/images/flags/es-US.png",
            emoji: "🇺🇸",
            primaryColor: { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [90, 49, 0, 62], base10: 668001 },
            flagColors: [
                { hex: "#B31942", rgb: [179, 25, 66], cmyk: [0, 100, 66, 13], base10: 11737410 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#0A3161", rgb: [10, 49, 97], cmyk: [100, 68, 0, 54], base10: 668001 },
            ],
        },
    },
    {
        name: "Spanish, Uruguay",
        nativeName: "Español uruguayo",
        ids: {
            locale: "es-UY",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rUY",
            osxCode: "es-UY.lproj",
            osxLocale: "es_UY",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Uruguay",
        countryCode: "uy",
        flag: {
            image: "https://crowdin.com/images/flags/es-UY.png",
            emoji: "🇺🇾",
            primaryColor: { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 67, 0, 34], base10: 14504 },
            flagColors: [
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#7B3F00", rgb: [123, 63, 0], cmyk: [0, 63, 100, 57], base10: 8077056 },
            ],
        },
    },
    {
        name: "Spanish, Venezuela",
        nativeName: "Español venezolano",
        ids: {
            locale: "es-VE",
            ISO_639_1: "es",
            ISO_639_2: "spa",
            ISO_639_3: "spa",
            androidCode: "es-rVE",
            osxCode: "es-VE.lproj",
            osxLocale: "es_VE",
            glottolog: "stan1288",
        },
        direction: "ltr",
        country: "Venezuela",
        countryCode: "ve",
        flag: {
            image: "https://crowdin.com/images/flags/es-VE.png",
            emoji: "🇻🇪",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#FCE300", rgb: [252, 227, 0], cmyk: [0, 0, 100, 0], base10: 16573184 },
                { hex: "#003DA5", rgb: [0, 61, 165], cmyk: [100, 76, 0, 9], base10: 15781 },
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Sundanese",
        nativeName: "Basa Sunda",
        ids: {
            locale: "su-ID",
            ISO_639_1: "su",
            ISO_639_2: "sun",
            ISO_639_3: "sun",
            androidCode: "su-rID",
            osxCode: "su.lproj",
            osxLocale: "su",
            glottolog: "sund1251",
        },
        direction: "ltr",
        country: "Indonesia",
        countryCode: "id",
        flag: {
            image: "https://crowdin.com/images/flags/su.png",
            emoji: "🇮🇩",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Swahili",
        nativeName: "Kiswahili",
        ids: {
            locale: "sw",
            ISO_639_1: "sw",
            ISO_639_2: "swa",
            ISO_639_3: "swa",
            androidCode: "sw-rKE",
            osxCode: "sw.lproj",
            osxLocale: "sw",
            glottolog: "swah1254",
        },
        direction: "ltr",
        country: "Kenya",
        countryCode: "ke",
        flag: {
            image: "https://crowdin.com/images/flags/sw.png",
            emoji: "🇰🇪",
            primaryColor: { hex: "#BB0000", rgb: [187, 0, 0], cmyk: [0, 100, 100, 27], base10: 12255232 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#BB0000", rgb: [187, 0, 0], cmyk: [1, 87, 77, 13], base10: 12255232 },
                { hex: "#006600", rgb: [0, 102, 0], cmyk: [92, 0, 97, 0], base10: 26112 },
            ],
        },
    },
    {
        name: "Swahili, Kenya",
        nativeName: "Kiswahili, Kenya",
        ids: {
            locale: "sw-KE",
            ISO_639_1: "sw",
            ISO_639_2: "swa",
            ISO_639_3: "swa",
            androidCode: "sw-rKE",
            osxCode: "sw-KE.lproj",
            osxLocale: "sw_KE",
            glottolog: "swah1254",
        },
        direction: "ltr",
        country: "Kenya",
        countryCode: "ke",
        flag: {
            image: "https://crowdin.com/images/flags/sw-KE.png",
            emoji: "🇰🇪",
            primaryColor: { hex: "#BB0000", rgb: [187, 0, 0], cmyk: [0, 100, 100, 27], base10: 12255232 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#BB0000", rgb: [187, 0, 0], cmyk: [1, 87, 77, 13], base10: 12255232 },
                { hex: "#006600", rgb: [0, 102, 0], cmyk: [92, 0, 97, 0], base10: 26112 },
            ],
        },
    },
    {
        name: "Swahili, Tanzania",
        nativeName: "Kiswahili, Tanzania",
        ids: {
            locale: "sw-TZ",
            ISO_639_1: "sw",
            ISO_639_2: "swa",
            ISO_639_3: "swa",
            androidCode: "sw-rTZ",
            osxCode: "sw-TZ.lproj",
            osxLocale: "sw_TZ",
            glottolog: "swah1254",
        },
        direction: "ltr",
        country: "Tanzania",
        countryCode: "tz",
        flag: {
            image: "https://crowdin.com/images/flags/sw-TZ.png",
            emoji: "🇹🇿",
            primaryColor: { hex: "#00A3DD", rgb: [0, 163, 221], cmyk: [100, 26, 0, 13], base10: 41949 },
            flagColors: [
                { hex: "#1EB53A", rgb: [30, 181, 58], cmyk: [68, 0, 100, 0], base10: 2012474 },
                { hex: "#FCD116", rgb: [252, 209, 22], cmyk: [0, 10, 98, 0], base10: 16568598 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#00A3DD", rgb: [0, 163, 221], cmyk: [79, 7, 0, 0], base10: 41949 },
            ],
        },
    },
    {
        name: "Swati",
        nativeName: "SiSwati",
        ids: {
            locale: "ss-ZA",
            ISO_639_1: "ss",
            ISO_639_2: "ssw",
            ISO_639_3: "ssw",
            androidCode: "ss-rZA",
            osxCode: "ss.lproj",
            osxLocale: "ss",
            glottolog: "swat1243",
        },
        direction: "ltr",
        country: "Eswatini",
        countryCode: "sz",
        flag: {
            image: "https://crowdin.com/images/flags/ss.png",
            emoji: "🇸🇿",
            primaryColor: { hex: "#3E5EB9", rgb: [62, 94, 185], cmyk: [66, 49, 0, 27], base10: 4087481 },
            flagColors: [
                { hex: "#3E5EB9", rgb: [62, 94, 185], cmyk: [77, 0, 3, 0], base10: 4087481 },
                { hex: "#FFD900", rgb: [255, 217, 0], cmyk: [0, 5, 100, 0], base10: 16767232 },
                { hex: "#B10C0C", rgb: [177, 12, 12], cmyk: [0, 100, 79, 0], base10: 11602956 },
            ],
        },
    },
    {
        name: "Swedish",
        nativeName: "Svenska",
        ids: {
            locale: "sv-SE",
            ISO_639_1: "sv",
            ISO_639_2: "swe",
            ISO_639_3: "swe",
            androidCode: "sv-rSE",
            osxCode: "sv.lproj",
            osxLocale: "sv",
            glottolog: "swed1254",
        },
        direction: "ltr",
        country: "Sweden",
        countryCode: "se",
        flag: {
            image: "https://crowdin.com/images/flags/sv-SE.png",
            emoji: "🇸🇪",
            primaryColor: { hex: "#FECC02", rgb: [254, 204, 2], cmyk: [0, 20, 99, 0], base10: 16698370 },
            flagColors: [
                { hex: "#006AA7", rgb: [0, 106, 167], cmyk: [100, 37, 0, 35], base10: 27303 },
                { hex: "#FECC02", rgb: [254, 204, 2], cmyk: [0, 20, 99, 0], base10: 16698370 },
            ],
        },
    },
    {
        name: "Swedish, Finland",
        nativeName: "Svenska, Finland",
        ids: {
            locale: "sv-FI",
            ISO_639_1: "sv",
            ISO_639_2: "swe",
            ISO_639_3: "swe",
            androidCode: "sv-rFI",
            osxCode: "sv-FI.lproj",
            osxLocale: "sv_FI",
            glottolog: "swed1254",
        },
        direction: "ltr",
        country: "Finland",
        countryCode: "fi",
        flag: {
            image: "https://crowdin.com/images/flags/sv-FI.png",
            emoji: "🇫🇮",
            primaryColor: { hex: "#002F6C", rgb: [0, 47, 108], cmyk: [100, 56, 0, 58], base10: 12140 },
            flagColors: [
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#002F6C", rgb: [0, 47, 108], cmyk: [100, 74, 0, 45], base10: 12140 },
            ],
        },
    },
    {
        name: "Syriac",
        nativeName: "ܠܫܵܢܵܐ ܣܘܪܝܝܐ",
        ids: {
            locale: "syc-SY",
            ISO_639_2: "syc",
            ISO_639_3: "syc",
            androidCode: "syc-rSY",
            osxCode: "syc.lproj",
            osxLocale: "syc",
            glottolog: "clas1252",
        },
        direction: "rtl",
        country: "Syria",
        countryCode: "sy",
        flag: {
            image: "https://crowdin.com/images/flags/syc.png",
            emoji: "🇸🇾",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 90, 76, 0], base10: 13504806 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007A3D", rgb: [0, 122, 61], cmyk: [93, 0, 100, 0], base10: 31293 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Tagalog",
        nativeName: "Tagalog",
        ids: {
            locale: "tl-PH",
            ISO_639_1: "tl",
            ISO_639_2: "tgl",
            ISO_639_3: "tgl",
            androidCode: "tl-rPH",
            osxCode: "tl.lproj",
            osxLocale: "tl",
            glottolog: "taga1280",
        },
        direction: "ltr",
        country: "Philippines",
        countryCode: "ph",
        flag: {
            image: "https://crowdin.com/images/flags/tl.png",
            emoji: "🇵🇭",
            primaryColor: { hex: "#0038A8", rgb: [0, 56, 168], cmyk: [100, 67, 0, 34], base10: 14504 },
            flagColors: [
                { hex: "#0032A0", rgb: [0, 50, 160], cmyk: [100, 80, 0, 12], base10: 12960 },
                { hex: "#BF0D3E", rgb: [191, 13, 62], cmyk: [0, 100, 59, 11], base10: 12520766 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FED141", rgb: [254, 209, 65], cmyk: [0, 9, 80, 0], base10: 16699713 },
            ],
        },
    },
    {
        name: "Tahitian",
        nativeName: "Te reo tahiti",
        ids: {
            locale: "ty-PF",
            ISO_639_1: "ty",
            ISO_639_2: "tah",
            ISO_639_3: "tah",
            androidCode: "ty-rPF",
            osxCode: "ty.lproj",
            osxLocale: "ty",
            glottolog: "tahi1242",
        },
        direction: "ltr",
        country: "French Polynesia",
        countryCode: "pf",
        flag: {
            image: "https://crowdin.com/images/flags/ty.png",
            emoji: "🇵🇫",
            primaryColor: { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
            flagColors: [
                { hex: "#CE1126", rgb: [206, 17, 38], cmyk: [0, 92, 82, 19], base10: 13504806 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FF9C10", rgb: [255, 156, 16], cmyk: [0, 39, 94, 0], base10: 16751632 },
                { hex: "#083D9C", rgb: [8, 61, 156], cmyk: [95, 61, 0, 39], base10: 540060 },
            ],
        },
    },
    {
        name: "Tajik",
        nativeName: "Тоҷики",
        ids: {
            locale: "tg-TJ",
            ISO_639_1: "tg",
            ISO_639_2: "tgk",
            ISO_639_3: "tgk",
            androidCode: "tg-rTJ",
            osxCode: "tg.lproj",
            osxLocale: "tg",
            glottolog: "taji1245",
        },
        direction: "ltr",
        country: "Tajikistan",
        countryCode: "tj",
        flag: {
            image: "https://crowdin.com/images/flags/tg.png",
            emoji: "🇹🇯",
            primaryColor: { hex: "#CC0000", rgb: [204, 0, 0], cmyk: [0, 100, 100, 20], base10: 13369344 },
            flagColors: [
                { hex: "#CC0000", rgb: [204, 0, 0], cmyk: [0, 100, 62, 0], base10: 13369344 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#006600", rgb: [0, 102, 0], cmyk: [93, 0, 100, 0], base10: 26112 },
                { hex: "#F8C300", rgb: [248, 195, 0], cmyk: [0, 5, 100, 0], base10: 16302848 },
            ],
        },
    },
    {
        name: "Talossan",
        nativeName: "El bel glheþ Talossan",
        ids: { locale: "tzl-TZL", ISO_639_3: "tzl", androidCode: "tzl-rTZL", osxCode: "tzl.lproj", osxLocale: "tzl", glottolog: "talo1253" },
        direction: "ltr",
        country: "Talossa",
        countryCode: "tzl",
        flag: {
            image: "https://crowdin.com/images/flags/tzl.png",
            primaryColor: { hex: "#707070", rgb: [112, 112, 112], cmyk: [0, 0, 0, 56], base10: 7368816 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#707070", rgb: [112, 112, 112], cmyk: [0, 0, 0, 56], base10: 7368816 },
            ],
        },
    },
    {
        name: "Tamil",
        nativeName: "தமிழ்",
        ids: {
            locale: "ta-IN",
            ISO_639_1: "ta",
            ISO_639_2: "tam",
            ISO_639_3: "tam",
            androidCode: "ta-rIN",
            osxCode: "ta.lproj",
            osxLocale: "ta",
            glottolog: "tami1289",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/ta.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Tatar",
        nativeName: "Татарча",
        ids: {
            locale: "tt-RU",
            ISO_639_1: "tt",
            ISO_639_2: "tat",
            ISO_639_3: "tat",
            androidCode: "tt-rRU",
            osxCode: "tt.lproj",
            osxLocale: "tt",
            glottolog: "tata1255",
        },
        direction: "ltr",
        country: "Russia",
        countryCode: "ru",
        flag: {
            image: "https://crowdin.com/images/flags/tt-RU.png",
            primaryColor: { hex: "#008000", rgb: [0, 128, 0], cmyk: [100, 0, 100, 50], base10: 32768 },
            flagColors: [
                { hex: "#008000", rgb: [0, 128, 0], cmyk: [100, 0, 100, 50], base10: 32768 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#FF0000", rgb: [255, 0, 0], cmyk: [0, 100, 100, 0], base10: 16711680 },
            ],
        },
        region: "Tatarstan",
        regionCode: "ta",
    },
    {
        name: "Telugu",
        nativeName: "తెలుగు",
        ids: {
            locale: "te-IN",
            ISO_639_1: "te",
            ISO_639_2: "tel",
            ISO_639_3: "tel",
            androidCode: "te-rIN",
            osxCode: "te.lproj",
            osxLocale: "te",
            glottolog: "telu1262",
        },
        direction: "ltr",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/te.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Tem (Kotokoli)",
        nativeName: "Temba",
        ids: { locale: "kdh-KDH", ISO_639_3: "kdh", androidCode: "kdh-rKDH", osxCode: "kdh.lproj", osxLocale: "kdh", glottolog: "temm1241" },
        direction: "ltr",
        country: "Togo",
        countryCode: "tg",
        flag: {
            image: "https://crowdin.com/images/flags/kdh.png",
            emoji: "🇹🇬",
            primaryColor: { hex: "#006A4A", rgb: [0, 106, 74], cmyk: [100, 0, 30, 58], base10: 27210 },
            flagColors: [
                { hex: "#D21034", rgb: [210, 16, 52], cmyk: [0, 90, 76, 0], base10: 13766708 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#006A4A", rgb: [0, 106, 74], cmyk: [93, 0, 100, 0], base10: 27210 },
                { hex: "#FFCE00", rgb: [255, 206, 0], cmyk: [0, 5, 100, 0], base10: 16764416 },
            ],
        },
    },
    {
        name: "Thai",
        nativeName: "ไทย",
        ids: {
            locale: "th-TH",
            ISO_639_1: "th",
            ISO_639_2: "tha",
            ISO_639_3: "tha",
            androidCode: "th-rTH",
            osxCode: "th.lproj",
            osxLocale: "th",
            glottolog: "thai1261",
        },
        direction: "ltr",
        country: "Thailand",
        countryCode: "th",
        flag: {
            image: "https://crowdin.com/images/flags/th.png",
            emoji: "🇹🇭",
            primaryColor: { hex: "#00247D", rgb: [0, 36, 125], cmyk: [100, 71, 0, 51], base10: 9341 },
            flagColors: [
                { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 90, 76, 0], base10: 15676224 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00247D", rgb: [0, 36, 125], cmyk: [100, 78, 0, 57], base10: 9341 },
            ],
        },
    },
    {
        name: "Tibetan",
        nativeName: "བོད་སྐད་",
        ids: {
            locale: "bo-BT",
            ISO_639_1: "bo",
            ISO_639_2: "bod",
            ISO_639_3: "bod",
            androidCode: "bo-rBT",
            osxCode: "bo.lproj",
            osxLocale: "bo",
            glottolog: "tibe1272",
        },
        direction: "ltr",
        country: "Bhutan",
        countryCode: "bt",
        flag: {
            image: "https://crowdin.com/images/flags/bo-BT.png",
            emoji: "🇧🇹",
            primaryColor: { hex: "#29166F", rgb: [41, 22, 111], cmyk: [63, 80, 0, 56], base10: 2692719 },
            flagColors: [
                { hex: "#29166F", rgb: [41, 22, 111], cmyk: [63, 80, 0, 57], base10: 2692719 },
                { hex: "#DA251C", rgb: [218, 37, 28], cmyk: [0, 83, 87, 15], base10: 14296348 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#F4E109", rgb: [244, 225, 9], cmyk: [0, 8, 96, 4], base10: 16048393 },
            ],
        },
    },
    {
        name: "Tigrinya",
        nativeName: "ትግርኛ",
        ids: {
            locale: "ti-ER",
            ISO_639_1: "ti",
            ISO_639_2: "tir",
            ISO_639_3: "tir",
            androidCode: "ti-rER",
            osxCode: "ti.lproj",
            osxLocale: "ti",
            glottolog: "tigr1271",
        },
        direction: "ltr",
        country: "Eritrea",
        countryCode: "er",
        flag: {
            image: "https://crowdin.com/images/flags/ti.png",
            emoji: "🇪🇷",
            primaryColor: { hex: "#43B02A", rgb: [67, 176, 42], cmyk: [62, 0, 76, 31], base10: 4436010 },
            flagColors: [
                { hex: "#43B02A", rgb: [67, 176, 42], cmyk: [68, 0, 100, 0], base10: 4436010 },
                { hex: "#E4002B", rgb: [228, 0, 43], cmyk: [0, 100, 89, 0], base10: 14942251 },
                { hex: "#418FDE", rgb: [65, 143, 222], cmyk: [69, 34, 0, 0], base10: 4296670 },
                { hex: "#FFC72C", rgb: [255, 199, 44], cmyk: [0, 16, 89, 0], base10: 16762668 },
            ],
        },
    },
    {
        name: "Tsonga",
        nativeName: "XiTsonga",
        ids: {
            locale: "ts-ZA",
            ISO_639_1: "ts",
            ISO_639_2: "tso",
            ISO_639_3: "tso",
            androidCode: "ts-rZA",
            osxCode: "ts.lproj",
            osxLocale: "ts",
            glottolog: "tson1249",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/ts.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Tswana",
        nativeName: "Setswana",
        ids: {
            locale: "tn-ZA",
            ISO_639_1: "tn",
            ISO_639_2: "tsn",
            ISO_639_3: "tsn",
            androidCode: "tn-rZA",
            osxCode: "tn.lproj",
            osxLocale: "tn",
            glottolog: "tswa1253",
        },
        direction: "ltr",
        country: "Botswana",
        countryCode: "bw",
        flag: {
            image: "https://crowdin.com/images/flags/tn.png",
            emoji: "🇧🇼",
            primaryColor: { hex: "#ABCAE9", rgb: [171, 202, 233], cmyk: [27, 13, 0, 9], base10: 11258601 },
            flagColors: [
                { hex: "#ABCAE9", rgb: [171, 202, 233], cmyk: [32, 8, 0, 0], base10: 11258601 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Turkish",
        nativeName: "Türkçe",
        ids: {
            locale: "tr-TR",
            ISO_639_1: "tr",
            ISO_639_2: "tur",
            ISO_639_3: "tur",
            androidCode: "tr-rTR",
            osxCode: "tr.lproj",
            osxLocale: "tr",
            glottolog: "nucl1301",
        },
        direction: "ltr",
        country: "Turkey",
        countryCode: "tr",
        flag: {
            image: "https://crowdin.com/images/flags/tr.png",
            emoji: "🇹🇷",
            primaryColor: { hex: "#E30A17", rgb: [227, 10, 23], cmyk: [0, 96, 90, 11], base10: 14879255 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Turkish, Cyprus",
        nativeName: "Türkçe, Kıbrıs",
        ids: {
            locale: "tr-CY",
            ISO_639_1: "tr",
            ISO_639_2: "tur",
            ISO_639_3: "tur",
            androidCode: "tr-rCY",
            osxCode: "tr-CY.lproj",
            osxLocale: "tr_CY",
            glottolog: "nucl1301",
        },
        direction: "ltr",
        country: "Cyprus",
        countryCode: "cy",
        flag: {
            image: "https://crowdin.com/images/flags/tr-CY.png",
            emoji: "🇨🇾",
            primaryColor: { hex: "#D57800", rgb: [213, 120, 0], cmyk: [0, 44, 100, 16], base10: 13989888 },
            flagColors: [
                { hex: "#D57800", rgb: [213, 120, 0], cmyk: [0, 54, 100, 5], base10: 13989888 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#4E5B31", rgb: [78, 91, 49], cmyk: [49, 22, 85, 58], base10: 5135153 },
            ],
        },
    },
    {
        name: "Turkmen",
        nativeName: "Түркmенче",
        ids: {
            locale: "tk-TM",
            ISO_639_1: "tk",
            ISO_639_2: "tuk",
            ISO_639_3: "tuk",
            androidCode: "tk-rTM",
            osxCode: "tk.lproj",
            osxLocale: "tk",
            glottolog: "turk1304",
        },
        direction: "ltr",
        country: "Turkmenistan",
        countryCode: "tm",
        flag: {
            image: "https://crowdin.com/images/flags/tk.png",
            emoji: "🇹🇲",
            primaryColor: { hex: "#009639", rgb: [0, 150, 57], cmyk: [100, 0, 62, 41], base10: 38457 },
            flagColors: [
                { hex: "#009739", rgb: [0, 151, 57], cmyk: [93, 0, 100, 0], base10: 38713 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
            ],
        },
    },
    {
        name: "Ukrainian",
        nativeName: "Українська",
        ids: {
            locale: "uk-UA",
            ISO_639_1: "uk",
            ISO_639_2: "ukr",
            ISO_639_3: "ukr",
            androidCode: "uk-rUA",
            osxCode: "uk.lproj",
            osxLocale: "uk",
            glottolog: "ukra1253",
        },
        direction: "ltr",
        country: "Ukraine",
        countryCode: "ua",
        flag: {
            image: "https://crowdin.com/images/flags/uk.png",
            emoji: "🇺🇦",
            primaryColor: { hex: "#FFD700", rgb: [255, 215, 0], cmyk: [0, 16, 100, 0], base10: 16766720 },
            flagColors: [
                { hex: "#0057B7", rgb: [0, 87, 183], cmyk: [100, 63, 0, 2], base10: 22455 },
                { hex: "#FFDD00", rgb: [255, 221, 0], cmyk: [0, 1, 100, 0], base10: 16768256 },
            ],
        },
    },
    {
        name: "Upper Sorbian",
        nativeName: "Hornjoserbsce",
        ids: {
            locale: "hsb-DE",
            ISO_639_2: "hsb",
            ISO_639_3: "hsb",
            androidCode: "hsb-rDE",
            osxCode: "hsb.lproj",
            osxLocale: "hsb",
            glottolog: "uppe1395",
        },
        direction: "ltr",
        country: "Germany",
        countryCode: "de",
        flag: {
            image: "https://crowdin.com/images/flags/hsb-DE.png",
            emoji: "🇩🇪",
            primaryColor: { hex: "#0C4076", rgb: [12, 64, 118], cmyk: [90, 46, 0, 54], base10: 802934 },
            flagColors: [
                { hex: "#0C4076", rgb: [12, 64, 118], cmyk: [90, 46, 0, 54], base10: 802934 },
                { hex: "#CC3533", rgb: [204, 53, 51], cmyk: [0, 74, 75, 20], base10: 13382963 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Urdu, India",
        nativeName: "اردو، ہندوستان",
        ids: {
            locale: "ur-IN",
            ISO_639_1: "ur",
            ISO_639_2: "urd",
            ISO_639_3: "urd",
            androidCode: "ur-rIN",
            osxCode: "ur-IN.lproj",
            osxLocale: "ur_IN",
            glottolog: "urdu1245",
        },
        direction: "rtl",
        country: "India",
        countryCode: "in",
        flag: {
            image: "https://crowdin.com/images/flags/ur-IN.png",
            emoji: "🇮🇳",
            primaryColor: { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 40, 80, 0], base10: 16750899 },
            flagColors: [
                { hex: "#FF9933", rgb: [255, 153, 51], cmyk: [0, 49, 96, 0], base10: 16750899 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#138808", rgb: [19, 136, 8], cmyk: [66, 0, 100, 9], base10: 1280008 },
                { hex: "#000080", rgb: [0, 0, 128], cmyk: [99, 98, 0, 35], base10: 128 },
            ],
        },
    },
    {
        name: "Urdu, Pakistan",
        nativeName: "اردو، پاکستان",
        ids: {
            locale: "ur-PK",
            ISO_639_1: "ur",
            ISO_639_2: "urd",
            ISO_639_3: "urd",
            androidCode: "ur-rPK",
            osxCode: "ur.lproj",
            osxLocale: "ur",
            glottolog: "urdu1245",
        },
        direction: "rtl",
        country: "Pakistan",
        countryCode: "pk",
        flag: {
            image: "https://crowdin.com/images/flags/ur-PK.png",
            emoji: "🇵🇰",
            primaryColor: { hex: "#00401A", rgb: [0, 64, 26], cmyk: [100, 0, 59, 75], base10: 16410 },
            flagColors: [
                { hex: "#115740", rgb: [17, 87, 64], cmyk: [87, 13, 72, 56], base10: 1136448 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Uyghur",
        nativeName: "Уйғур",
        ids: {
            locale: "ug-CN",
            ISO_639_1: "ug",
            ISO_639_2: "uig",
            ISO_639_3: "uig",
            androidCode: "ug-rCN",
            osxCode: "ug.lproj",
            osxLocale: "ug",
            glottolog: "uigh1240",
        },
        direction: "rtl",
        country: "China",
        countryCode: "cn",
        flag: {
            image: "https://crowdin.com/images/flags/ug.png",
            primaryColor: { hex: "#0099FF", rgb: [0, 153, 255], cmyk: [100, 40, 0, 0], base10: 39423 },
            flagColors: [
                { hex: "#0099FF", rgb: [0, 153, 255], cmyk: [100, 40, 0, 0], base10: 39423 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Xinjiang",
        regionCode: "ug",
    },
    {
        name: "Uzbek",
        nativeName: "O’zbek",
        ids: {
            locale: "uz-UZ",
            ISO_639_1: "uz",
            ISO_639_2: "uzb",
            ISO_639_3: "uzb",
            androidCode: "uz-rUZ",
            osxCode: "uz.lproj",
            osxLocale: "uz",
            glottolog: "uzbe1247",
        },
        direction: "ltr",
        country: "Uzbekistan",
        countryCode: "uz",
        flag: {
            image: "https://crowdin.com/images/flags/uz.png",
            emoji: "🇺🇿",
            primaryColor: { hex: "#009AB6", rgb: [0, 154, 182], cmyk: [100, 15, 0, 29], base10: 39606 },
            flagColors: [
                { hex: "#0072CE", rgb: [0, 114, 206], cmyk: [90, 47, 0, 0], base10: 29390 },
                { hex: "#DA291C", rgb: [218, 41, 28], cmyk: [0, 95, 100, 0], base10: 14297372 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#43B02A", rgb: [67, 176, 42], cmyk: [68, 0, 100, 0], base10: 4436010 },
            ],
        },
    },
    {
        name: "Valencian",
        nativeName: "Valencià",
        ids: { locale: "val-ES", ISO_639_3: "val", androidCode: "val-rES", osxCode: "val.lproj", osxLocale: "val" },
        direction: "ltr",
        country: "Spain",
        countryCode: "es",
        flag: {
            image: "https://crowdin.com/images/flags/val-ES.png",
            primaryColor: { hex: "#DA121A", rgb: [218, 18, 26], cmyk: [0, 92, 88, 15], base10: 14291482 },
            flagColors: [
                { hex: "#DA121A", rgb: [218, 18, 26], cmyk: [0, 92, 88, 15], base10: 14291482 },
                { hex: "#FCDD09", rgb: [252, 221, 9], cmyk: [0, 12, 96, 1], base10: 16571657 },
                { hex: "#0072BC", rgb: [0, 114, 188], cmyk: [100, 39, 0, 26], base10: 29372 },
                { hex: "#078930", rgb: [7, 137, 48], cmyk: [95, 0, 65, 46], base10: 493872 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
        region: "Valencia",
        regionCode: "val",
    },
    {
        name: "Venda",
        nativeName: "TshiVenḓa",
        ids: {
            locale: "ve-ZA",
            ISO_639_1: "ve",
            ISO_639_2: "ven",
            ISO_639_3: "ven",
            androidCode: "ve-rZA",
            osxCode: "ve.lproj",
            osxLocale: "ve",
            glottolog: "vend1245",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/ve.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Venetian",
        nativeName: "Vèneto",
        ids: { locale: "vec-IT", ISO_639_3: "vec", androidCode: "vec-rIT", osxCode: "vec.lproj", osxLocale: "vec", glottolog: "vene1258" },
        direction: "ltr",
        country: "Italy",
        countryCode: "it",
        flag: {
            image: "https://crowdin.com/images/flags/vec.png",
            primaryColor: { hex: "#980000", rgb: [152, 0, 0], cmyk: [0, 100, 100, 40], base10: 9961472 },
            flagColors: [
                { hex: "#AA0000", rgb: [170, 0, 0], cmyk: [0, 100, 100, 33], base10: 11141120 },
                { hex: "#FFC80A", rgb: [255, 200, 10], cmyk: [0, 22, 96, 0], base10: 16762890 },
                { hex: "#E6D754", rgb: [230, 215, 84], cmyk: [0, 7, 64, 10], base10: 15128404 },
                { hex: "#CFB633", rgb: [207, 182, 51], cmyk: [0, 12, 75, 19], base10: 13612595 },
                { hex: "#B99E33", rgb: [185, 158, 51], cmyk: [0, 15, 72, 28], base10: 12164659 },
                { hex: "#094BD0", rgb: [9, 75, 208], cmyk: [96, 64, 0, 18], base10: 609232 },
                { hex: "#6EA4C9", rgb: [110, 164, 201], cmyk: [45, 18, 0, 21], base10: 7251145 },
            ],
        },
        region: "Venice",
        regionCode: "vec",
    },
    {
        name: "Vietnamese",
        nativeName: "Tiếng việt",
        ids: {
            locale: "vi-VN",
            ISO_639_1: "vi",
            ISO_639_2: "vie",
            ISO_639_3: "vie",
            androidCode: "vi-rVN",
            osxCode: "vi.lproj",
            osxLocale: "vi",
            glottolog: "viet1252",
        },
        direction: "ltr",
        country: "Vietnam",
        countryCode: "vn",
        flag: {
            image: "https://crowdin.com/images/flags/vi.png",
            emoji: "🇻🇳",
            primaryColor: { hex: "#DA251D", rgb: [218, 37, 29], cmyk: [0, 83, 87, 15], base10: 14296349 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
            ],
        },
    },
    {
        name: "Walloon",
        nativeName: "Walon",
        ids: {
            locale: "wa-BE",
            ISO_639_1: "wa",
            ISO_639_2: "wln",
            ISO_639_3: "wln",
            androidCode: "wa-rBE",
            osxCode: "wa.lproj",
            osxLocale: "wa",
            glottolog: "wall1255",
        },
        direction: "ltr",
        country: "Belgium",
        countryCode: "be",
        flag: {
            image: "https://crowdin.com/images/flags/wa.png",
            emoji: "🇧🇪",
            primaryColor: { hex: "#EF3340", rgb: [239, 51, 64], cmyk: [0, 79, 73, 6], base10: 15676224 },
            flagColors: [
                { hex: "#2D2926", rgb: [45, 41, 38], cmyk: [65, 66, 68, 82], base10: 2959654 },
                { hex: "#FFCD00", rgb: [255, 205, 0], cmyk: [0, 10, 98, 0], base10: 16764160 },
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 100, 80, 5], base10: 13111342 },
            ],
        },
        region: "Wallonia",
        regionCode: "wa",
    },
    {
        name: "Welsh",
        nativeName: "Cymraeg",
        ids: {
            locale: "cy-GB",
            ISO_639_1: "cy",
            ISO_639_2: "cym",
            ISO_639_3: "cym",
            androidCode: "cy-rGB",
            osxCode: "cy.lproj",
            osxLocale: "cy",
            glottolog: "wels1247",
        },
        direction: "ltr",
        country: "United Kingdom",
        countryCode: "gb",
        flag: {
            image: "https://crowdin.com/images/flags/cy.png",
            emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
            primaryColor: { hex: "#D30731", rgb: [211, 7, 49], cmyk: [0, 97, 77, 17], base10: 13829937 },
            flagColors: [
                { hex: "#C8102E", rgb: [200, 16, 46], cmyk: [0, 92, 77, 22], base10: 13111342 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#00B140", rgb: [0, 177, 64], cmyk: [100, 0, 64, 31], base10: 45376 },
            ],
        },
        region: "Wales",
        regionCode: "cy",
    },
    {
        name: "Wolof",
        nativeName: "Wollof",
        ids: {
            locale: "wo-SN",
            ISO_639_1: "wo",
            ISO_639_2: "wol",
            ISO_639_3: "wol",
            androidCode: "wo-rSN",
            osxCode: "wo.lproj",
            osxLocale: "wo",
            glottolog: "wolo1247",
        },
        direction: "ltr",
        country: "Senegal",
        countryCode: "sn",
        flag: {
            image: "https://crowdin.com/images/flags/wo.png",
            emoji: "🇸🇳",
            primaryColor: { hex: "#009639", rgb: [0, 150, 57], cmyk: [100, 0, 62, 41], base10: 38457 },
            flagColors: [
                { hex: "#00853F", rgb: [0, 133, 63], cmyk: [93, 0, 100, 0], base10: 34111 },
                { hex: "#FDEF42", rgb: [253, 239, 66], cmyk: [0, 5, 100, 0], base10: 16641858 },
                { hex: "#E31B23", rgb: [227, 27, 35], cmyk: [0, 90, 76, 0], base10: 14883619 },
            ],
        },
    },
    {
        name: "Xhosa",
        nativeName: "IsiXhosa",
        ids: {
            locale: "xh-ZA",
            ISO_639_1: "xh",
            ISO_639_2: "xho",
            ISO_639_3: "xho",
            androidCode: "xh-rZA",
            osxCode: "xh.lproj",
            osxLocale: "xh",
            glottolog: "xhos1239",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/xh.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
    {
        name: "Yiddish",
        nativeName: "ייִדיש",
        ids: {
            locale: "yi-DE",
            ISO_639_1: "yi",
            ISO_639_2: "yid",
            ISO_639_3: "yid",
            androidCode: "ji-rDE",
            osxCode: "yi.lproj",
            osxLocale: "yi",
            glottolog: "yidd1255",
        },
        direction: "rtl",
        country: "Germany",
        countryCode: "de",
        flag: {
            image: "https://crowdin.com/images/flags/yi.png",
            emoji: "🇩🇪",
            primaryColor: { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            flagColors: [
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Yoruba",
        nativeName: "Yorùbá",
        ids: {
            locale: "yo-NG",
            ISO_639_1: "yo",
            ISO_639_2: "yor",
            ISO_639_3: "yor",
            androidCode: "yo-rNG",
            osxCode: "yo.lproj",
            osxLocale: "yo",
            glottolog: "yoru1245",
        },
        direction: "ltr",
        country: "Nigeria",
        countryCode: "ng",
        flag: {
            image: "https://crowdin.com/images/flags/yo.png",
            emoji: "🇳🇬",
            primaryColor: { hex: "#008753", rgb: [0, 135, 83], cmyk: [100, 0, 39, 47], base10: 34643 },
            flagColors: [
                { hex: "#1B7339", rgb: [27, 115, 57], cmyk: [93, 0, 100, 0], base10: 1798969 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
            ],
        },
    },
    {
        name: "Zeelandic",
        nativeName: "Zeêuws",
        ids: { locale: "zea-ZEA", ISO_639_3: "zea", androidCode: "zea-rZEA", osxCode: "zea.lproj", osxLocale: "zea", glottolog: "zeeu1238" },
        direction: "ltr",
        country: "Netherlands",
        countryCode: "nl",
        flag: {
            image: "https://crowdin.com/images/flags/zea.png",
            primaryColor: { hex: "#1E09A2", rgb: [30, 9, 162], cmyk: [81, 94, 0, 36], base10: 1968546 },
            flagColors: [
                { hex: "#1E09A2", rgb: [30, 9, 162], cmyk: [81, 94, 0, 36], base10: 1968546 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#F3E01B", rgb: [243, 224, 27], cmyk: [0, 8, 89, 5], base10: 15982619 },
                { hex: "#CC182C", rgb: [204, 24, 44], cmyk: [0, 88, 78, 20], base10: 13375532 },
            ],
        },
        region: "Zeeland",
        regionCode: "zea",
    },
    {
        name: "Zulu",
        nativeName: "IsiZulu",
        ids: {
            locale: "zu-ZA",
            ISO_639_1: "zu",
            ISO_639_2: "zul",
            ISO_639_3: "zul",
            androidCode: "zu-rZA",
            osxCode: "zu.lproj",
            osxLocale: "zu",
            glottolog: "zulu1248",
        },
        direction: "ltr",
        country: "South Africa",
        countryCode: "za",
        flag: {
            image: "https://crowdin.com/images/flags/zu.png",
            emoji: "🇿🇦",
            primaryColor: { hex: "#FFB81C", rgb: [255, 182, 18], cmyk: [0, 29, 93, 0], base10: 16758290 },
            flagColors: [
                { hex: "#E03C31", rgb: [224, 60, 49], cmyk: [0, 88, 85, 0], base10: 14695473 },
                { hex: "#FFFFFF", rgb: [255, 255, 255], cmyk: [0, 0, 0, 0], base10: 16777215 },
                { hex: "#007749", rgb: [0, 119, 73], cmyk: [100, 0, 85, 29], base10: 30537 },
                { hex: "#001489", rgb: [0, 20, 137], cmyk: [100, 87, 0, 20], base10: 5257 },
                { hex: "#FFB81C", rgb: [255, 184, 28], cmyk: [0, 25, 94, 0], base10: 16758812 },
                { hex: "#000000", rgb: [0, 0, 0], cmyk: [0, 0, 0, 100], base10: 0 },
            ],
        },
    },
];
exports["default"] = languages;
//# sourceMappingURL=languages.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(3109);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map