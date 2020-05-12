## projects TS CLI

### CLi compila projects in ts

<!-- Badges section here. -->

[![dependencies](https://david-dm.org/malopez1578/cli-project.png)](https://david-dm.org/malopez1578/cli-project)

![npm](https://img.shields.io/github/issues/malopez1578/cli-project)
![npm](https://img.shields.io/github/forks/malopez1578/cli-project)
![npm](https://img.shields.io/github/stars/malopez1578/cli-project)
![npm](https://img.shields.io/github/license/malopez1578/cli-project)

[![Join the chat at https://gitter.im/cli-project/community](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/cli-project/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![GitHub forks](https://img.shields.io/github/forks/malopez1578/cli-project.svg?style=social&label=Fork)](https://github.com/malopez1578/cli-project/fork)
[![GitHub stars](https://img.shields.io/github/stars/malopez1578/cli-project.svg?style=social&label=Star)](https://github.com/malopez1578/cli-project)

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
npm install -g @malopez1578/projectcli
```

### Install Locally

```bash
npm install @malopez1578/projectcli
```

### Install Specific Version (Example: 1.0.0)

```bash
npm install -g @malopez1578/projectcli@1.0.0
```

## Usage

```bash
project [--start, --build, --help]
```

### Show help

```bash
project --help
```

### Generating and serving an project compile via a development server

```bash
cd PROJECT-NAME
project --start
```

Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

You can configure the default port used by the development server with one command-line options :

```bash
project --start --port 3030
```

### Generating final compilation of the project in production mode

```bash
cd PROJECT-NAME
project --build
```

### Generating initial project files in typescript or Javascript

```bash
cd PROJECT-NAME
project --new
```

<!--
Optional you can select the template

```bash
cd PROJECT-NAME
project --new --template Typescript
``` -->

## Documentation

## License

[MIT](https://github.com/malopez1578/cli-project/blob/master/LICENSE.md)

## TODO

- Generate documentation.
