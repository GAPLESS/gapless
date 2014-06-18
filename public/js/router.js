define(['views/login', 'views/index'], 
  function (LoginView, IndexView) {
  var GLRouter = Backbone.Router.extend({
    currentView: null,

    routes: {
      login: 'login',
      index: 'index'
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
    }
  });

  return new GLRouter;
});