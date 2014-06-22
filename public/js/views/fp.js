define(['text!tpl/fp.html'], function (fpTpl) {

  var FpModel = Backbone.Model.extend({

    urlRoot: '/fp',

    initialize: function (attrs) {
      this.set(attrs);
    }

  });

  var FpView = Backbone.View.extend({

    el: '#content',

    events: {
      'submit form': 'fp'
    },

    render: function () {
      this.$el.html(fpTpl);
    },

    fp: function () {
      var fpModel = new FpModel({email: this.$el.find('input[name="email"]').val()});

      Backbone.sync('create', fpModel, {
        success: function (data) {
          if (data.status === 200) {
            console.log(data);
          }
        }
      });

      return false;
    }

  });

  return FpView;

});
