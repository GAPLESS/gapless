define(function() {
  var Status = Backbone.Model.extend({

    urlRoot: '/u/' + this.userId + '/status',

    initialize: function (attrs) {
      this.set(attrs);
    }

  });

  return Status;
});