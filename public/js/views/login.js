define(['text!tpl/login.html'], function(loginTpl) {
  
  var LoginModel = Backbone.Model.extend({

    urlRoot: '/login',

    initialize: function (attrs) {
      this.set(attrs);
    }

  });

  var LoginView = Backbone.View.extend({

    el: '#content',

    events: {
      'submit form': 'login'
    },

    login: function () {
      var loginModel = new LoginModel({email: this.$el.find('input[name="email"]').val(),
        password: this.$el.find('input[name="password"]').val()});
      Backbone.sync('create', loginModel, {
        success: function (data) {
          if (data.status === 200) {
            window.location.reload();          
          } else {
            
          }
        }
      });
      return false;
    },

    render: function () {
      this.$el.html(loginTpl);
      $("#error").hide();
    }

  });

  return LoginView;

});