# isostyle
> Advanced LESS precompiler and CSS plugin for Browserify v2

With isostyle you can use the require() function also with CSS and LESS files.
Note that when you use the require function, automatically it will add the stylesheet to the dom with an identifier (data-isostyle-id).

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

## Examples
An example of an application using **isostyle** is [Instagram](https://instagram.com/).
