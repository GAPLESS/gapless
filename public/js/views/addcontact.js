define(['SocialNetView', 'text!tpl/addcontact.html', 'models/Contact', 'views/contact'], 
  function(SocialNetView, addcontactTpl, Contact, ContactView) {

  var AddContactModel = Backbone.Model.extend({

    urlRoot: '/contacts/find',

    initialize: function (attrs) {
      this.set(attrs);
    }

  });

  var AddContactView = SocialNetView.extend({
    el: $('#content'),

    events: {
      "submit form": "search"
    },

    render: function (resultList) {
      var view = this;
      this.$el.html(_.template(addcontactTpl));
      if ( null != resultList ) {
        _.each(resultList, function (contactJson) {
          var contactModel = new Contact(contactJson);
          var contactHtml = (new ContactView({ addButton: true, model: contactModel })).render().el;
          view.$el.find('#results').append(contactHtml);
        });
      }
    },

    search: function () {
      var addContactModel = new AddContactModel({
        searchStr: this.$el.find('input[name="searchStr"]').val()
      });

      var self = this;

      Backbone.sync('create', addContactModel, {
        success: function (data) {
          if (data.status === 200) {
            self.render(data.result);
          } else {
            self.$el.find("#results").text('No contacts found.');
            self.$el.find("#results").slideDown();
          }         
        }
      });
      return false;
    }

  });

  return AddContactView;

});
