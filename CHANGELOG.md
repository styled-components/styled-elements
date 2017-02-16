# 1.0.13 -- simplify props

1. No seperate props property, props are now element props

# 1.0.12 -- subChild, recursive

1. Allow for subchld support (better handling)
2. Minor fix

# 1.0.9 -- breaking notation change

1. BREAKING, props and child notation now simplified

```js
import styled from 'styled-elements';

const Wrapper = styled.div`
  padding: 10px;
  color: ${props => props.something};
`;

const props = { something: 'red' };

// props and ...children

document.appendChild(Wrapper({ onclick: () => {}, ...props },
  'Yes',
  'Some Element here..'
));

// or no props, method children

document.appendChild(Wrapper('Yes'));

// or just array

document.appendChild(Wrapper(['Yes', 'Something']));

// or children in array

document.appendChild(Wrapper({ ...props }, ['Yes']));
```

In element props (ie. arg 1 if object), `props` and `children` are now reserved terms.

The `props` term is now what gets injected. `children` term is reserved for react notation.

# 1.0.8 -- interoperability

1. Interoperability, you can now inject css classes with props into each other

# 1.0.7 -- anti-xss prevention

1. All key injected chars are now escaped (i.e. `<`, `>`, `&`, '"', "'")
   - Note, while this does make injection less usable, it prevents a huge XSS attack vector

# 1.0.6 -- fix exports

1. Fix exports

# 1.0.5 -- themes, css, injectGlobal

1. themes via (setTheme), makes globally available in state
2. css function now available
3. injectGlobal for global css injection

# 1.0.1 -- keyframes and optional double method notation

1. Supports @keyframes now via styled.keyframes
2. Optional double function notation (i.e. `Box()()` == `Box()`)

# 1.0.0 -- styled-elements

1. Basic testing
2. Basic docs
3. License
4. linting
5. basic exports
