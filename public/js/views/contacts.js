define(['text!tpl/contacts.html',
  'SocialNetView', 'views/contact'], 
  function (contactsTpl, SocialNetView, ContactView) {

    var ContactsView = Backbone.View.extend({

      el: '#content',

      initialize: function () {
        this.listenTo(this.collection, 'reset', this.renderCollection);
      },

      render: function () {
        this.$el.html(contactsTpl);
      },

      renderCollection: function (collection) {
        collection.each(function (contact) {
          var statusHtml = new ContactView({removeButton: false, model: contact}).render().el;
          statusHtml.appendTo('.contacts_list');
        });
      }

    });

    return ContactsView;

});
