# isostyle [![Build Status](https://travis-ci.org/iiegor/isostyle.svg?branch=master)](https://travis-ci.org/iiegor/isostyle)

Browserify transform that allows you to require CSS and LESS files.
When you require a StyleSheet, ``isostyle`` will automatically append it to the ``head`` of the document with a unique identifier *(data-isostyle-id)*.

An example application using **isostyle** is [Instagram](https://instagram.com/).

## Installation

```sh
$ npm i --save isostyle
```

## Usage

```js
require('stylesheet.less');
require('stylesheet.css');
```

Compile with browserify using ``-t isostyle``:

```sh
$ browserify -t isostyle main.js > bundle.js
```
