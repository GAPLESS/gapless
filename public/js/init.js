require.config({
  paths: {
    backbone: './lib/backbone',
    underscore: './lib/underscore',
    jquery: './lib/jquery',
    text: './lib/require-text',
    domReady: './lib/domReady',
    tpl: '../tpl'
  },
  shim: {
    backbone: ['underscore', 'jquery'],
    gl: ['backbone']
  }
});

require(['domReady!', 'gl'], function (doc, gl) {
  gl();
});
