## styled-elements

<div>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/ethjs/styled-elements">
    <img src="https://david-dm.org/ethjs/styled-elements.svg"
    alt="Dependency Status" />
  </a>

  <!-- devDependency Status -->
  <a href="https://david-dm.org/ethjs/styled-elements#info=devDependencies">
    <img src="https://david-dm.org/ethjs/styled-elements/dev-status.svg" alt="devDependency Status" />
  </a>

  <!-- Build Status -->
  <a href="https://travis-ci.org/ethjs/styled-elements">
    <img src="https://travis-ci.org/ethjs/styled-elements.svg"
    alt="Build Status" />
  </a>

  <!-- NPM Version -->
  <a href="https://www.npmjs.org/package/styled-elements">
    <img src="http://img.shields.io/npm/v/styled-elements.svg"
    alt="NPM version" />
  </a>

  <!-- Test Coverage
  <a href="https://coveralls.io/r/ethjs/styled-elements">
    <img src="https://coveralls.io/repos/github/ethjs/styled-elements/badge.svg" alt="Test Coverage" />
  </a>
  -->

  <!-- Javascript Style -->
  <a href="http://airbnb.io/javascript/">
    <img src="https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg" alt="js-airbnb-style" />
  </a>
</div>

<br />

A super tiny DOM equivalent of [`styled-components`](https://github.com/styled-components/styled-components).

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

## Features

  - super tiny **1.9kb** gzipped
  - completely DOM based
  - supports `@media`
  - supports pseudo CSS (i.e. `&:hover`)
  - state can be fed in through primitive methods (i.e `props => ...`)
  - no dependencies
  - ES5 compliant, written in ES6
  - Uses template literals and real CSS
  - Supports all DOM elements
  - Auto CSS class injection/management

## About

I loved `styled-components` and needed a DOM equivalent for a project. This is the result. It functions almost the same with pseudo and media queries supported. As well dynamic props can be fed in through primitive functions.

A special thanks to [Max Stoiber](https://twitter.com/mxstbr) and the styled-components team for coming up with a great component API for mixing CSS and JS.

## Usage with Props

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

## Works well with `yo-yo`

```js
import yo from 'yo-yo';
import styled from 'styled-elements';

const Wrapper = styled.div`
  padding: 20%;
  background: #F1F1F1;
`;

const Header = styled(yo`
  <header>A Header</header>
`)`
  color: #333;
`;

document.body.appendChild(Wrapper()(
  yo`<div>
    ${Header()()}

    <hr />

    <button onclick=${() => console.log('hello!')}>
      Some Button
    </button>
  </div>`,
));
```

## Contributing

Please help better the ecosystem by submitting issues and pull requests to `styled-elements`. We need all the help we can get to build the absolute best linting standards and utilities. We follow the AirBNB linting standard and the unix philosophy.

## Guides

You'll find more detailed information on using `styled-elements` and tailoring it to your needs in our guides:

- [User guide](docs/user-guide.md) - Usage, configuration, FAQ and complementary tools.
- [Developer guide](docs/developer-guide.md) - Contributing to `styled-elements` and writing your own code and coverage.

## Help out

There is always a lot of work to do, and will have many rules to maintain. So please help out in any way that you can:

- Create, enhance, and debug ethjs rules (see our guide to ["Working on rules"](./github/CONTRIBUTING.md)).
- Improve documentation.
- Chime in on any open issue or pull request.
- Open new issues about your ideas for making `styled-elements` better, and pull requests to show us how your idea works.
- Add new tests to *absolutely anything*.
- Create or contribute to ecosystem tools, like modules for encoding or contracts.
- Spread the word.

Please consult our [Code of Conduct](CODE_OF_CONDUCT.md) docs before helping out.

We communicate via [issues](https://github.com/ethjs/styled-elements/issues) and [pull requests](https://github.com/ethjs/styled-elements/pulls).

## Important documents

- [Changelog](CHANGELOG.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](https://raw.githubusercontent.com/ethjs/styled-elements/master/LICENSE)

## Todo

- Testing
- Coverage
- Documentation

## Licence

This project is licensed under the MIT license, Copyright (c) 2016 Nick Dodson. For more information see LICENSE.md.

```
The MIT License

Copyright (c) 2016 Nick Dodson. nickdodson.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
