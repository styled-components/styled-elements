# User Guide

All information for developers using `styled-elements` should consult this document.

## Install

```
npm install --save styled-elements
```

## Usage

```js
import styled from 'styled-elements';

const Header = styled.h2`
  color: #333;
`;

const MyButton = styled.button`
  padding: 10px;
  border-radius: ${0}px;
  background: #F1F1F1;

  &:hover {
    background: #555;
  }
`;

const Wrapper = styled.div`
  width: 500px;
  border: 1px solid #aaa;

  @media (min-width: 400px) {
    width: 100%;
    background: #F1F1F1;
  }
`;

document.body.appendChild(Wrapper()(
  Header()('My header!'),
  MyButton({ onclick: () => console.log('yay!') })(
    'Do Something'
  ),
));
```

Usage with Props

```js
import styled from 'styled-elements';

const Header = styled.h2`
  color: #${props => props.status === 'success' ? '000' : '333'};
`;

const props = { status: 'success' };

document.body.appendChild(Header({}, props)(
  'My Header'
));
```

## Webpack Figures

```
Hash: 8efed1ec19981ccaae60
Version: webpack 2.1.0-beta.15
Time: 123ms
                 Asset     Size  Chunks             Chunk Names
    styled-elements.js  10.2 kB       0  [emitted]  main
styled-elements.js.map  12.2 kB       0  [emitted]  main
   [0] ./lib/lib/hash.js 1.25 kB {0} [built]
   [1] ./lib/index.js 6.33 kB {0} [built]

Hash: 25b157aaa47b12a4dcca
Version: webpack 2.1.0-beta.15
Time: 304ms
                 Asset     Size  Chunks             Chunk Names
styled-elements.min.js  4.54 kB       0  [emitted]  main
   [0] ./lib/lib/hash.js 1.25 kB {0} [built]
   [1] ./lib/index.js 6.33 kB {0} [built]
```
