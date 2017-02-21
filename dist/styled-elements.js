 /* eslint-disable */ 
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("styled", [], factory);
	else if(typeof exports === 'object')
		exports["styled"] = factory();
	else
		root["styled"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.__esModule = true;
exports.doHash = doHash;
function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.keyframes = exports.presets = exports.tags = exports.injectGlobal = exports.css = exports.setTheme = exports.dangerChars = exports.docCSS = undefined;
exports.escapeChars = escapeChars;
exports.joinTemplate = joinTemplate;
exports.buildName = buildName;
exports.renderCSS = renderCSS;
exports['default'] = styled;

var _hash = __webpack_require__(0);

var theme = {};
var globalCSS = '';
var docCSS = exports.docCSS = {};
var dangerChars = exports.dangerChars = [/&/g, /</g, />/g, /"/g, /'/g];

function escapeChars(str) {
  var output = String(str);
  dangerChars.forEach(function (char) {
    return output = output.replace(char, '');
  });
  return output;
}

function joinTemplate(strings, keys, state) {
  var output = '';

  strings.forEach(function (str, index) {
    if (keys.length >= index) {
      var keyValue = keys[index];

      if (typeof keyValue === 'function') {
        keyValue = escapeChars(keyValue(state || {}) || '');
      }

      if (typeof keyValue === 'string' && docCSS[keyValue.replace('class-', '')]) {
        var hash = keyValue.replace('class-', '');
        keyValue = joinTemplate(docCSS[hash].strings, docCSS[hash].keys, state);
      }

      output += str + (keyValue || '');
    } else {
      output += str;
    }
  });

  return output;
}

function buildName(hash, isKeyframes) {
  return isKeyframes ? 'animation-' + hash : 'class-' + hash;
}

function buildClass(className, rawCSS) {
  return rawCSS !== '' ? '\n  .' + buildName(className) + ' {\n    ' + rawCSS.trim() + '\n  }' : '';
}

function buildPseudo(className, rawCSS) {
  var output = '\n  ' + rawCSS.trim();
  output = output.replace('&', '.' + buildName(className));
  return output;
}

function buildQuery(className, rawCSS) {
  var output = rawCSS;

  var innerContent = output.substring(output.indexOf('{') + 1, output.lastIndexOf('}'));
  output = '\n  ' + output.substring(0, output.indexOf('{') + 1) + '\n    ' + buildCSS(className, innerContent).trim() + '\n  }';

  return output;
}

function findRightEndBracketPosition(rawCSS, start, lastClose) {
  var openPos = rawCSS.indexOf('{', start);
  var closePos = rawCSS.indexOf('}', (lastClose || openPos) + 1);
  var secondOpenPos = rawCSS.indexOf('{', openPos + 1);

  if (secondOpenPos > closePos || secondOpenPos === -1) {
    return closePos;
  }

  return findRightEndBracketPosition(rawCSS, secondOpenPos, closePos);
}

function buildCSS(className, rawCSS) {
  var output = rawCSS;
  var rawPseudos = [];
  var rawQueries = [];

  var parsePseudos = function parsePseudos() {
    var start = output.indexOf('&');
    var pseudo = output.substring(start, findRightEndBracketPosition(output, start) + 1);
    if (String(pseudo).indexOf('&') !== -1) {
      rawPseudos.push(pseudo);
      output = output.replace(pseudo, '');
      parsePseudos();
    }
  };

  var parseQueries = function parseQueries() {
    var start = output.indexOf('@media');
    var query = output.substring(start, findRightEndBracketPosition(output, start) + 1);
    if (String(query).indexOf('@media') !== -1) {
      rawQueries.push(query);
      output = output.replace(query, '');
      parseQueries();
    }
  };

  parseQueries();
  parsePseudos();

  output = buildClass(className, output.trim());
  rawPseudos.forEach(function (pseudo) {
    return output += buildPseudo(className, pseudo);
  });
  rawQueries.forEach(function (query) {
    return output += buildQuery(className, query);
  });

  return output;
}

function buildKeyframes(hash, rawCSS) {
  return '\n  @-webkit-keyframes ' + buildName(hash, true) + ' {\n    ' + rawCSS.trim() + '\n  }\n  @keyframes ' + buildName(hash, true) + ' {\n    ' + rawCSS.trim() + '\n  }';
}

function renderCSS() {
  var renderedCSS = '';
  Object.keys(docCSS).forEach(function (classHash) {
    return renderedCSS += docCSS[classHash].rendered;
  });
  return '' + globalCSS + renderedCSS;
}

function buildAndRenderCSS(strings, keys, state, isKeyframes) {
  var rawCSS = joinTemplate(strings, keys, state);
  var hash = (0, _hash.doHash)(rawCSS).toString(36);

  if (document.querySelector('#styles') === null) {
    var styleEl = document.createElement('style'); // eslint-disable-line
    styleEl.type = 'text/css';
    styleEl.id = 'styles';

    document.head.insertBefore( // eslint-disable-line
    styleEl, document.head.firstChild);
  }

  if (!docCSS[hash]) {
    if (isKeyframes) {
      docCSS[hash] = { rendered: buildKeyframes(hash, rawCSS), strings: strings, keys: keys };
    } else {
      docCSS[hash] = { rendered: buildCSS(hash, rawCSS), strings: strings, keys: keys };
    }

    document.querySelector('#styles').innerHTML = renderCSS();
  }

  return buildName(hash, isKeyframes);
}

function makeKeyframes(strings) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return buildAndRenderCSS(strings, keys, { theme: theme }, true);
}

function appendChildren(children, el) {
  children.forEach(function (child) {
    if (typeof child === 'string' || typeof child === 'number') {
      el.appendChild(document.createTextNode(String(child))); // eslint-disable-line
    } else if (Array.isArray(child)) {
      appendChildren(child, el);
    } else {
      el.appendChild(child);
    }
  });

  return el;
}

function makeElement(tag) {
  return function (strings) {
    for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      keys[_key2 - 1] = arguments[_key2];
    }

    return function () {
      for (var _len3 = arguments.length, inputChildren = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        inputChildren[_key3] = arguments[_key3];
      }

      var inputProps = inputChildren[0];
      var notProps = typeof inputProps !== 'object' || Array.isArray(inputProps) || inputProps.length === 0 || inputProps.tagName && true || false || inputProps.nodeName && true || false;
      var elProps = notProps ? {} : inputProps;
      var specifiedProps = elProps.props || {};
      var children = (notProps ? inputChildren : inputChildren.slice(1)) || [];

      if (Array.isArray(children[0])) {
        children = children[0];
      }

      var el = document.createElement(tag); // eslint-disable-line
      el.className = buildAndRenderCSS(strings, keys, Object.assign({}, { theme: theme }, elProps, specifiedProps));

      Object.keys(elProps).forEach(function (attr) {
        if (attr.substr(0, 2) === 'on') {
          el.addEventListener(attr.substr(2), elProps[attr]);
        } else if (attr !== 'props' && attr !== 'children') {
          el.setAttribute(attr, elProps[attr]);
        }
      });

      return appendChildren(children, el);
    };
  };
}

function styled(el) {
  return function (strings) {
    for (var _len4 = arguments.length, keys = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      keys[_key4 - 1] = arguments[_key4];
    }

    var className = buildAndRenderCSS(strings, keys, { theme: theme });

    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className; // eslint-disable-line
    }

    return el;
  };
}

var setTheme = exports.setTheme = styled.setTheme = function (selectedTheme) {
  return theme = Object.assign({}, selectedTheme);
};
var css = exports.css = styled.css = function (strings) {
  for (var _len5 = arguments.length, keys = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    keys[_key5 - 1] = arguments[_key5];
  }

  return buildAndRenderCSS(strings, keys, { theme: theme });
};
var injectGlobal = exports.injectGlobal = styled.injectGlobal = function (strings) {
  for (var _len6 = arguments.length, keys = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    keys[_key6 - 1] = arguments[_key6];
  }

  globalCSS += joinTemplate(strings, keys, { theme: theme });
};

var tags = exports.tags = styled.tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'doctype', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];

var presets = exports.presets = styled.presets = {
  mobile: '(min-width: 400px)',
  Mobile: '@media (min-width: 400px)',
  phablet: '(min-width: 550px)',
  Phablet: '@media (min-width: 550px)',
  tablet: '(min-width: 750px)',
  Tablet: '@media (min-width: 750px)',
  desktop: '(min-width: 1000px)',
  Desktop: '@media (min-width: 1000px)',
  hd: '(min-width: 1200px)',
  Hd: '@media (min-width: 1200px)'
};

styled.tags.forEach(function (tag) {
  return styled[tag] = makeElement(tag);
});
var keyframes = exports.keyframes = styled.keyframes = makeKeyframes;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=styled-elements.js.map