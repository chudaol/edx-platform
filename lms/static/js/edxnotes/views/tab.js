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
            '<% if(is_closable){ %><a href class="ico-close">x</a><% } %>',
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

            this.model.on('change:is_active', _.bind(function (changed_model, value) {
                if (value) {
                    changed_model.collection.each(function(model) {
                        // Unactivate all other models.
                        if (model !== changed_model) {
                            model.set('is_active', false);
                        }
                    });

                    this.$el.addClass(this.activeClassName);
                } else {
                    this.$el.removeClass(this.activeClassName);
                }
            }, this));

            this.model.on('destroy', this.remove);

            if (this.model.get('is_active')) {
                this.select();
            }
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
            this.model.set('is_active', true);
        },

        close: function () {
            this.model.destroy();
        }
    });

    return TabView;
});
}).call(this, define || RequireJS.define);
