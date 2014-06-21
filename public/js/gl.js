define(['router'], function (Router) {
  function checkLogin (callback) {
    Backbone.ajax({
      type: 'get',
      url: '/u/auth',
      success: function (data) {
        if (data.status === '200') {
          callback(true);
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