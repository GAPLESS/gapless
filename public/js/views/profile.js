define(['text!tpl/profile.html', 'models/Status', 'views/status'], 
  function(profileTpl, Status, StatusView) {
  var ProfileView = Backbone.View.extend({

    el: '#content',

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(_.template(profileTpl, this.model.toJSON()));

      var statusCollection = this.model.get('status');
      if(null !== statusCollection) {
        _.each(statusCollection, function (statusJson) {
          var statusModel = new Status(statusJson);
          var statusHtml = (new StatusView({model: statusModel})).render().el;
          statusHtml.prependTo('.status_list').hide().fadeIn('slow');
        });
      }
    }

  });

  return ProfileView;

});