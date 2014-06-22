define(['views/login', 'views/index', 'views/register', 'views/fp', 'views/profile',
  'models/Account', 'models/StatusCollection'], 
  function (LoginView, IndexView, RegisterView, FpView, ProfileView, Account, StatusCollection) {
  var GLRouter = Backbone.Router.extend({
    
    currentView: null,

    routes: {
      login: 'login',
      index: 'index',
      register: 'register',
      fp: 'fp',
      'profile/:id': 'profile'
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
    }
    
  });

  return new GLRouter;
});