define(['text!tpl/status.html', 'SocialNetView'], function (statusTpl, SocialNetView) {

  var StatusView = SocialNetView.extend({

    tagName: 'li',

    render: function() {
      this.$el.html(_.template(statusTpl, this.model.toJSON()));
      return this;
    }

  });

  return StatusView;

});