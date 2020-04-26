## Games TS CLI

### CLi compila games in ts

<!-- Badges section here. -->

[![dependencies](https://david-dm.org/malopez1578/cli-games-webpack.png)](https://david-dm.org/malopez1578/cli-games-webpack)

![npm](https://img.shields.io/github/issues/malopez1578/cli-games-webpack)
![npm](https://img.shields.io/github/forks/malopez1578/cli-games-webpack)
![npm](https://img.shields.io/github/stars/malopez1578/cli-games-webpack)
![npm](https://img.shields.io/github/license/malopez1578/cli-games-webpack)

[![Join the chat at https://gitter.im/cli-games-webpack/community](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/cli-games-webpack/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![GitHub forks](https://img.shields.io/github/forks/malopez1578/cli-games-webpack.svg?style=social&label=Fork)](https://github.com/malopez1578/cli-games-webpack/fork)
[![GitHub stars](https://img.shields.io/github/stars/malopez1578/cli-games-webpack.svg?style=social&label=Star)](https://github.com/malopez1578/cli-games-webpack)

## Prerequisites

The CLI have dependencies that require Node 8.9 or higher, together
with NPM 5.5.1 or higher.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [License](#license)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

### Install Globally

```bash
npm install -g @malopez1578/gamescli
```

### Install Locally

```bash
npm install @malopez1578/gamescli
```

Alternatively, you can install [npx](https://www.npmjs.com/package/npx) and run `npx game <command>` within the local directory where `npm install @malopez1578/gamescli` was run, which will use the locally installed angular-cli.

### Install Specific Version (Example: 1.0.0)

```bash
npm install -g @malopez1578/gamescli@1.0.0
```

## Usage

```bash
game [--start, --build, --help]
```

### Show help

```bash
game --help
```

### Generating and serving an Game compile via a development server

```bash
cd PROJECT-NAME
game --start
```

Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

You can configure the default port used by the development server with one command-line options :

```bash
game --start --port 3030
```

### Generating final compilation of the game in production mode

```bash
cd PROJECT-NAME
game --build
```

### Generating initial game files in typescript or Javascript

```bash
cd PROJECT-NAME
game --new
```

Optional you can select the template

```bash
cd PROJECT-NAME
game --new --template Typescript
```

## Documentation

## License

[MIT](https://github.com/malopez1578/cli-games-webpack/blob/master/LICENSE.md)

## TODO

- Generate documentation.
