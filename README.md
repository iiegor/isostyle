# isostyle [![Build Status](https://travis-ci.org/iiegor/isostyle.svg?branch=master)](https://travis-ci.org/iiegor/isostyle)

**isostyle** allows you to require CSS and LESS files using browserify.
When you require a stylesheet, isostyle will automatically add it to the dom with an identifier (data-isostyle-id) based on the integrity of the file so it will be unique.

An example application using **isostyle** is [Instagram](https://instagram.com/).

## Installation
```sh
$ npm install isostyle
```

## Usage
```js
require('stylesheet.less');
require('stylesheet.css');
```

To compile the stylesheets you need to add the transormation doing
```sh
$ browserify -t isostyle main.js > bundle.js
```
or adding the transformation to for example a grunt file
```js
browserify: {
  example: {
    options: {
      transform: ['isostyle']
    },

    files: {
      'bundle.js': 'main.js'
    }
  }
}
```
