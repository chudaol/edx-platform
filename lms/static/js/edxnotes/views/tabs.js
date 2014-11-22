;(function (define, undefined) {
'use strict';
define([
    'jquery', 'underscore', 'backbone',
    'js/edxnotes/models/tab', 'js/edxnotes/views/tab',
], function ($, _, Backbone, TabModel, TabView) {
    var TabsView = Backbone.View.extend({
        tagName: 'ul',
        className: 'tabs',

        initialize: function (options) {
            _.bindAll(this);
            this.options = $.extend({}, options);
            this.collection.on('destroy', function (model, collection) {
                if (model.get('is_active')) {
                    collection.at(0).set('is_active', true);
                }
            });
            this.collection.on('add', function (model) {
                this.createTab(model);
            }.bind(this));
        },

        render: function () {
            this.collection.each(this.createTab);
            return this;
        },

        createTab: function (model) {
            var tab = new TabView({
                    model: model
                });
            tab.render().$el.appendTo(this.$el);
            return tab;
        }
    });

    return TabsView;
});
}).call(this, define || RequireJS.define);
