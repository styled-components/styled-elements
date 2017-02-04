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
