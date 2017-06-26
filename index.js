var path = require('path');
var through = require('through2');
var less = require('less');
var shortid = require('shortid');

module.exports = function(src) {
	if (!/\.css$|\.less$/.test(src)) {
		return through();
	}

	// Output path for less files while compiling
	if (/\.less$/.test(src)) console.info(src);

	var buffer = '';
	var dir = path.dirname(src);

	return through(function(chunk, enc, next) {
		buffer += chunk;
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

			var identifier = shortid.generate().toLowerCase();
			var bundle = "var isostyle = require(" + JSON.stringify('isostyle/browser') + "), style = \"" + output.css.replace(/'/g, "\\'").replace(/"/g, '\\"') + "\"; isostyle(style, \"is-" + identifier + "\");";
			
			self.push(bundle);
			self.push(null);
			done();
		});
	});
};