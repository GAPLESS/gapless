define(['models/StatusCollection'], function (StatusCollection) {
  var Account = Backbone.Model.extend({

    urlRoot: '/u',

    initialize: function () {
      this.status = new StatusCollection();
      this.status.url = '/u/' + this.id + '/status';
      this.activity = new StatusCollection();
      this.activity.url = '/u/' +　this.id + '/activity';
    }

  });

  return Account;
});