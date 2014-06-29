define(['views/login', 'views/index', 'views/register', 'views/fp', 'views/profile','views/contacts',
  'views/addcontact', 'models/Account', 'models/StatusCollection', 'models/ContactsCollection'], 
  function (LoginView, IndexView, RegisterView, FpView, ProfileView, ContactsView, AddContactView,
    Account, StatusCollection, ContactsCollection) {
  var GLRouter = Backbone.Router.extend({
    
    currentView: null,

    routes: {
      login: 'login',
      index: 'index',
      register: 'register',
      fp: 'fp',
      'profile/:id': 'profile',
      'contacts/:id': 'contacts',
      addcontact: 'addcontact'
    },

    changeView: function (view) {
      if (null != this.currentView) {
        this.currentView.undelegateEvents();
      }
      this.currentView = view;
      this.currentView.render();
    },

    login: function () {
      this.changeView(new LoginView);
    },

    index: function () {
      var statusCollection = new StatusCollection();
      statusCollection.url = '/u/me/activity';
      this.changeView(new IndexView({
        collection: statusCollection
      }));
      statusCollection.fetch();
    },

    register: function () {
      this.changeView(new RegisterView);
    },

    // forgot password
    fp: function () {
      this.changeView(new FpView);
    },

    profile: function (id) {
      var account = new Account({id: id});
      this.changeView(new ProfileView({model: account}));
      account.fetch();
    },

    contacts: function (id) {
      var contactId = id || 'me';
      var contactsCollection = new ContactsCollection();
      contactsCollection.url = '/u/' + contactId + '/contacts';
      this.changeView(new ContactsView({
        collection: contactsCollection
      }));
      contactsCollection.fetch();
    },

    addcontact: function () {
      this.changeView(new AddContactView);
    }
    
  });

  return new GLRouter;
});