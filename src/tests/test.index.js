// coverage coming soon, just user tested right now
const assert = require('chai').assert;
const styled = require('../index.js').default;

describe('should function normally', () => {
  it('should construct normally', () => {
    assert.equal(typeof styled, 'function');
    assert.equal(typeof styled.div, 'function');
    assert.equal(typeof styled.button, 'function');
  });
});
