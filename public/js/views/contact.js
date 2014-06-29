define(['SocialNetView', 'text!tpl/contact.html'], 
  function(SocialNetView, contactTpl) {

    var ContactView = Backbone.View.extend({

      addButton: false,

      removeButton: false,

      tagName: 'li',

      initialize: function (options) {
        if ( options.addButton ) {
          this.addButton = options.addButton;
        }

        if ( options.removeButton ) {
          this.removeButton = options.removeButton;
        }
        $(this.el).html(_.template(contactTpl, {
          model: this.model.toJSON(),
          addButton: this.addButton,
          removeButton: this.removeButton
        }));
        return this;
      },

      events: {
        'click .addbutton': 'addContact',
        'click .removebutton': 'removeContact'
      },

      addContact: function () {
        var responseArea = this.$el.find('.actionArea');
        Backbone.ajax({
          type: 'post',
          url: '/accounts/me/contact',
          data: {
            contactId: this.model.get('_id')
          },
          success: function (data) {
            if (data.status === 200) {
              responseArea.text('Contact Added');
            } else {
              responseArea.text('Could not add contact');
            }
          }
        });
      },

      removeContact: function () {
        var responseArea = this.$el.find('.actionArea');
        Backbone.ajax({
          type: 'delete',
          url: '/accounts/me/contact',
          data: {
            contactId: this.model.get('_id')
          },
          success: function (data) {
            if (data.status === 200) {
              responseArea.text('Contact Removed');
            } else {
              responseArea.text('Could not remove contact');
            }
          }
        });
      }

    });

    return ContactView;

});
  