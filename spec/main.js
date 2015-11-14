'use strict';

var fs = require('fs'),
  path = require('path'),
  browserify = require('browserify'),
  concatStream = require('concat-stream'),
  test = require('tap').test,
  jsdom = require('jsdom');

test('load style sheet', function (t) {
  var b = browserify()
    .add(path.join(__dirname, 'src'))
    .transform(require(path.join(__dirname, '../index')))
    .require(path.join(__dirname, '../browser'), {expose: 'isostyle/browser'})
    .bundle();

  b.pipe(concatStream(function(bundle) {
    var html = fs.readFileSync(path.join(__dirname, 'src', 'index.html'));

    jsdom.env({
      html: html,
      src: [
        fs.readFileSync(path.join(__dirname, 'vendor', 'jquery.js')),
        bundle
      ],
      done: function(errors, window) {
        if (errors) {
          t.fail(errors);
          return t.end();
        }

        var $ = window.jQuery;
        var $head = $('head > style');

        t.equal(2, $head.length);
        t.equal('body{color:red}', $head[0].innerHTML);
        t.equal('body{color:blue}', $head[1].innerHTML);

        t.end();
      }
    });
  }));
});