define(['text!tpl/index.html',
  'SocialNetView', 'models/Status', 'views/status'], 
  function (indexTpl, SocialNetView, Status, StatusView) {

  var IndexView = SocialNetView.extend({

    el: '#content',

    events: {
      'submit form': 'updateStatus' 
    },

    initialize: function () {
      this.listenTo(this.collection, 'add', this.onStatusAdded);
      this.listenTo(this.collection, 'reset', this.onStatusCollectionReset);
    },

    render: function() {
      this.$el.html(indexTpl);
    },

    onStatusAdded: function (status) {
      var statusHtml = (new StatusView({ model: status })).render().el;
      $(statusHtml).prependTo('.status_list').hide().fadeIn('slow');
    },

    onStatusCollectionReset: function (collection) {
      var that = this;
      collection.each(function (model) {
        that.onStatusAdded(model);
      });
    },

    updateStatus: function () {
      var statusModel = new Status({status: this.$el.find('input[name="status"]').val()});
      var statusCollection = this.collection;
      Backbone.sync('create', statusModel, {
        url: '/u/me/status',
        success: function (data) {
          statusCollection.add(statusModel);
        }
      });
      return false;
    }

  });

  return IndexView;
});