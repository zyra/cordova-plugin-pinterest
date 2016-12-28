var exec = require('cordova/exec');

function trimArgs(args) {
    args = Array.from(args);
    args.splice(args.length-2, 2);
    return args;
}

module.exports = {

};
