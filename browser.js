var attr = 'data-isostyle-id';

function getStyleNode (id) {
	var head = document.getElementsByTagName('head')[0];

	return head.querySelector('[' + attr + '=' + JSON.stringify(id) + ']');
}

function sanatize (src) {
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

function isostyle (style, id) {
	if ('object' != typeof document || !document.createElement) {
		return exports._cssMarkup = exports._cssMarkup || [], void exports._cssMarkup.push('<style type="text/css" ' + attr + '="' + sanatize(id) + '">' + style + "</style>\n");
	}

	var element = getStyleNode(id);

	if (style === '') {
		if (element) {
			element.parentNode.removeChild(element);
		}

		return;
	}

	if (element) {
		for (; element.firstChild; ) {
			element.removeChild(element.firstChild);
		}
	} else {
		element = document.createElement('style');
		element.type = 'text/css';
		element.setAttribute(attr, id);

		document.getElementsByTagName('head')[0].appendChild(element);
	}

	element.styleSheet ? element.styleSheet.cssText = style : element.appendChild(document.createTextNode(style));
}

module.exports = isostyle;