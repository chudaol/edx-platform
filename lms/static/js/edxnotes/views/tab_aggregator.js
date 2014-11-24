;(function (define, undefined) {
'use strict';
define([
    'jquery', 'underscore', 'backbone', 'js/edxnotes/models/tab'
], function ($, _, Backbone, TabModel) {
    var TabAggregatorView = Backbone.View.extend({

        SubViewConstructor: null,

        tabInfo: {
            name: '',
            class_name: ''
        },

        initialize: function (options) {
            _.bindAll(this);
            this.options = $.extend(true, {
                createTabOnInitialization: true
            }, options);
            ;
            if (this.options.createTabOnInitialization) {
                this.createTab();
            }
        },

        createTab: function () {
            this.tabModel = new TabModel(this.tabInfo);
            this.options.tabsCollection.add(this.tabModel);

            this.tabModel.on({
                'change:is_active': _.bind(function (model, value) {
                    if (value) {
                        this.renderContent();
                    } else if (this.contentView) {
                        this.contentView.destroy();
                        this.contentView = null;
                    }
                }, this),
                'destroy': _.bind(function () {
                    if (this.contentView) {
                        this.contentView.destroy();
                    }
                    this.contentView = null;
                    this.tabModel = null;
                    this.onClose();
                }, this)
            });
        },

        renderContent: function () {
            var collection = this.getCollection();
            if (collection) {
                this.showLoadingIndicator();
                if (this.contentView) {
                    this.contentView.destroy();
                }

                this.contentView = new this.SubViewConstructor({collection: collection});

                this.$('.course-info').append(this.contentView.render().$el);
                this.hideLoadingIndicator();
            }
            return this;
        },

        getCollection: function () {
            return null;
        },

        onClose: function () { },

        /**
         * Show the page's loading indicator.
         */
        showLoadingIndicator: function() {
            this.$('.ui-loading').removeClass('is-hidden');
        },

        /**
         * Hide the page's loading indicator.
         */
        hideLoadingIndicator: function() {
            this.$('.ui-loading').addClass('is-hidden');
        }
    });

    return TabAggregatorView;
});
}).call(this, define || RequireJS.define);
