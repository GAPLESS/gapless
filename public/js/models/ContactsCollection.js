define(['models/Contact'], function(Contact) {
  var ContactsCollection = Backbone.Collection.extend({
    model: Contact
  });

  return ContactsCollection;
});