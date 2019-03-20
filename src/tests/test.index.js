// coverage coming soon, just user tested right now
const assert = require('chai').assert;
const styled = require('../index.js').default;
const escapeChars = require('../index.js').escapeChars;
const hyphenateStyleName = require('../index.js').hyphenateStyleName;
const objToCSS = require('../index.js').objToCSS;
const flattenStyleObject = require('../index.js').flattenStyleObject;

describe('should function normally', () => {
  it('should construct normally', () => {
    assert.equal(typeof styled, 'function');
    assert.equal(typeof styled.div, 'function');
    assert.equal(typeof styled.button, 'function');
  });
});

describe('escapeChars', () => {
  it('removes dangerous characters', () => {
    assert.equal(escapeChars('&<>"\''), '');
  });

  it('does not remove non-dangerous characters', () => {
    const safeString = 'This string contains only safe characters.';
    assert.equal(escapeChars(safeString), safeString);
  });
});

describe('hyphenateStyleName', () => {
  it('hyphenates strings correctly', () => {
    assert.equal(hyphenateStyleName('fontSize'), 'font-size');
  });
});

describe('objToCSS', () => {
  it('converts an object to css string', () => {
    const obj = { fontSize: '16px' };
    assert.equal(objToCSS(obj), 'font-size: 16px;');
  });

  it('unfolds nested objects', () => {
    const nestedObj = { '@media screen and (min-width: 40em)': { margin: '32px' } };
    const result = `@media screen and (min-width: 40em) {
  margin: 32px;
}`;
    assert.equal(objToCSS(nestedObj), result);
  });
});

describe('flattenStyleObject', () => {
  it('flattens a style object', () => {
    const obj = [{ fontSize: '16px' }];
    assert.deepEqual(flattenStyleObject(obj), ['font-size: 16px;']);
  });

  it('flattens nested style objects', () => {
    const obj = [[{ fontSize: '16px' }]];
    assert.deepEqual(flattenStyleObject(obj), ['font-size: 16px;']);
  });

  it('returns string if no object', () => {
    const str = '16px';
    assert.equal(flattenStyleObject(str), str);
  });
});
