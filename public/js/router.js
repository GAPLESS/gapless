define(['views/login', 'views/index', 'views/register', 'views/fp'], 
  function (LoginView, IndexView, RegisterView, FpView) {
  var GLRouter = Backbone.Router.extend({
    
    currentView: null,

    routes: {
      login: 'login',
      index: 'index',
      register: 'register',
      fp: 'fp'
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
      this.changeView(new IndexView);
    },

    register: function () {
      this.changeView(new RegisterView);
    },

    // forgot password
    fp: function () {
      this.changeView(new FpView);
    }
    
  });

  return new GLRouter;
});