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
exports['default'] = styled;

var _hash = __webpack_require__(0);

var docCSS = {};

var styleEl = document.createElement('style'); // eslint-disable-line
styleEl.type = 'text/css';
styleEl.id = 'styles';

document.head.insertBefore( // eslint-disable-line
styleEl, document.head.firstChild);

function joinTemplate(strings, keys, state) {
  var output = '';

  strings.forEach(function (str, index) {
    if (keys.length >= index) {
      var keyValue = keys[index];

      if (typeof keyValue === 'function') {
        keyValue = keyValue(state || {});
      }

      output += str + (keyValue || '');
    } else {
      output += str;
    }
  });

  return output;
}

function buildName(className) {
  return 'class-' + className;
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

function buildAndRenderCSS(strings, keys, state) {
  var rawCSS = joinTemplate(strings, keys, state);
  var hash = (0, _hash.doHash)(rawCSS).toString(36);

  if (!docCSS[hash]) {
    docCSS[hash] = buildCSS(hash, rawCSS);

    var renderedCSS = '';
    Object.keys(docCSS).forEach(function (classHash) {
      return renderedCSS += docCSS[classHash];
    });
    document.querySelector('#styles').innerHTML = renderedCSS;
  }

  return buildName(hash);
}

function makeElement(tag) {
  return function (strings) {
    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    return function (props, state) {
      return function () {
        for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          children[_key2] = arguments[_key2];
        }

        var el = document.createElement(tag); // eslint-disable-line
        el.className = buildAndRenderCSS(strings, keys, state);

        Object.keys(props || {}).forEach(function (attr) {
          if (attr.substr(0, 2) === 'on') {
            el.addEventListener(attr.substr(2), props[attr]);
          } else {
            el.setAttribute(attr, props[attr]);
          }
        });

        children.forEach(function (child) {
          if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child)); // eslint-disable-line
          } else {
            el.appendChild(child);
          }
        });

        return el;
      };
    };
  };
}

function styled(el) {
  return function (strings) {
    for (var _len3 = arguments.length, keys = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      keys[_key3 - 1] = arguments[_key3];
    }

    var className = buildAndRenderCSS(strings, keys, {});

    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className; // eslint-disable-line
    }

    return el;
  };
}

styled.tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'doctype', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];

styled.presets = {
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=styled-elements.js.map