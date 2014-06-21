define(['views/login', 'views/index', 'views/register'], 
  function (LoginView, IndexView, RegisterView) {
  var GLRouter = Backbone.Router.extend({
    
    currentView: null,

    routes: {
      login: 'login',
      index: 'index',
      register: 'register'
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
    }
    
  });

  return new GLRouter;
});