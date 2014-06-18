define(['text!tpl/login.html'], function(loginTpl) {
  var LoginView = Backbone.View.extend({
    el: '#content',

    events: {
      'submit form': 'login'
    },

    login: function () {

    },

    render: function () {
      this.$el.html(loginTpl);
      $("#error").hide();
    }
  });

  return LoginView;
});