(function(exports) {
	var tagName = 'data-isostyle-id';

	function get(id) {
		return document.getElementsByTagName("head")[0].querySelector('[' + tagName + '=' + JSON.stringify(id) + ']');
	}

	function parse(src) {
		var items = {
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			'&': '&amp;'
		};

		return src.replace(/[<>"&]/g, function(res) {
			return items[res];
		});
	}

	function insert(style, id) {
		if ('object' != typeof document || !document.createElement)
			return exports._cssMarkup = exports._cssMarkup || [], void exports._cssMarkup.push('<style type="text/css" ' + tagName + '="' + parse(id) + '">' + parse(style) + "</style>\n");

		var element = get(id);

		if (!element) {
			element = document.createElement('style');
			element.type = 'text/css';
			element.setAttribute(tagName, id);
            
            document.getElementsByTagName('head')[0].appendChild(element);

            element.styleSheet ? element.styleSheet.cssText = style : element.appendChild(document.createTextNode(style));
		}

		return function() {
			element.remove();
		}
	}

	module.exports = insert;
}).call(exports, function() {
	return this
}());