define(['text!tpl/register.html'], function(registerTpl) {

  var RegisterModel = Backbone.Model.extend({
    
    url: '/register',

    initialize: function (attrs) {
      this.set(attrs, {validate:true});
    },

    validate: function (attrs) {
      if (attrs.password !== attrs.cpassword) {
        console.log('两次输入密码不一致');
        return '两次输入密码不一致';
      }
    }

  });

  var RegisterView = Backbone.View.extend({

    el: '#content',

    events: {
      'submit form': 'register'
    },

    render: function () {
      this.$el.html(registerTpl);

    },

    register: function () {

      var registerModel = new RegisterModel({
        email: this.$el.find('input[name="email"]').val(),
        cemail: this.$el.find('input[name="cemail"]').val(),
        password: this.$el.find('input[name="password"]').val(),
        cpassword: this.$el.find('input[name="cpassword"]').val(),
        firstName: this.$el.find('input[name="firstName"]').val(),
        lastName: this.$el.find('input[name="lastName"]').val(),
      });

      Backbone.sync('create', registerModel, {
        success: function (data) {
          console.log(data);
        }
      });

      return false;

    }

  });

  return RegisterView;

});