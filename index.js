var fs = require('fs');
var spawn = require("child_process").spawn;
var temp = require('temp');
var chdir = require('chdir');
var os = require('os');

module.exports = function (opts, cb) {
    chdir(os.tmpDir(), function () { 
        fs.readFile(opts.template, {encoding: 'utf8'}, function (err, template) {
            template = template.toString()
                .replace('%from%', opts.from)
                .replace('%to%', opts.to)
                .replace('%period%', opts.period)
                .replace('%amount%', opts.amount.replace("$", "\\$"));

            temp.open('invoice', function (err, info) {
                if (err) {
                    cb("Error creating a temporary file: " + err);
                    return;
                }
                fs.write(info.fd, Buffer(template), 0, template.length, null, function (err) {
                    if (err) {
                        cb("Error writing invoice template to a temporary file: " + err);
                        return;
                    }
                    fs.close(info.fd, function (err) {
                        if (err) {
                            cb("Error closing invoice template's fd: " + err);
                            return;
                        }
                        var latex = spawn("pdflatex",
                            ["-interaction=nonstopmode", "-halt-on-error", info.path],
                            {
                                cwd : os.tmpDir()
                            }
                        );
                        function onExit (code) {
                            if (code) {
                                cb("Spawning latex failed. Error code: " + code);
                                return;
                            }
                            cb(null, info.path + '.pdf');
                        }
                        latex.on('exit', onExit);
                    });
                });
            });
        });
    });
}
