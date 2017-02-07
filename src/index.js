import { doHash } from './lib/hash';

let theme = {};
let globalCSS = '';
const docCSS = {};

function joinTemplate(strings, keys, state) {
  let output = '';

  strings.forEach((str, index) => {
    if (keys.length >= index) {
      let keyValue = keys[index];

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

function buildName(hash, isKeyframes) {
  return isKeyframes ? `animation-${hash}` : `class-${hash}`;
}

function buildClass(className, rawCSS) {
  return rawCSS !== '' ? `
  .${buildName(className)} {
    ${rawCSS.trim()}
  }` : '';
}

function buildPseudo(className, rawCSS) {
  let output = `
  ${rawCSS.trim()}`;
  output = output.replace('&', `.${buildName(className)}`);
  return output;
}

function buildQuery(className, rawCSS) {
  let output = rawCSS;

  const innerContent = output.substring(output.indexOf('{') + 1, output.lastIndexOf('}'));
  output = `
  ${output.substring(0, output.indexOf('{') + 1)}
    ${buildCSS(className, innerContent).trim()}
  }`;

  return output;
}

function findRightEndBracketPosition(rawCSS, start, lastClose) {
  const openPos = rawCSS.indexOf('{', start);
  const closePos = rawCSS.indexOf('}', (lastClose || openPos) + 1);
  const secondOpenPos = rawCSS.indexOf('{', openPos + 1);

  if (secondOpenPos > closePos || secondOpenPos === -1) {
    return closePos;
  }

  return findRightEndBracketPosition(rawCSS, secondOpenPos, closePos);
}

function buildCSS(className, rawCSS) {
  let output = rawCSS;
  const rawPseudos = [];
  const rawQueries = [];

  const parsePseudos = () => {
    const start = output.indexOf('&');
    const pseudo = output.substring(start, findRightEndBracketPosition(output, start) + 1);
    if (String(pseudo).indexOf('&') !== -1) {
      rawPseudos.push(pseudo);
      output = output.replace(pseudo, '');
      parsePseudos();
    }
  };

  const parseQueries = () => {
    const start = output.indexOf('@media');
    const query = output.substring(start, findRightEndBracketPosition(output, start) + 1);
    if (String(query).indexOf('@media') !== -1) {
      rawQueries.push(query);
      output = output.replace(query, '');
      parseQueries();
    }
  };

  parseQueries();
  parsePseudos();

  output = buildClass(className, output.trim());
  rawPseudos.forEach(pseudo => (output += buildPseudo(className, pseudo)));
  rawQueries.forEach(query => (output += buildQuery(className, query)));

  return output;
}

function buildKeyframes(hash, rawCSS) {
  return `
  @-webkit-keyframes ${buildName(hash, true)} {
    ${rawCSS.trim()}
  }
  @keyframes ${buildName(hash, true)} {
    ${rawCSS.trim()}
  }`;
}

function renderCSS() {
  let renderedCSS = '';
  Object.keys(docCSS).forEach(classHash => (renderedCSS += docCSS[classHash]));
  document.querySelector('#styles').innerHTML = `${globalCSS}${renderedCSS}`;
}

function buildAndRenderCSS(strings, keys, state, isKeyframes) {
  const rawCSS = joinTemplate(strings, keys, state);
  const hash = doHash(rawCSS).toString(36);

  if (document.querySelector('#styles') === null) {
    const styleEl = document.createElement('style'); // eslint-disable-line
    styleEl.type = 'text/css';
    styleEl.id = 'styles';

    document.head.insertBefore( // eslint-disable-line
      styleEl,
      document.head.firstChild, // eslint-disable-line
    );
  }

  if (!docCSS[hash]) {
    if (isKeyframes) {
      docCSS[hash] = buildKeyframes(hash, rawCSS);
    } else {
      docCSS[hash] = buildCSS(hash, rawCSS);
    }

    renderCSS();
  }

  return buildName(hash, isKeyframes);
}

function makeKeyframes(strings, ...keys) {
  return buildAndRenderCSS(strings, keys, { theme }, true);
}

function appendChildren(children, el) {
  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child)); // eslint-disable-line
    } else {
      el.appendChild(child);
    }
  });

  return el;
}

function makeElement(tag) {
  return (strings, ...keys) => (...props) => {
    const elProps = (props || [])[0] || {};
    const overrideProps = (props.length === 0 || typeof elProps === 'string' || elProps.tagName || elProps.nodeName);
    const childMethod = (...children) => {
      const el = document.createElement(tag); // eslint-disable-line
      el.className = buildAndRenderCSS(strings, keys, Object.assign({}, { theme }, (props[1] || {})));

      if (!overrideProps) {
        Object.keys(elProps).forEach((attr) => {
          if (attr.substr(0, 2) === 'on') {
            el.addEventListener(attr.substr(2), elProps[attr]);
          } else {
            el.setAttribute(attr, elProps[attr]);
          }
        });
      }

      return appendChildren(children, el);
    };

    return overrideProps ? childMethod(...props) : childMethod;
  };
}

export default function styled(el) {
  return (strings, ...keys) => {
    const className = buildAndRenderCSS(strings, keys, { theme });

    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ` ${className}`; // eslint-disable-line
    }

    return el;
  };
}

styled.setTheme = selectedTheme => (theme = Object.assign({}, selectedTheme));
styled.css = (strings, ...keys) => buildAndRenderCSS(strings, keys, { theme });
styled.injectGlobal = (strings, ...keys) => {
  globalCSS += joinTemplate(strings, keys, { theme });
};

styled.tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b',
'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details',
'dfn', 'div', 'dl', 'doctype', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label',
'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav',
'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre',
'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select',
'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table',
'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track',
'u', 'ul', 'var', 'video', 'wbr'];

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
  Hd: '@media (min-width: 1200px)',
};

styled.tags.forEach(tag => (styled[tag] = makeElement(tag)));
styled.keyframes = makeKeyframes;
