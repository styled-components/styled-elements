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

document.body.appendChild(Wrapper(
  Header('My header!'),
  MyButton({ onclick: () => console.log('yay!') })(
    'Do Something'
  ),
));
```

## Usage with Props

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
Hash: c50caa1e51a732a2297d
Version: webpack 2.1.0-beta.15
Time: 159ms
                 Asset     Size  Chunks             Chunk Names
    styled-elements.js  11.3 kB       0  [emitted]  main
styled-elements.js.map  13.5 kB       0  [emitted]  main
   [0] ./lib/lib/hash.js 1.25 kB {0} [built]
   [1] ./lib/index.js 7.49 kB {0} [built]

 10% building modules 0/1 modules 1 active ...k/github/styled-elements/lib/index 10% building modules 1/2 modules 1 active ...ithub/styled-elements/lib/lib/hashHash: d29bfe23dad399317007
Version: webpack 2.1.0-beta.15
Time: 435ms
                 Asset     Size  Chunks             Chunk Names
styled-elements.min.js  5.03 kB       0  [emitted]  main
   [0] ./lib/lib/hash.js 1.25 kB {0} [built]
   [1] ./lib/index.js 7.49 kB {0} [built]
```
