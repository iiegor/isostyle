var path = require('path');
var through = require('through2');
var less = require('less');

module.exports = function(src) {
	if (!/\.css$|\.less$/.test(src)) {
		return through();
	}

	if (/\.less$/.test(src)) console.info('Compiling: ' + src);

	var buffer = '';
	var dir = path.dirname(src);

	return through(function(chunk, enc, next) {
		buffer += chunk.toString();
		next();
	}, function(done) {
		var self = this;

		less.render(buffer, {
			paths: ['.', dir],
			compress: true
		}, function(e, output) {
			if (e) {
				var msg = e.message;
				if (e.line) {
					msg += ", line " + e.line;
				}
				if (e.column) {
					msg += ", column " + e.column;
				}
				if (e.extract) {
					msg += ": \"" + e.extract + "\"";
				}

				done(new Error(msg, file, e.line));
			}

			var compiled = "module.exports = \"" + output.css.replace(/'/g, "\\'").replace(/"/g, '\\"') + "\";";

			self.push(compiled);
            self.push(null);
			done();
		});
	});
};