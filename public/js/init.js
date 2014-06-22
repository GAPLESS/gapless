require.config({
  paths: {
    Backbone: './lib/backbone',
    _: './lib/underscore',
    $: './lib/jquery',
    text: './lib/require-text',
    domReady: './lib/domReady',
    tpl: '../tpl',
    models: './models',
    SocailNetView: './SocailNetView'
  },
  shim: {
    Backbone: ['_', '$'],
    gl: ['Backbone']
  }
});

require(['domReady!', 'gl'], function (doc, gl) {
  gl();
});
