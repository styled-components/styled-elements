// coverage coming soon, just user tested right now
const assert = require('chai').assert;
const styled = require('../index.js').default;
const escapeChars = require('../index.js').escapeChars;

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
