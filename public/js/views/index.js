define(['text!tpl/index.html'], function (indexTpl) {
  var IndexView = Backbone.View.extend({
    el: '#content',

    render: function() {
      this.$el.html(indexTpl);
    }
  });

  return IndexView;
});