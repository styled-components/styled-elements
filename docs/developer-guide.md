# Developer Guide

All information regarding contributing to and progressing `styled-elements` module can be found in this document.

## Install

```
npm install --save styled-elements
```

## Install from Source

```
git clone http://github.com/silentcicero/styled-elements
npm install
```

## Test

```
npm test
```

## Build

```
npm run build
```

## Linting

```
npm run lint
```

## Travis-ci and Coveralls Testing

Note, this will generate a `coveralls` report locally.

```
npm run test-travis
```

You can find the coveralls report and view the percentages and stats, by going to the [index.html](coverage/lcov-report/index.html) file generated after running the `test-travis` script. Open this in Chrome to see the generated report. Travis will run mocha as usual, but collect information about the testing coverage. This report will be sent by TravisCI during the automated build process.

## Build Staging

The build staging for this module is as follows:

 1. Cleanup
 2. Linting
 3. Testing
 4. Babel processing (output to lib)
 5. Webpack (output to dist)
 6. Webpack production (output to dist)
 7. Retest lib folder for babel processing solidity
 8. Report build stats

## Folder Structure

All module source code is found in the `src` directory. All module helper scripts can be found in the `scripts` folder. These will not need to be touched, and are purely configuration for this repository.

```
./styled-elements
  ./.github
  ./dist
  ./lib
    ./tests
  ./internals
    ./webpack
  ./coverage
  ./docs
  ./src
    ./tests
```

Note, the `./lib` dir is generated from the babel build staging. `./coverage` is generated from the `npm run test-travis` script. All internals and helper scripts (i.e. `webpack`) are in `./internals`. All distribution builds are in `./dist` (usually a minified and unminified production build of the package).

## NPM/Node Version Requirements

We require you have:
  - `nodejs` -v 6.5.0+
  - `npm` -v 3.0+

This is a requirement to run, test, lint and build this module.

## Webpack

`styled-elements` uses webpack across all its browser focused repos. Webpack is used to package down project files into distribution builds for the browser. You can see the builds it produces by going to the [dist](dist) folder.

Read more about webpack here:
https://github.com/webpack/docs

## Changelog

All relevant changes are notated in the `CHANGELOG.md` file, moniter this file for changes to this repository.

## Contributing

Please help better the ecosystem by submitting issues and pull requests. We need all the help we can get to build the absolute best linting standards and utilities. We follow the AirBNB linting standard. Please read more about contributing to `styled-elements` in the `.github/CONTRIBUTING.md`.

## Licence

This project is licensed under the MIT license, Copyright (c) 2016 Nick Dodson. For more information see LICENSE.
