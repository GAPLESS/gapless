define(['router'], function (Router) {
  function checkLogin (callback) {
    Backbone.sync('read', {}, {
      url: '/u/auth',
      success: function (data) {
        if (data.status === '200') {
          callback(false);
        } else {
          callback(false);
        }
      }
    });
  }

  function runApplication (authenticated) {
    if (!authenticated) {
      window.location.hash = 'login';
    } else {
      window.location.hash = 'index';
    }
    Backbone.history.start();
  }

  return function () {
    checkLogin(runApplication);
  }
});