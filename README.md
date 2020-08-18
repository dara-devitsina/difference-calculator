[![Node-CI](https://github.com/dara-devitsina/frontend-project-lvl2/workflows/Node-CI/badge.svg)](https://github.com/dara-devitsina/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/64c6d0bb97664e516c50/maintainability)](https://codeclimate.com/github/dara-devitsina/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/64c6d0bb97664e516c50/test_coverage)](https://codeclimate.com/github/dara-devitsina/frontend-project-lvl2/test_coverage)

Difference Calculator is a cli utility which takes 2 configuration files and outputs the report showing difference between them.  
Possible file formats: json, yaml and ini

## Install ##

To install Difference Calculator the following soft is required:
* node version 14.0 or above
* npm version 6.0 or above
* make utility

Clone this repo and run:
```
make install
make link
```

## Usage ##

The report format can be specified with `-f` or `--format` option (see below), and defaults to recursive text.  

`-f, --format plain` - the report will be generated as plain text  

`-f, --format json` - the report will be generated as JSON

## Usage examples ##

### Compare 2 flat files ###

[![asciicast](https://asciinema.org/a/qlsActofUvqe02swAAYbiilms.png)](https://asciinema.org/a/qlsActofUvqe02swAAYbiilms)

### Compare 2 recursive files (recursive text output) ###

[![asciicast](https://asciinema.org/a/QlAq5h0Fyl0VjMneVoz6cPQMb.png)](https://asciinema.org/a/QlAq5h0Fyl0VjMneVoz6cPQMb)

### Compare 2 recursive files (plain text output) ###

[![asciicast](https://asciinema.org/a/KElr0MaA45P4nIm2IC3B1d0sF.png)](https://asciinema.org/a/KElr0MaA45P4nIm2IC3B1d0sF)

### Compare 2 recursive files (JSON output) ###

[![asciicast](https://asciinema.org/a/gEP15OBk1AYJXsKQIee7FaBYX.png)](https://asciinema.org/a/gEP15OBk1AYJXsKQIee7FaBYX)

