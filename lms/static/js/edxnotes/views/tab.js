;(function (define, undefined) {
'use strict';
define(['jquery', 'underscore', 'backbone', 'js/edxnotes/collections/notes'],
function ($, _, Backbone, NotesCollection) {
    var TabView = Backbone.View.extend({
        tagName: 'li',
        className: 'tab-item',
        activeClassName: 'is-active',

        templateHtml: [
            '<a href>',
                '<%- gettext(name) %>',
            '</a>',
            '<% if(close){ %><a href class="ico-close">x</a><% } %>',
        ].join(''),

        events: {
            'click': 'selectHandler',
            'click a': function (event) { event.preventDefault(); },
            'click .ico-close': 'closeHandler'
        },

        initialize: function (options) {
            _.bindAll(this);
            this.template = _.template(this.templateHtml);
            this.$el.addClass(this.model.get('class_name'));
            this.options = options;

            this.model.on('change:is_active', function (model, value) {
                if (value) {
                    this.$el.addClass(this.activeClassName);
                } else {
                    this.$el.removeClass(this.activeClassName);
                }
            }.bind(this));
        },

        render: function () {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            return this;
        },

        selectHandler: function (event) {
            event.preventDefault();
            this.select();
        },

        closeHandler: function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.close();
        },

        select: function () {
            var selectHandler = this.model.get('select');

            this.model.collection.each(function(model) {
                // Mark current model as active and unactivate all other models.
                if (model == this.model) {
                    this.model.set('is_active', true);
                } else {
                    model.set('is_active', false);
                }
            }, this);

            if (_.isFunction(selectHandler)) {
                selectHandler();
            }
        },

        close: function () {
            var closeHandler = this.model.get('close');

            this.model.destroy();
            this.remove();
            if (_.isFunction(closeHandler)) {
                closeHandler();
            }
        }
    });

    return TabView;
});
}).call(this, define || RequireJS.define);
